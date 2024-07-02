import { Snackbar } from '@/components/Snackbar';
import { PixelBg } from '@/components/illustrations/PixelBg';
import { AppProvider } from '@/providers/AppProvider';
import i18nConfig from 'i18nconfig';
import React from 'react';

export default async function RootLayout({
  children,
  params: { lng, partnerTheme },
}: {
  children: React.ReactNode;
  params: { lng: string; partnerTheme: string };
}) {
  return (
    <AppProvider lang={lng} partnerPageUid={partnerTheme}>
      {children}
      <Snackbar />
      <PixelBg />
    </AppProvider>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((lng) => ({ lng }));
}
