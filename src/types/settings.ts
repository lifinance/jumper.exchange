// ----------------------------------------------------------------------

export type ThemeModesSupported = 'light' | 'dark' | 'auto';
export type WalletConnected = string;

export interface SettingsProps {
  themeMode: ThemeModesSupported;
  clientWallets: string[];
  disabledFeatureCards: string[];
  partnerThemeUid: string | undefined;
  partnerPageThemeUid: string | undefined;
  welcomeScreenClosed: boolean;
}
export interface SettingsState extends SettingsProps {
  // Tabs
  onChangeTab: (tab: number) => void;

  // Mode
  setThemeMode: (mode: ThemeModesSupported) => void;

  // Installed Wallets
  setClientWallets: (wallet: string) => void;

  // Partner Themes
  setPartnerThemeUid: (partnerThemeUid?: string) => void;

  // Partner Page Themes
  setPartnerPageThemeUid: (partnerPageThemeUid?: string) => void;

  // Disable Feature Cards
  setDisabledFeatureCard: (id: string) => void;

  // Reset
  setDefaultSettings: VoidFunction;

  // Welcome Screen
  setWelcomeScreenClosed: (shown: boolean) => void;
}
