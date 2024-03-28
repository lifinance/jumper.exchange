// @mui

import type { LanguageKey } from '@/types/i18n';
import type { ThemeModesSupported } from '@/types/settings';

export const cookiesExpires = 3;

export const localStorageKey = {
  activeTab: 'activeTab',
  themeMode: 'themeMode',
  clientWallets: 'clientWallets',
  disabledFeatureCards: 'disabledFeatureCards',
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

const setLanguage = () => {
  // if (
  //   typeof window === 'undefined' &&
  //   !!localStorage.getItem(localStorageKey.languageMode)
  // ) {
  //   return localStorage.getItem(localStorageKey.languageMode);
  // } else {
  return '';
  // }
};

interface DefaultSettingsType {
  themeMode: ThemeModesSupported;
  languageMode: LanguageKey;
  clientWallets: string[];
  disabledFeatureCards: string[];
  welcomeScreenClosed: boolean;
}

export const defaultSettings: DefaultSettingsType = {
  themeMode:
    // (typeof window === 'undefined' &&
    //   (localStorage.getItem(
    //     localStorageKey.themeMode,
    //   ) as ThemeModesSupported)) ||
    'auto',
  languageMode: setLanguage() as LanguageKey,
  clientWallets: [],
  disabledFeatureCards: [],
  welcomeScreenClosed: false,
};
