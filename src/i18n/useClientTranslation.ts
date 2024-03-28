'use client';

import type { FlatNamespace, KeyPrefix } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type {
  FallbackNs,
  UseTranslationOptions,
  UseTranslationResponse,
} from 'react-i18next';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
import { locales } from '.';

import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions, runsOnServerSide } from './i18next-settings';

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./translations/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'navigator'],
    },
    preload: runsOnServerSide ? locales : [],
    // required to be true for paritally loading languages from resources and backend
    partialBundledLanguages: true,
    react: { useSuspense: false },
    // resources,
    // fallbackLng: fallbackLng,
    ns: ['translation', 'language'],
    returnEmptyString: false,
  });

export function useClientTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(
  ns?: Ns,
  options?: UseTranslationOptions<KPrefix>,
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const ret = useTranslationOrg(ns, options);
  return ret;
}
