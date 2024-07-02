import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useSettingsStore } from '@/stores/settings';
import type { ThemeModesSupported } from '@/types/settings';
import { EventTrackingTool } from '@/types/userTracking';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';

export const useThemeSwitchTabs = () => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const [, setCookie] = useCookies(['theme']);
  const browserTheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
  const { availableWidgetThemeMode, activeUid } = usePartnerTheme();
  const [themeMode, setThemeMode] = useSettingsStore((state) => [
    state.themeMode,
    state.setThemeMode,
  ]);
  const handleSwitchMode = (mode: ThemeModesSupported) => {
    trackEvent({
      category: TrackingCategory.ThemeSection,
      action: TrackingAction.SwitchTheme,
      label: `theme_${mode}`,
      data: {
        [TrackingEventParameter.SwitchedTheme]: mode,
      },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    setCookie('theme', mode === 'auto' ? browserTheme : mode, { path: '/' });
    setThemeMode(mode);
  };

  // tooltips:
  const lightModeTooltip =
    activeUid && availableWidgetThemeMode === 'dark'
      ? t('navbar.themes.lightModeDisabled')
      : t('navbar.themes.switchToLight');
  const darkModeTooltip =
    activeUid && availableWidgetThemeMode === 'light'
      ? t('navbar.themes.darkModeDisabled')
      : t('navbar.themes.switchToDark');
  const systemModeTooltip =
    activeUid && availableWidgetThemeMode !== 'system'
      ? t('navbar.themes.systemModeDisabled')
      : t('navbar.themes.switchToSystem');

  // handlers:
  let lightModeEnabled = false;
  let darkModeEnabled = false;
  let systemModeEnabled = false;

  if (activeUid) {
    if (availableWidgetThemeMode === 'system') {
      systemModeEnabled = true;
      lightModeEnabled = true;
      darkModeEnabled = true;
    } else {
      if (availableWidgetThemeMode === 'light') {
        lightModeEnabled = true;
      }
      if (availableWidgetThemeMode === 'dark') {
        darkModeEnabled = true;
      }
    }
  } else {
    systemModeEnabled = true;
    lightModeEnabled = true;
    darkModeEnabled = true;
  }

  const output = [
    {
      tooltip: themeMode !== 'light' ? lightModeTooltip : undefined,
      value: 0,
      blur: !lightModeEnabled,
      icon: (
        <LightModeIcon
          sx={{
            fill: 'currentColor',
          }}
        />
      ),
      onClick: () => {
        lightModeEnabled && themeMode !== 'light' && handleSwitchMode('light');
      },
    },
    {
      tooltip: themeMode !== 'dark' ? darkModeTooltip : undefined,
      value: 1,
      blur: !darkModeEnabled,
      icon: (
        <NightlightIcon
          sx={{
            fill: 'currentColor',
          }}
        />
      ),
      onClick: () => {
        darkModeEnabled && themeMode !== 'dark' && handleSwitchMode('dark');
      },
    },
    {
      tooltip: themeMode !== 'auto' ? systemModeTooltip : undefined,
      value: 2,
      blur: !systemModeEnabled,
      icon: (
        <BrightnessAutoIcon
          sx={{
            fill: 'currentColor',
          }}
        />
      ),
      onClick: () => {
        systemModeEnabled && themeMode !== 'auto' && handleSwitchMode('auto');
      },
    },
  ];

  return output;
};
