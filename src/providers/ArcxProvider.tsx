'use client';
import { ArcxAnalyticsProvider } from '@arcxmoney/analytics';
import type { FC, PropsWithChildren } from 'react';

export const ArcxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ArcxAnalyticsProvider apiKey={process.env.NEXT_PUBLIC_ARCX_API_KEY}>
      {children}
    </ArcxAnalyticsProvider>
  );
};
