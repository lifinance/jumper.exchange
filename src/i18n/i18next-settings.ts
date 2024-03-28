import { locales } from './i18next-locales';

export const fallbackLng = 'en';
export const defaultNS = 'translation';
export const cookieName = 'NEXT_LOCALE';
export const runsOnServerSide = typeof window === 'undefined';

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    // debug: true,
    supportedLngs: locales,
    // preload: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
