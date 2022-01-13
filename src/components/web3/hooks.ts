/* eslint-disable no-console */
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'

import { getInjectedConnector, injected } from './connectors'

export function useEagerConnect() {
  const { activate, active, library } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then(async (isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(await getInjectedConnector(), undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [activate, library]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any // TODO: Fix typing
    if (ethereum && ethereum.on && !error && !suppress) {
      const handleConnect = async () => {
        console.log("Handling 'connect' event")
        if (!active) {
          activate(await getInjectedConnector())
        }
      }
      const handleChainChanged = async (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        if (!active) {
          activate(await getInjectedConnector())
        }
      }
      const handleAccountsChanged = async (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(await getInjectedConnector())
        }
      }
      const handleNetworkChanged = async (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        if (!active) {
          activate(await getInjectedConnector())
        }
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}
