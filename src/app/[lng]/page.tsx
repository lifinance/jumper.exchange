import { locales } from '@/i18n/i18next-locales';
import { fallbackLng } from '@/i18n/i18next-settings';
import dynamic from 'next/dynamic';

import type { Metadata } from 'next';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jumper | Multi-Chain Bridging & Swapping (powered by LI.FI)', // Updated title
    openGraph: {
      title: 'Jumper.Exchange', // Override title
      description: 'Multi-Chain Bridging & Swapping (powered by LI.FI)', // Override description
      siteName: 'Jumper.Exchange', // Override site name
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
      description: 'Multi-Chain Bridging & Swapping (powered by LI.FI)', // Twitter description
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
      apple: [
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
      shortcut: [], // You can include any shortcuts if necessary
    },
  };
}

const App = dynamic(() => import('../ui/app/App'), { ssr: false });

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  if (locales.indexOf(lng) < 0) {
    lng = fallbackLng;
  }

  return <App starterVariant="default" />;
}
