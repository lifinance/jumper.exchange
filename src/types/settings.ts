// ----------------------------------------------------------------------

import type { LanguageKey } from 'src/types';

export type ThemeModesSupported = 'light' | 'dark' | 'auto';
export type WalletConnected = string;

export interface SettingsProps {
  themeMode: ThemeModesSupported;
  languageMode: LanguageKey;
  clientWallets: string[];
  disabledFeatureCards: string[];
  welcomeScreenClosed: boolean;
  [key: string]: any;
}
export interface SettingsState extends SettingsProps {
  // Tabs
  onChangeTab: (tab: number) => void;

  // Mode
  setThemeMode: (mode: ThemeModesSupported) => void;

  // Language
  setLanguageMode: (language: LanguageKey) => void;

  // Installed Wallets
  setClientWallets: (wallet: string) => void;

  // Disable Feature Cards
  setDisabledFeatureCard: (id: string) => void;

  // Reset
  setDefaultSettings: VoidFunction;

  // Welcome Screen
  setWelcomeScreenClosed: (shown: boolean) => void;
}
