'use client';
import { useChains } from '@/hooks/useChains';
import { injected } from 'wagmi/connectors';

import {
  createDefaultWagmiConfig,
  safe,
  useSyncWagmiConfig,
} from '@lifi/wallet-management';
import { type FC, type PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';

const JUMPER_LOGO_URL = 'https://jumper.exchange/logo-144x144.svg';

const { config, connectors } = createDefaultWagmiConfig({
  walletConnect: {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
  coinbase: {
    appName: 'Jumper.Exchange',
    appLogoUrl: JUMPER_LOGO_URL,
  },
  connectors: [safe],
});

export const metaMaskConnector = injected({
  target: 'metaMask',
  shimDisconnect: false,
});

export const phantomConnector = injected({
  target: 'phantom',
  shimDisconnect: false,
});

export const EVMProvider: FC<PropsWithChildren> = ({ children }) => {
  const { chains } = useChains();
  useSyncWagmiConfig(config, connectors, chains);

  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
      {children}
    </WagmiProvider>
  );
};
