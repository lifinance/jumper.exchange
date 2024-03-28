'use client';
import { type FC, type PropsWithChildren } from 'react';
import { EVMProvider } from './EVMProvider';
import { SolanaProvider } from './SolanaProvider';

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SolanaProvider>
      <EVMProvider>{children}</EVMProvider>
    </SolanaProvider>
  );
};
