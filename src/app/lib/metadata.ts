import type { Metadata } from 'next';

const siteName = 'Jumper.Exchange';
const title = 'Jumper | Multi-Chain Bridging & Swapping';
const description =
  'Jumper is Crypto’s Everything Exchange, enabling seamless swap and bridge transactions across 25 blockchains. By aggregating all of DeFi liquidity, Jumper ensures the best routes for any token transaction.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: 'Jumper.Exchange',
    description,
    siteName,
    images: [
      {
        url: 'https://jumper.exchange/preview.png', // Default image
        width: 900,
        height: 450,
      },
    ],
    type: 'website', // Override type
  },
  twitter: {
    // Twitter metadata
    // cardType: 'summary_large_image',
    site: '@JumperExchange',
    title: 'Jumper.Exchange', // Twitter title
    description,
    images: 'https://jumper.exchange/preview.png', // Twitter image
  },
  icons: {
    // Icons metadata
    icon: [
      {
        url: '/favicon_DT.svg',
        sizes: 'any',
        media: '(prefers-color-scheme: dark)',
      },
      { url: '/favicon_DT.png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon_DT.ico', media: '(prefers-color-scheme: dark)' },
      {
        url: '/favicon.svg',
        sizes: 'any',
        media: '(prefers-color-scheme: light)',
      },
      { url: '/favicon.png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
    ],
    shortcut: [
      {
        url: '/apple-touch-icon-57x57.png',
        sizes: '57x57',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/apple-touch-icon-180x180.png',
        sizes: '180x180',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/apple-touch-icon-57x57_DT.png',
        sizes: '57x57',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/apple-touch-icon-180x180_DT.png',
        sizes: '180x180',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};
