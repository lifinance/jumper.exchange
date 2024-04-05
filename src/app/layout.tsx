import Script from 'next/script';
import React from 'react';
import { metadata as JumperMetadata } from './lib/metadata';

export const metadata = JumperMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (locales.indexOf(lng) < 0) {
  //   lng = fallbackLng;
  // }
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}');
          `}
        </Script>
      </head>

      <body>{children}</body>
    </html>
  );
}
