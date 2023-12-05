import { ArcxAnalyticsProvider } from '@arcxmoney/analytics';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { BackgroundGradient } from './components/BackgroundGradient';
import { queryClient } from './config/queryClient';
import {
  Cookie3Provider,
  I18NProvider,
  ThemeProvider,
  WalletProvider,
} from './providers';
import { cookie3Analytics } from '@cookie3/analytics';
import { cookie3Config } from './const/cookie3';

const analytics = cookie3Analytics(cookie3Config);

export const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18NProvider>
        <ThemeProvider>
          <Cookie3Provider value={analytics}>
            <ArcxAnalyticsProvider
              apiKey={`${import.meta.env.VITE_ARCX_API_KEY}`}
            >
              <WalletProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <BackgroundGradient />
                {children}
              </WalletProvider>
            </ArcxAnalyticsProvider>
          </Cookie3Provider>
        </ThemeProvider>
      </I18NProvider>
    </QueryClientProvider>
  );
};
