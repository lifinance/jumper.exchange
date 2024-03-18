import { Navbar } from 'src/components/Navbar/Navbar';
import { AppProvider } from 'src/providers/AppProvider';

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  // if (locales.indexOf(lng) < 0) {
  //   lng = fallbackLng;
  // }
  return (
    <html lang="en">
      <head>
        {/* <Script
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
        </Script> */}
      </head>

      <body>
        <AppProvider lng={lng}>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}