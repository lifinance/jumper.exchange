'use client';

import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { cookieName } from '@/i18n/i18next-settings';
import * as supportedLanguages from '@/i18n/translations';
import { useClientTranslation } from '@/i18n/useClientTranslation';
import type { LanguageKey } from '@/types/i18n';
import { EventTrackingTool } from '@/types/userTracking';
import { replaceLocaleInUrl } from '@/utils/replaceLocaleInUrl';
import { usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';

export const useLanguagesContent = () => {
  const pathname = usePathname();
  const { i18n } = useClientTranslation();
  const [_, setCookie] = useCookies([cookieName]);
  const { trackEvent } = useUserTracking();
  const handleSwitchLanguage = (newLanguage: LanguageKey) => {
    trackEvent({
      category: TrackingCategory.LanguageMenu,
      action: TrackingAction.SwitchLanguage,
      label: `language_${newLanguage}`,
      data: { [TrackingEventParameter.SwitchedLanguage]: newLanguage },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    i18n.changeLanguage(newLanguage);
    setCookie(cookieName, newLanguage, { path: '/' });
    replaceLocaleInUrl(pathname, newLanguage);
  };

  const languages = Object.entries(supportedLanguages)
    .sort()
    .map(([language, languageValue]) => ({
      label: languageValue.language.value,
      checkIcon: i18n.language === language,
      onClick: () => handleSwitchLanguage(language as LanguageKey),
    }));

  return languages;
};
