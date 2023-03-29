import { Token } from '@lifi/sdk';
import {
  addChain,
  switchChain,
  switchChainAndAddToken,
} from '@lifi/wallet-management';
import { HiddenUI, LiFiWidget, WidgetConfig } from '@lifi/widget';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserTracking } from '../../hooks/useUserTracking';
import { useWallet } from '../../providers/WalletProvider';
import { LanguageKey } from '../../types/i18n';

export function Widget({ starterVariant }) {
  const theme = useTheme();
  const { disconnect, account } = useWallet();
  const { i18n } = useTranslation();
  const isDarkMode = theme.palette.mode === 'dark';
  const { trackEvent } = useUserTracking();

  // load environment config
  const env = import.meta.env;
  const apiUrl = env.VITE_LIFI_API_URL;
  let rpcs = {};
  try {
    rpcs = JSON.parse(env.VITE_CUSTOM_RPCS);
  } catch (e) {
    if (env.DEV) {
      console.warn('Parsing custom rpcs failed', e);
    }
  }

  const widgetConfig: WidgetConfig = useMemo(() => {
    return {
      variant: starterVariant ? starterVariant : 'expandable',
      walletManagement: {
        signer: account.signer,
        connect: async () => {
          let promiseResolver: (value: void | PromiseLike<void>) => void;
          const loginAwaiter = new Promise<void>(
            (resolve) => (promiseResolver = resolve),
          );

          await loginAwaiter;
          if (account.signer) {
            return account.signer!;
          } else {
            throw Error('No signer object after login');
          }
        },
        disconnect: async () => {
          trackEvent({
            category: 'wallet',
            action: 'disconnect',
            label: 'widget',
            data: { source: 'widget' },
          });
          disconnect();
        },
        switchChain: async (reqChainId: number) => {
          await switchChain(reqChainId);
          if (account.signer) {
            trackEvent({
              category: 'wallet',
              action: 'switch-chain',
              label: `${reqChainId}`,
              data: {
                switchChain: reqChainId,
              },
              // transport: "xhr", // optional, beacon/xhr/image
            });
            return account.signer!;
          } else {
            throw Error('No signer object after chain switch');
          }
        },
        addToken: async (token: Token, chainId: number) => {
          trackEvent({
            category: 'wallet',
            action: 'add-token',
            label: `${token}`,
            data: {
              tokenAdded: `${token}`,
              tokenAddChainId: chainId,
            },
          });
          await switchChainAndAddToken(chainId, token);
        },
        addChain: async (chainId: number) => {
          trackEvent({
            category: 'wallet',
            action: 'add-chain',
            label: `${chainId}`,
            data: {
              chainIdAdded: `${chainId}`,
            },
            // transport: "xhr", // optional, beacon/xhr/image
          });
          return addChain(chainId);
        },
      },
      containerStyle: {
        borderRadius: '12px',
        boxShadow: !isDarkMode
          ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)'
          : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)',
      },
      languages: {
        default: i18n.language as LanguageKey,
        allow: i18n.languages as LanguageKey[],
      },
      appearance: !!isDarkMode ? 'dark' : 'light',
      hiddenUI: [HiddenUI.Appearance, HiddenUI.Language, HiddenUI.PoweredBy],
      theme: {
        shape: {
          borderRadius: 12,
          borderRadiusSecondary: 24,
        },
        palette: {
          background: {
            paper: theme.palette.surface2.main,
            default: theme.palette.surface1.main,
          },
          primary: {
            main: theme.palette.accent1.main,
          },
          grey: {
            300: theme.palette.grey[300],
            800: theme.palette.grey[800],
          },
        },
      },
      localStorageKeyPrefix: `jumper-${starterVariant}`,
      sdkConfig: {
        apiUrl,
        rpcs,
      },
    };
  }, [
    account.signer,
    apiUrl,
    disconnect,
    i18n.language,
    i18n.languages,
    isDarkMode,
    rpcs,
    starterVariant,
    theme.palette.accent1.main,
    theme.palette.grey,
    theme.palette.surface1.main,
    theme.palette.surface2.main,
    trackEvent,
  ]);
  return <LiFiWidget config={widgetConfig} />;
}
