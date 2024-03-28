import { version } from '@lifi/widget';
import { BrowserTracing } from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';
import * as Sentry from '@sentry/react';

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new CaptureConsole({
        levels: ['error'],
      }),
      new BrowserTracing(),
      // new HttpClient({
      //   failedRequestStatusCodes: [
      //     [400, 499],
      //     [500, 599],
      //   ],
      // }),
      new Sentry.Replay({
        maskAllInputs: false,
        maskAllText: false,
      }),
    ],
    sampleRate: 0.25,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0.25,
    release: version,
    // ...(process.env.MODE && { environment: process.env.MODE }), // todo: add
    // ...(process.env.PROD && { enabled: process.env.PROD }),
    ignoreErrors: [
      "MetaMask: 'eth_accounts' unexpectedly updated accounts.",
      'user rejected transaction',
    ],
  });
};
