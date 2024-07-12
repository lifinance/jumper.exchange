// ----------------------------------------------------------------------

import type { PartnerThemesData } from '@/types/strapi';
import { PartnerTheme, PartnerThemesAttributes } from '@/types/strapi';

export type ThemeModesSupported = 'light' | 'dark' | 'auto';
export type WalletConnected = string;

export interface SettingsProps {
  partnerThemes: PartnerThemesData[];
  activeTheme: any;
  widgetTheme: any;
  configTheme: any;
  themeMode: ThemeModesSupported;
  clientWallets: string[];
  disabledFeatureCards: string[];
  welcomeScreenClosed: boolean;
}
export interface SettingsState extends SettingsProps {
  // Tabs
  onChangeTab: (tab: number) => void;

  // Mode
  setThemeMode: (mode: ThemeModesSupported) => void;

  setActiveTheme: (activeTheme: any) => void;
  setConfigTheme: (configTheme: any) => void;
  setWidgetTheme: (widgetTheme: any) => void;

  // Installed Wallets
  setClientWallets: (wallet: string) => void;

  // Disable Feature Cards
  setDisabledFeatureCard: (id: string) => void;

  // Reset
  setDefaultSettings: VoidFunction;

  // Welcome Screen
  setWelcomeScreenClosed: (shown: boolean) => void;

  setPartnerThemes: (themes: PartnerThemesData[]) => void;
}
