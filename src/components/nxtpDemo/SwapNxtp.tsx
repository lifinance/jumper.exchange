import { ArrowUpOutlined, CheckOutlined, LoadingOutlined, LoginOutlined, SettingOutlined, SwapOutlined, SyncOutlined } from '@ant-design/icons';
import { NxtpSdk, NxtpSdkEvent, NxtpSdkEvents } from '@connext/nxtp-sdk';
import { AuctionResponse, TransactionData, TransactionPreparedEvent } from '@connext/nxtp-utils';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Alert, Button, Checkbox, Col, Collapse, Form, Input, Modal, Row, Spin, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Title from 'antd/lib/typography/Title';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import connextWordmark from '../../assets/connext_wordmark.svg';
import lifiWordmark from '../../assets/lifi_wordmark.svg';
import { switchChain } from '../../services/metamask';
import { finishTransfer, getTransferQuote, setup, triggerTransfer } from '../../services/nxtp';
import { getBalancesForWallet, mintTokens, testToken } from '../../services/testToken';
import { deepClone, formatTokenAmountOnly } from '../../services/utils';
import { ChainKey, ChainPortfolio, TokenWithAmounts } from '../../types';
import { getChainById, getChainByKey } from '../../types/lists';
import { CrossAction, CrossEstimate, Execution, TranferStep } from '../../types/server';
import '../Swap.css';
import SwapForm from '../SwapForm';
import ConnectButton from '../web3/ConnectButton';
import { injected } from '../web3/connectors';
import SwappingNxtp from './SwappingNxtp';

const BALANCES_REFRESH_INTERVAL = 30000

const transferChains = [
  getChainByKey(ChainKey.GOR),
  getChainByKey(ChainKey.RIN),
  getChainByKey(ChainKey.MUM),
  getChainByKey(ChainKey.ARBT),
  getChainByKey(ChainKey.OPTT),
]

interface ActiveTransaction {
  txData: TransactionData
  status: NxtpSdkEvent
  event: TransactionPreparedEvent
}

function debounce(func: Function, timeout: number = 300) {
  let timer: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

const SwapNxtp = () => {
  const [stateUpdate, setStateUpdate] = useState<number>(0)

  // Form
  const [depositChain, setDepositChain] = useState<ChainKey>(ChainKey.RIN)
  const [depositAmount, setDepositAmount] = useState<number>(1)
  const [depositToken, setDepositToken] = useState<string>(testToken[ChainKey.RIN][0].id)
  const [withdrawChain, setWithdrawChain] = useState<ChainKey>(ChainKey.GOR)
  const [withdrawAmount, setWithdrawAmount] = useState<number>(Infinity)
  const [withdrawToken, setWithdrawToken] = useState<string>(testToken[ChainKey.GOR][0].id)
  const [tokens, setTokens] = useState<{ [ChainKey: string]: Array<TokenWithAmounts> }>(testToken)
  const [refreshBalances, setRefreshBalances] = useState<boolean>(true)
  const [updatingBalances, setUpdatingBalances] = useState<boolean>(false)
  const [balances, setBalances] = useState<{ [ChainKey: string]: Array<ChainPortfolio> }>()

  // Advanced Options
  const [optionInfiniteApproval, setOptionInfiniteApproval] = useState<boolean>(true)
  const [optionReceivingAddress, setOptionReceivingAddress] = useState<string>('')
  const [optionContractAddress, setOptionContractAddress] = useState<string>('')
  const [optionCallData, setOptionCallData] = useState<string>('')

  // Routes
  const [routeRequest, setRouteRequest] = useState<any>()
  const [routeQuote, setRouteQuote] = useState<AuctionResponse>()
  const [routesLoading, setRoutesLoading] = useState<boolean>(false)
  const [noRoutesAvailable, setNoRoutesAvailable] = useState<boolean>(false)
  const [routes, setRoutes] = useState<Array<Array<TranferStep>>>([])
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [executionRoutes, setExecutionRoutes] = useState<Array<Array<TranferStep>>>([])
  const [modalRouteIndex, setModalRouteIndex] = useState<number>()

  // nxtp
  const [minting, setMinting] = useState<boolean>(false)
  const [sdk, setSdk] = useState<NxtpSdk>()
  const [sdkChainId, setSdkChainId] = useState<number>()
  const [activeTransactions, setActiveTransactions] = useState<Array<ActiveTransaction>>([])

  // Wallet
  const web3 = useWeb3React<Web3Provider>()
  const { activate } = useWeb3React()
  const intervalRef = useRef<NodeJS.Timeout>()

  // auto-trigger finish if corresponding modal is opend
  useEffect(() => {
    // is modal open?
    if (modalRouteIndex !== undefined) {
      const crossEstimate = executionRoutes[modalRouteIndex][0].estimate! as CrossEstimate
      const transaction = activeTransactions.find((item) => item.txData.transactionId === crossEstimate.quote.bid.transactionId)
      if (transaction && transaction.status === NxtpSdkEvents.ReceiverTransactionPrepared) {
        const route = executionRoutes[modalRouteIndex]
        const update = (step: TranferStep, status: Execution) => {
          step.execution = status
          updateExecutionRoute(route)
        }

        finishTransfer(sdk!, transaction.event, route[0], update)
      }
    }
    // eslint-disable-next-line
  }, [modalRouteIndex, executionRoutes, sdk])

  // update table helpers
  const updateActiveTransactionsWith = (txData: TransactionData, status: NxtpSdkEvent, event: any) => {
    setActiveTransactions((activeTransactions) => {
      // update existing?
      let updated = false
      const updatedTransactions = activeTransactions.map((item) => {
        if (item.txData.transactionId === txData.transactionId) {
          item.txData = Object.assign({}, item.txData, txData)
          item.status = status
          item.event = event
          updated = true
        }
        return item
      })

      if (updated) {
        return updatedTransactions
      } else {
        return [
          ...activeTransactions,
          { txData, status, event },
        ]
      }
    })
  }

  const removeActiveTransaction = (transactionId: string) => {
    setActiveTransactions((activeTransactions) => {
      return activeTransactions.filter((t) => t.txData.transactionId !== transactionId)
    })
  }

  useEffect(() => {
    const initializeConnext = async () => {
      if (sdk && sdkChainId === web3.chainId) {
        return sdk
      }
      if (!web3.library || !web3.account) {
        throw Error('Connect Wallet first.')
      }

      const signer = web3.library.getSigner()

      if (sdk) {
        sdk.removeAllListeners()
        return null
      }
      const _sdk = await setup(signer)
      setSdk(_sdk)
      setSdkChainId(web3.chainId)

      // listen to events
      _sdk.attach(NxtpSdkEvents.SenderTransactionPrepared, (data) => {
        updateActiveTransactionsWith(data.txData, NxtpSdkEvents.SenderTransactionPrepared, data)
      })

      _sdk.attach(NxtpSdkEvents.SenderTransactionFulfilled, (data) => {
        updateActiveTransactionsWith(data.txData, NxtpSdkEvents.SenderTransactionFulfilled, data)
        removeActiveTransaction(data.txData.transactionId)
        updateBalances(web3.account!)
      })

      _sdk.attach(NxtpSdkEvents.SenderTransactionCancelled, (data) => {
        updateActiveTransactionsWith(data.txData, NxtpSdkEvents.SenderTransactionCancelled, data)
        removeActiveTransaction(data.txData.transactionId)
      })

      _sdk.attach(NxtpSdkEvents.ReceiverPrepareSigned, (data) => {
        updateActiveTransactionsWith({ transactionId: data.transactionId } as TransactionData, NxtpSdkEvents.ReceiverPrepareSigned, data)
      })

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionPrepared, (data) => {
        updateActiveTransactionsWith(data.txData, NxtpSdkEvents.ReceiverTransactionPrepared, data)
      })

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionFulfilled, (data) => {
        updateActiveTransactionsWith(data.txData, NxtpSdkEvents.ReceiverTransactionFulfilled, data)
        removeActiveTransaction(data.txData.transactionId)
        updateBalances(web3.account!)
      })

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionCancelled, (data) => {
        updateActiveTransactionsWith(data.txData, NxtpSdkEvents.ReceiverTransactionCancelled, data)
        removeActiveTransaction(data.txData.transactionId)
      })

      // get pending transactions
      const transactions = await _sdk.getActiveTransactions()
      for (const transaction of transactions) {
        updateActiveTransactionsWith(
          {
            ...transaction.crosschainTx.invariant,
            ...(transaction.crosschainTx.receiving ??
              transaction.crosschainTx.sending),
          },
          transaction.status,
          transaction
        );
      }

      return _sdk
    }

    // init only once
    if (web3.library && web3.account && (!sdk || (sdk && sdkChainId))) {
      initializeConnext()
    }
  }, [web3, sdk, sdkChainId])

  const getSelectedWithdraw = () => {
    if (highlightedIndex === -1) {
      return '...'
    } else {
      const selectedRoute = routes[highlightedIndex]
      const lastStep = selectedRoute[selectedRoute.length - 1]
      if (lastStep.action.type === 'withdraw') {
        return formatTokenAmountOnly(lastStep.action.token, lastStep.estimate?.toAmount)
      } else if (lastStep.action.type === '1inch' || lastStep.action.type === 'paraswap') {
        return formatTokenAmountOnly(lastStep.action.toToken, lastStep.estimate?.toAmount)
      } else if (lastStep.action.type === 'cross') {
        return formatTokenAmountOnly(lastStep.action.toToken, lastStep.estimate?.toAmount)
      } else {
        return '...'
      }
    }
  }

  const updateBalances = async (address: string) => {
    setUpdatingBalances(true)
    await getBalancesForWallet(address).then(setBalances)
    setUpdatingBalances(false)
  }


  useEffect(() => {
    if (refreshBalances && web3.account) {
      setRefreshBalances(false)
      updateBalances(web3.account)
    }
  }, [refreshBalances, web3.account])

  useEffect(() => {
    if (!web3.account) {
      setBalances(undefined) // reset old balances
    } else {
      setRefreshBalances(true)
    }
  }, [web3.account])

  const mintTestToken = async (chainKey: ChainKey) => {
    if (!web3.library || !web3.account) return
    const chainId = getChainByKey(chainKey).id
    await switchChain(chainId)
    if (web3.chainId !== chainId) return
    setMinting(true)
    try {
      const res = await mintTokens(web3.library?.getSigner(), testToken[chainKey][0].id)
      await res.wait(1)
      await updateBalances(web3.account)
    } finally {
      setMinting(false)
    }
  }

  const getBalance = (chainKey: ChainKey, tokenId: string) => {
    if (!balances) {
      return 0
    }

    const tokenBalance = balances[chainKey].find(portfolio => portfolio.id === tokenId)

    return tokenBalance?.amount || 0
  }

  useEffect(() => {
    // merge tokens and balances
    if (!balances) {
      for (const chain of transferChains) {
        for (const token of tokens[chain.key]) {
          token.amount = -1
          token.amountRendered = ''
        }
      }
    } else {
      for (const chain of transferChains) {
        for (const token of tokens[chain.key]) {
          token.amount = getBalance(chain.key, token.id)
          token.amountRendered = token.amount.toFixed(4)
        }
      }
    }

    setTokens(tokens)
    setStateUpdate(stateUpdate + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, balances])

  useEffect(() => {
    intervalRef.current = setInterval(() => setRefreshBalances(true), BALANCES_REFRESH_INTERVAL)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const hasSufficientBalance = () => {
    if (!depositToken) {
      return true
    }
    return depositAmount <= getBalance(depositChain, depositToken)
  }

  const findToken = useCallback((chainKey: ChainKey, tokenId: string) => {
    const token = tokens[chainKey].find(token => token.id === tokenId)
    if (!token) {
      throw new Error('Token not found')
    }
    return token
  }, [tokens])

  const doRequestAndBidMatch = (request: any, quote: AuctionResponse) => {
    if (
         getChainByKey(request.depositChain).id !== quote.bid.sendingChainId
      || request.depositToken !== quote.bid.sendingAssetId
      || getChainByKey(request.withdrawChain).id !== quote.bid.receivingChainId
      || request.withdrawToken !== quote.bid.receivingAssetId
      || request.depositAmount !== quote.bid.amount
      || request.receivingAddress !== quote.bid.receivingAddress
      // || request.callTo !== quote.bid.callTo
      // || request.callData !== quote.bid.callDataHash
    ) {
      return false
    }

    return true
  }

  // update request based on UI
  const defineRoute = (depositChain: ChainKey, depositToken: string, withdrawChain: ChainKey, withdrawToken: string, depositAmount: number, receivingAddress: string, callTo: string | undefined, callData: string | undefined) => {
    setRouteRequest({
      depositChain,
      depositToken,
      withdrawChain,
      withdrawToken,
      depositAmount,
      receivingAddress,
      callTo,
      callData,
    })
  }
  const debouncedSave = useRef(debounce(defineRoute, 500)).current
  const getTransferRoutes = useCallback(async () => {
    setRoutes([])
    setHighlightedIndex(-1)
    setNoRoutesAvailable(false)

    if (!sdk || !web3.account) {
      return
    }

    if ((isFinite(depositAmount) && depositAmount > 0) && depositChain && depositToken && withdrawChain && withdrawToken) {
      const receiving = optionReceivingAddress !== '' ? optionReceivingAddress : web3.account
      const callTo = optionContractAddress !== '' ? optionContractAddress : undefined
      const callData = optionCallData !== '' ? optionCallData : undefined
      const dToken = findToken(depositChain, depositToken)
      const dAmount = Math.floor(depositAmount * (10 ** dToken.decimals)).toString()

      debouncedSave(depositChain, depositToken, withdrawChain, withdrawToken, dAmount, receiving, callTo, callData)
    }
  }, [
    depositAmount,
    depositChain,
    depositToken,
    withdrawChain,
    withdrawToken,
    web3,
    sdk,
    optionReceivingAddress,
    optionContractAddress,
    optionCallData,
    debouncedSave,
    findToken,
  ])
  useEffect(() => {
    getTransferRoutes()
  }, [
    getTransferRoutes,
  ])

  // route generation if needed
  const generateRoutes = useCallback(async (sdk: NxtpSdk, depositChain: ChainKey, depositToken: string, withdrawChain: ChainKey, withdrawToken: string, depositAmount: number, receivingAddress: string, callTo: string | undefined, callData: string | undefined) => {
    setRoutesLoading(true)

    try {
      const quote = await getTransferQuote(
        sdk!,
        getChainByKey(depositChain).id,
        depositToken,
        getChainByKey(withdrawChain).id,
        withdrawToken,
        depositAmount.toString(),
        receivingAddress,
        callTo,
        callData,
      )

      if (!quote) {
        throw new Error('Empty Quote')
      }

      setRouteQuote(quote)

    } catch (e) {
      console.error(e)
      setNoRoutesAvailable(true)
      setRoutesLoading(false)
    }
  }, [])
  useEffect(() => {
    if (routeRequest && routeQuote && doRequestAndBidMatch(routeRequest, routeQuote)) {
      return // already calculated
    }

    if (sdk && routeRequest) {
      generateRoutes(
        sdk,
        routeRequest.depositChain,
        routeRequest.depositToken,
        routeRequest.withdrawChain,
        routeRequest.withdrawToken,
        routeRequest.depositAmount,
        routeRequest.receivingAddress,
        routeRequest.callTo,
        routeRequest.callData,
      )
    }
  }, [sdk, routeRequest, routeQuote, generateRoutes])

  // parse routeQuote if still it matches current request
  useEffect(() => {
    if (!routeRequest || !routeQuote) {
      return
    }
    if (!doRequestAndBidMatch(routeRequest, routeQuote)) {
      return
    }

    const dAmount = routeRequest.depositAmount
    const dToken = findToken(routeRequest.depositChain, routeRequest.depositToken)
    const wToken = findToken(routeRequest.withdrawChain, routeRequest.withdrawToken)
    const toAmount = parseInt(routeQuote.bid.amountReceived)
    const sortedRoutes: Array<Array<TranferStep>> = [[
      {
        action: {
          type: 'cross',
          method: 'nxtp',
          chainId: getChainByKey(routeRequest.depositChain).id,
          chainKey: routeRequest.depositChain,
          toChainKey: routeRequest.withdrawChain,
          amount: dAmount,
          fromToken: dToken,
          toToken: wToken,
        } as CrossAction,
        estimate: {
          fromAmount: dAmount,
          toAmount: toAmount,
          fees: {
            included: true,
            percentage: (dAmount - toAmount) / dAmount * 100,
            token: dToken,
            amount: dAmount - toAmount,
          },
          quote: routeQuote,
        } as CrossEstimate,
      }
    ]]

    setRoutes(sortedRoutes)
    setHighlightedIndex(sortedRoutes.length === 0 ? -1 : 0)
    setNoRoutesAvailable(sortedRoutes.length === 0)
    setRoutesLoading(false)
  }, [routeRequest, routeQuote, findToken])

  const updateExecutionRoute = (route: Array<TranferStep>) => {
    setExecutionRoutes(routes => {
      let index = routes.findIndex(item => {
        return item[0].id === route[0].id
      })
      const newRoutes = [
        ...routes.slice(0, index),
        route,
        ...routes.slice(index + 1)
      ]
      return newRoutes
    })
  }

  const openSwapModal = () => {
    // add execution route
    const route = deepClone(routes[highlightedIndex]) as Array<TranferStep>
    setExecutionRoutes(routes => [...routes, route])

    // get new route to avoid triggering the same quote twice
    setRouteQuote(undefined)

    // add as active
    const crossAction = route[0].action as CrossAction
    const crossEstimate = route[0].estimate as CrossEstimate
    const txData = {
      user: '',
      router: '',
      sendingAssetId: crossAction.fromToken.id,
      receivingAssetId: crossAction.toToken.id,
      sendingChainFallback: '',
      callTo: '',
      receivingAddress: '',
      sendingChainId: crossAction.chainId,
      receivingChainId: getChainByKey(crossAction.toChainKey).id,
      callDataHash: '',
      transactionId: crossEstimate.quote.bid.transactionId,
      amount: crossAction.amount.toString(),
      preparedBlockNumber: 0,
      expiry: Math.floor(Date.now() / 1000) + 3600 * 24 * 3, // 3 days
    } as TransactionData
    updateActiveTransactionsWith(txData, 'Started' as NxtpSdkEvent, {} as TransactionPreparedEvent)

    // start execution
    const update = (step: TranferStep, status: Execution) => {
      step.execution = status
      updateExecutionRoute(route)
    }
    triggerTransfer(sdk!, route[0], update, optionInfiniteApproval)

    // open modal
    setModalRouteIndex(executionRoutes.length)
  }

  const openSwapModalFinish = (event: TransactionPreparedEvent) => {
    // open modal
    const index = executionRoutes.findIndex(item => {
      return item[0].id === event.txData.transactionId
    })

    if (index !== -1) {
      setModalRouteIndex(index)

      // trigger sdk
      const route = executionRoutes[index]
      const update = (step: TranferStep, status: Execution) => {
        step.execution = status
        updateExecutionRoute(route)
      }
      finishTransfer(sdk!, event, route[0], update)
    } else {
      finishTransfer(sdk!, event)
    }
  }

  const submitButton = () => {
    if (!web3.account) {
      return <Button shape="round" type="primary" icon={<LoginOutlined />} size={"large"} htmlType="submit" onClick={() => activate(injected)}>Connect Wallet</Button>
    }
    if (routesLoading) {
      return <Button disabled={true} shape="round" type="primary" icon={<SyncOutlined spin />} size={"large"}>Searching Routes...</Button>
    }
    if (noRoutesAvailable) {
      return <Button disabled={true} shape="round" type="primary" size={"large"}>No Route Found</Button>
    }
    if (!hasSufficientBalance()) {
      return <Button disabled={true} shape="round" type="primary" size={"large"}>Insufficient Funds</Button>
    }
    if (web3.chainId !== getChainByKey(depositChain).id) {
      return <Button shape="round" type="primary" size={"large"} htmlType="submit" onClick={() => switchChain(getChainByKey(depositChain).id)}>Change Chain</Button>
    }

    return <Button disabled={highlightedIndex === -1} shape="round" type="primary" icon={<SwapOutlined />} htmlType="submit" size={"large"} onClick={() => openSwapModal()}>Swap</Button>
  }

  const activeTransactionsColumns = [
    {
      title: "View",
      dataIndex: ["txData", "transactionId"],
      render: (id: string) => {
        const index = executionRoutes.findIndex(item => {
          return (item[0].estimate as CrossEstimate).quote.bid.transactionId === id
        })

        if (index !== -1) {
          return <Button onClick={() => setModalRouteIndex(index)}>View</Button>
        } else {
          return ''
        }
      }
    },
    {
      title: "Transaction Id",
      dataIndex: ["txData", "transactionId"],
      render: (id: string) => {
        return <div style={{ width: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{id}</div>
      }
    },
    {
      title: "Sending Chain",
      dataIndex: ["txData", "sendingChainId"],
      render: (chainId: number) => {
        const chain = getChainById(chainId)
        return <>{chainId} - {chain.name}</>
      }
    },
    {
      title: "Receiving Chain",
      dataIndex: ["txData", "receivingChainId"],
      render: (chainId: number) => {
        const chain = getChainById(chainId)
        return <>{chainId} - {chain.name}</>
      }
    },
    {
      title: "Asset",
      dataIndex: ["txData"],
      render: (action: TransactionData) => {
        const chain = getChainById(action.receivingChainId)
        const token = testToken[chain.key].find(token => token.id === action.receivingAssetId.toLowerCase())
        const link = chain.metamask.blockExplorerUrls[0] + 'token/' + action.receivingAssetId
        return <a href={link} target="_blank" rel="nofollow noreferrer">{token?.name}</a>
      }
    },
    {
      title: "Amount",
      dataIndex: ["txData"],
      render: (action: TransactionData) => {
        const chain = getChainById(action.receivingChainId)
        const token = testToken[chain.key].find(token => token.id === action.receivingAssetId.toLowerCase())
        return (parseInt(action.amount) / (10 ** (token?.decimals || 18))).toFixed(4)
      }
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Expires",
      dataIndex: ["txData", "expiry"],
      render: (expiry: string) => {
        return parseInt(expiry) > Date.now() / 1000
          ? `${((parseInt(expiry) - Date.now() / 1000) / 3600).toFixed(2)} hours`
          : "Expired"
      }
    },
    {
      title: "Action",
      dataIndex: "",
      render: (action: ActiveTransaction) => {
        if (Date.now() / 1000 > action.txData.expiry) {
          return (
            <Button
              type="link"
              onClick={() =>
                sdk?.cancel({ relayerFee: "0", signature: "0x", txData: action.txData }, action.txData.sendingChainId)
              }
            >
              Cancel
            </Button>
          )
        } else if (action.status === NxtpSdkEvents.ReceiverTransactionPrepared && action.event) {
          return (
            <Button
              onClick={() => openSwapModalFinish(action.event)}
            >
              Finish
            </Button>
          )
        } else if (
          action.status === NxtpSdkEvents.ReceiverTransactionFulfilled
          || action.status === NxtpSdkEvents.SenderTransactionFulfilled
        ) {
          return <CheckOutlined style={{ margin: 'auto', display: 'block', color: 'green', fontSize: 24 }} />
        } else {
          const index = executionRoutes.findIndex(item => {
            return (item[0].estimate as CrossEstimate).quote.bid.transactionId === action.txData.transactionId
          })
          if (index !== -1 && executionRoutes[index][0].execution?.status === 'FAILED') {
            return 'Failed'
          } else {
            return <Spin style={{ margin: 'auto', display: 'block' }} indicator={<LoadingOutlined spin style={{ fontSize: 24 }} />} />
          }
        }
      },
    },
  ]

  return (
    <Content className="site-layout" style={{ minHeight: 'calc(100vh)', marginTop: 0 }}>
      <div className="swap-view" style={{ minHeight: '900px', maxWidth: 1600, margin: 'auto' }}>

        <Row justify="center" style={{ padding: 20 }}>
          <Alert
            message={(<h1>Welcome to the <a href="https://github.com/connext/nxtp" target="_blank" rel="nofollow noreferrer">NXTP</a> Testnet Demo</h1>)}
            description={(
              <>
                <p>The demo allows to transfer custom <b>TEST</b> token between Rinkeby and Goerli testnet.</p>
                <p>To use the demo you need gas (ETH) and test token (TEST) on one of the chains. You can get free ETH for testing from public faucets and mint your own TEST here on the website.</p>

                <h2 style={{ textAlign: 'center' }}>Your Balance</h2>
                {web3.account &&
                  <table style={{ background: 'white', margin: 'auto' }}>
                    <thead className="ant-table-thead">
                      <tr className="ant-table-row">
                        <th className="ant-table-cell"></th>
                        {transferChains.map((chain) => (
                          <th key={chain.key} className="ant-table-cell" style={{ textAlign: 'center' }}>{chain.name}</th>
                        ))}
                        <th>
                          <SyncOutlined onClick={() => updateBalances(web3.account!)} spin={updatingBalances} />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="ant-table-tbody" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <tr className="ant-table-row">
                        <td className="ant-table-cell">ETH</td>
                        {transferChains.map((chain) => (
                          <td key={chain.key} className="ant-table-cell">
                            <Row gutter={16}>
                              <Col xs={24} sm={12} >
                                {balances && balances[chain.key][0].amount.toFixed(4)}
                              </Col>
                              <Col xs={24} sm={12}>
                                {chain.faucetUrls && (
                                  <a href={chain.faucetUrls[0]} target="_blank" rel="nofollow noreferrer">Get {chain.coin} <ArrowUpOutlined rotate={45} /></a>
                                )}
                              </Col>
                            </Row>
                          </td>
                        ))}
                        <td className="ant-table-cell"></td>
                      </tr>
                      <tr className="ant-table-row" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <td className="ant-table-cell">TEST</td>
                        {transferChains.map((chain) => (
                          <td key={chain.key} className="ant-table-cell" >
                            <Row gutter={16}>
                              <Col xs={24} sm={12} >
                                {balances && balances[chain.key][1].amount.toFixed(4)}
                              </Col>
                              <Col xs={24} sm={12}>
                                {minting
                                  ? <span className="flashing">minting</span>
                                  : web3.chainId === chain.id
                                    ? <Button type="link" style={{ padding: 0, height: 'auto' }} onClick={() => mintTestToken(chain.key)}>Mint TEST <SettingOutlined /></Button>
                                    : <Button type="link" style={{ padding: 0, height: 'auto' }} onClick={() => switchChain(chain.id)}>Change Chain</Button>
                                }
                              </Col>
                            </Row>
                          </td>
                        ))}
                        <td className="ant-table-cell"></td>
                      </tr>
                    </tbody>
                  </table>
                }
                {!web3.account &&
                  <Row justify="center"><ConnectButton></ConnectButton></Row>
                }
              </>
            )}
            type="info"
          />
        </Row>

        {/* Active Transactions */}
        {activeTransactions.length ?
          <>
            <Row justify="center">
              <h2>Active Transactions</h2>
            </Row>
            <Row justify="center">
              <div style={{ overflow: 'scroll', background: 'white', margin: '10px 20px' }}>
                <Table
                  columns={activeTransactionsColumns}
                  dataSource={activeTransactions}
                  style={{ whiteSpace: 'nowrap' }}
                  pagination={false}
                  rowKey={(row) => row.txData.transactionId}
                ></Table>
              </div>
            </Row>
          </> : <></>
        }

        {/* Swap Form */}
        <Row style={{ margin: 20 }} justify={"center"} className="swap-form">
          <Col>
            <div className="swap-input" style={{ maxWidth: 450, borderRadius: 6, padding: 24, margin: "0 auto" }}>
              <Row>
                <Title className="swap-title" level={4}>Please Specify Your Transaction</Title>
              </Row>

              <Form>
                <SwapForm
                  depositChain={depositChain}
                  setDepositChain={setDepositChain}
                  depositToken={depositToken}
                  setDepositToken={setDepositToken}
                  depositAmount={depositAmount}
                  setDepositAmount={setDepositAmount}

                  withdrawChain={withdrawChain}
                  setWithdrawChain={setWithdrawChain}
                  withdrawToken={withdrawToken}
                  setWithdrawToken={setWithdrawToken}
                  withdrawAmount={withdrawAmount}
                  setWithdrawAmount={setWithdrawAmount}
                  estimatedWithdrawAmount={getSelectedWithdraw()}

                  transferChains={transferChains}
                  tokens={tokens}
                  balances={balances}
                />

                <Row style={{ marginTop: 24 }} justify={"center"}>
                  {submitButton()}
                </Row>
              </Form>

              {/* Advanced Options */}
              <Row justify={"center"} >
                <Collapse ghost>
                  <Collapse.Panel header={`Advanced Options`} key="1">
                    Infinite Approval
                    <div>
                      <Checkbox
                        checked={optionInfiniteApproval}
                        onChange={(e) => setOptionInfiniteApproval(e.target.checked)}
                      >
                        Activate Infinite Approval
                      </Checkbox>
                    </div>

                    Receiving Address
                    <Input
                      value={optionReceivingAddress}
                      onChange={(e) => setOptionReceivingAddress(e.target.value)}
                      pattern="^0x[a-fA-F0-9]{40}$"
                      placeholder="Only when other than your sending wallet"
                      style={{ border: '1px solid rgba(0,0,0,0.25)', borderRadius: 6 }}
                    />

                    Contract Address
                    <Input
                      value={optionContractAddress}
                      onChange={(e) => setOptionContractAddress(e.target.value)}
                      pattern="^0x[a-fA-F0-9]{40}$"
                      placeholder="To call a contract"
                      style={{ border: '1px solid rgba(0,0,0,0.25)', borderRadius: 6 }}
                    />

                    CallData
                    <Input
                      value={optionCallData}
                      onChange={(e) => setOptionCallData(e.target.value)}
                      pattern="^0x[a-fA-F0-9]{64}$"
                      placeholder="Only when calling a contract directly"
                      style={{ border: '1px solid rgba(0,0,0,0.25)', borderRadius: 6 }}
                    />
                  </Collapse.Panel>
                </Collapse>
              </Row>

            </div>
          </Col>
        </Row>

        {/* Footer */}
        <Row justify="center" style={{ marginTop: 48, marginBottom: 8 }}>
          <Col>
            Powered by
          </Col>
        </Row>
        <Row justify="center" align="middle" style={{ marginBottom: 24 }}>
          <Col span={8} style={{ textAlign: 'right' }}>
            <a href="https://connext.network/" target="_blank" rel="nofollow noreferrer">
              <img src={connextWordmark} alt="Connext" style={{ width: '100%', maxWidth: '200px' }} />
            </a>
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            x
          </Col>
          <Col span={8} style={{ textAlign: 'left' }}>
            <a href="https://li.finance/" target="_blank" rel="nofollow noreferrer">
              <img src={lifiWordmark} alt="Li.Finance" style={{ width: '100%', maxWidth: '200px' }} />
            </a>
          </Col>
        </Row>

      </div>

      {modalRouteIndex !== undefined
        ? <Modal
          className="swapModal"
          visible={true}
          onOk={() => setModalRouteIndex(undefined)}
          onCancel={() => setModalRouteIndex(undefined)}
          width={700}
          footer={null}
        >
          <SwappingNxtp route={executionRoutes[modalRouteIndex]}></SwappingNxtp>
        </Modal>
        : ''
      }
    </Content>
  )
}

export default SwapNxtp
