'use client';

import type { FlatNamespace, KeyPrefix } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useContext, useEffect } from 'react';
import type {
  FallbackNs,
  UseTranslationOptions,
  UseTranslationResponse,
} from 'react-i18next';
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next';

import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { locales } from '../i18next-locales';
import { getOptions, runsOnServerSide } from '../i18next-settings';
import { ClientTranslationContext } from './i18next-client-provider';

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
  const { language, setLanguage } = useContext(ClientTranslationContext);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  useEffect(() => {
    if (!language || i18n.language === language) {
      return;
    }
    i18n.changeLanguage(language);
    setLanguage(language);
  }, [language, i18n, setLanguage]);

  if (runsOnServerSide && language && i18n.language !== language) {
    i18n.changeLanguage(language);
  }
  return ret;
}
