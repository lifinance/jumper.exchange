import * as supportedLanguages from 'i18n';
import { useTranslation } from 'react-i18next';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from 'src/const';
import { useUserTracking } from 'src/hooks';
import { useSettingsStore } from 'src/stores';
import type { LanguageKey } from 'src/types';
import { EventTrackingTool } from 'src/types';

export const useLanguagesContent = () => {
  const { i18n } = useTranslation();
  const [languageMode, setLanguageMode] = useSettingsStore((state) => [
    state.languageMode,
    state.setLanguageMode,
  ]);
  const { trackEvent } = useUserTracking();
  const handleSwitchLanguage = (newLanguage: LanguageKey) => {
    i18n.changeLanguage(newLanguage);
    setLanguageMode(newLanguage);
    trackEvent({
      category: TrackingCategory.LanguageMenu,
      action: TrackingAction.SwitchLanguage,
      label: `language_${newLanguage}`,
      data: { [TrackingEventParameter.SwitchedLanguage]: newLanguage },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
  };

  const languages = Object.entries(supportedLanguages)
    .sort()
    .map(([language, languageValue]) => ({
      label: languageValue.language.value,
      checkIcon: (languageMode || i18n.resolvedLanguage) === language,
      onClick: () => handleSwitchLanguage(language as LanguageKey),
    }));

  return languages;
};
