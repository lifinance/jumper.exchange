// ----------------------------------------------------------------------

import type { LanguageKey } from '@transferto/dapp/src/types';

export type ThemeModesSupported = 'light' | 'dark' | 'auto';
export type WalletConnected = string;

export interface SettingsProps {
  themeMode: ThemeModesSupported;
  languageMode: LanguageKey;
  activeWalletName: WalletConnected;
  clientWallets: string[];
  disabledFeatureCards: string[];
  welcomeScreenClosed: boolean;
  [key: string]: any;
}
export interface SettingsState extends SettingsProps {
  // Wallet
  onWalletConnect: (activeWalletName: string) => void;
  onWalletDisconnect: VoidFunction;

  // Tabs
  onChangeTab: (tab: number) => void;

  // Mode
  onChangeMode: (mode: ThemeModesSupported) => void;

  // Language
  onChangeLanguage: (language: LanguageKey) => void;

  // Installed Wallets
  onClientWallets: (wallet: string) => void;

  // Disable Feature Cards
  onDisableFeatureCard: (id: string) => void;

  // Reset
  onResetSetting: VoidFunction;

  // Welcome Screen
  onWelcomeScreenClosed: (shown: boolean) => void;
}
