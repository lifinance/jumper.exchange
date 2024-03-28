'use client';

import { useChains } from '@/hooks/useChains';
import {
  alpha,
  binance,
  bitget,
  bitpie,
  block,
  brave,
  createCoinbaseConnector,
  createWalletConnectConnector,
  dcent,
  exodus,
  frame,
  frontier,
  gate,
  hyperpay,
  imtoken,
  liquality,
  okx,
  oneinch,
  ownbit,
  safe,
  safepal,
  status,
  taho,
  tokenary,
  tokenpocket,
  trust,
  xdefi,
} from '@lifi/wallet-management';
import { useMemo, type FC, type PropsWithChildren } from 'react';
import type { Chain } from 'viem';
import { createClient } from 'viem';
import type { CreateConnectorFn } from 'wagmi';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { formatChain } from './utils';

const JUMPER_LOGO_URL = 'https://jumper.exchange/logo-144x144.svg';

const connectors: Record<string, CreateConnectorFn> = {
  walletConnect: createWalletConnectConnector({
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  }),
  coinbase: createCoinbaseConnector({
    appName: 'Jumper.Exchange',
    appLogoUrl: JUMPER_LOGO_URL,
  }),
  bitget,
  gate,
  exodus,
  taho,
  binance,
  frontier,
  okx,
  trust,
  status,
  alpha,
  block,
  bitpie,
  brave,
  dcent,
  frame,
  hyperpay,
  imtoken,
  liquality,
  ownbit,
  tokenpocket,
  xdefi,
  oneinch,
  tokenary,
  safepal,
  safe,
};

export const EVMProvider: FC<PropsWithChildren> = ({ children }) => {
  const { chains } = useChains();
  const wagmiConfig = useMemo(() => {
    const _chains: [Chain, ...Chain[]] = chains?.length
      ? (chains.map(formatChain) as [Chain, ...Chain[]])
      : [mainnet];
    // Add ENS contracts
    const _mainnet = _chains.find((chain) => chain.id === mainnet.id);
    if (_mainnet) {
      _mainnet.contracts = mainnet.contracts;
    }
    const wagmiConfig = createConfig({
      chains: _chains,
      connectors: Object.values(connectors) as CreateConnectorFn[],
      client({ chain }) {
        return createClient({ chain, transport: http() });
      },
      // transports: _chains.reduce(
      //   (transports, chain) => {
      //     transports[chain.id] = http();
      //     return transports;
      //   },
      //   {} as Record<number, Transport>,
      // ),

      // Workaround for Wagmi config re-creation after we load chains.
      // Internal Wagmi hydration logic doesn't allow the safe creation of new configs in runtime.
      ssr: !chains?.length,
    });

    return wagmiConfig;
  }, [chains]);

  return (
    <WagmiProvider
      config={wagmiConfig}
      reconnectOnMount={Boolean(chains?.length)}
    >
      {children}
    </WagmiProvider>
  );
};
