// @mui
import type { LanguageKey, ThemeModesSupported } from 'src/types';

export const cookiesExpires = 3;

export const localStorageKey = {
  activeTab: 'activeTab',
  activeWalletName: 'activeWalletName',
  themeMode: 'themeMode',
  languageMode: 'languageMode',
  disabledFeatureCards: 'disabledFeatureCards',
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultLang = 'en'; // English

const setLanguage = () => {
  if (!!localStorage.getItem(localStorageKey.languageMode)) {
    return localStorage.getItem(localStorageKey.languageMode);
  } else {
    return '';
  }
};

interface DefaultSettingsType {
  themeMode: ThemeModesSupported;
  languageMode: LanguageKey;
  activeWalletName: string;
  disabledFeatureCards: string[];
  welcomeScreenClosed: boolean;
}

export const defaultSettings: DefaultSettingsType = {
  themeMode:
    (localStorage.getItem(localStorageKey.themeMode) as ThemeModesSupported) ||
    'auto',
  languageMode: setLanguage() as LanguageKey,
  activeWalletName:
    (localStorage.getItem(localStorageKey.activeWalletName) as string) || '',
  disabledFeatureCards: [],
  welcomeScreenClosed: false,
};
