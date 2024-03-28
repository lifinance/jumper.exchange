import type { LanguageResources } from '@/types/i18n';
import * as supportedLocales from './translations';

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [locale: string]: Translation;
}

export const locales = Object.keys(supportedLocales).map((locale: string) => {
  return locale as LanguageResources as string;
});
