'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          enabled: true,
          staleTime: 3_600_000,
          refetchInterval: false,
          refetchIntervalInBackground: false,
          refetchOnWindowFocus: true,
          refetchOnReconnect: true,
          refetchOnMount: true,
          retryOnMount: true,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
