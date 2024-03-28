import type * as languages from '../i18n/translations';
import type language from '../i18n/translations/en/language.json';
import type translation from '../i18n/translations/en/translation.json';

// i18n: start -->
export type PartialResource<T> = T extends object
  ? {
      [P in keyof T]?: PartialResource<T[P]>;
    }
  : T;

export type LanguageKey = keyof typeof languages;

export type LanguageResources =
  | {
      [language in LanguageKey]?: PartialResource<
        typeof translation & typeof language
      >;
    }
  | {
      [language: string]: PartialResource<typeof translation & typeof language>;
    };

export type LanguageTranslationResource = {
  [namespace in 'translation']: PartialResource<typeof translation>;
};

export type LanguageResource = {
  [namespace in 'language']: PartialResource<typeof language>;
};

export type LanguageTranslationResources = {
  [language: string]: LanguageTranslationResource;
};
// <-- i18n end
