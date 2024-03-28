'use client';
import { BackgroundGradient } from '@/components/BackgroundGradient';
import { Navbar } from '@/components/Navbar/Navbar';
import { PoweredBy } from '@/components/PoweredBy/PoweredBy';
import { cookie3Config } from '@/const/cookie3';
import { Cookie3Provider } from '@/providers/Cookie3Provider';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { WalletProvider } from '@/providers/WalletProvider';
import { ArcxAnalyticsProvider } from '@arcxmoney/analytics';
import { cookie3Analytics } from '@cookie3/analytics';
import { useEffect, useState, type PropsWithChildren } from 'react';
import { UserTracking } from 'src/UserTracking';

interface AppProviderProps {
  children: React.ReactNode | JSX.Element;
  fixedPoweredBy?: boolean;
}

export const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = ({
  children,
  fixedPoweredBy,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const analytics = cookie3Analytics(cookie3Config);

  return isClient ? (
    <ReactQueryProvider>
      <ThemeProvider>
        <ArcxAnalyticsProvider
          apiKey={`${process.env.NEXT_PUBLIC_ARCX_API_KEY}`}
        >
          <WalletProvider>
            <UserTracking />
            <Cookie3Provider value={analytics}>
              <BackgroundGradient />
              <Navbar />
              {children}
              <PoweredBy fixedPosition={fixedPoweredBy} />
            </Cookie3Provider>
          </WalletProvider>
        </ArcxAnalyticsProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  ) : null;
};
