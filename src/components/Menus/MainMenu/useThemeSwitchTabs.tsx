import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useSettingsStore } from '@/stores/settings';
import type { ThemeModesSupported } from '@/types/settings';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

export const useThemeSwitchTabs = () => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const [, setCookie] = useCookies(['theme']);
  const browserTheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const setThemeMode = useSettingsStore((state) => state.setThemeMode);
  const handleSwitchMode = (mode: ThemeModesSupported) => {
    trackEvent({
      category: TrackingCategory.ThemeSection,
      action: TrackingAction.SwitchTheme,
      label: `theme_${mode}`,
      data: {
        [TrackingEventParameter.SwitchedTheme]: mode,
      },
    });
    setCookie('theme', mode === 'auto' ? browserTheme : mode, { path: '/' });
    setThemeMode(mode);
  };

  const output = [
    {
      tooltip: t('navbar.themes.switchToLight'),
      value: 0,
      icon: (
        <LightModeIcon
          sx={{
            fill: 'currentColor',
          }}
        />
      ),
      onClick: () => {
        handleSwitchMode('light');
      },
    },
    {
      tooltip: t('navbar.themes.switchToDark'),
      value: 1,
      icon: (
        <NightlightIcon
          sx={{
            fill: 'currentColor',
          }}
        />
      ),
      onClick: () => {
        handleSwitchMode('dark');
      },
    },
    {
      tooltip: t('navbar.themes.switchToSystem'),
      value: 2,
      icon: (
        <BrightnessAutoIcon
          sx={{
            fill: 'currentColor',
          }}
        />
      ),
      onClick: () => {
        handleSwitchMode('auto');
      },
    },
  ];

  return output;
};
