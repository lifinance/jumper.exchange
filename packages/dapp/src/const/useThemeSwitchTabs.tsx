import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { ThemeModesSupported } from '@transferto/shared/src/types';
import { useTranslation } from 'react-i18next';
import { useUserTracking } from '../hooks';
import { useSettingsStore } from '../stores';
import { EventTrackingTool } from '../types';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from './trackingKeys';

export const useThemeSwitchTabs = () => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();

  const onChangeMode = useSettingsStore((state) => state.onChangeMode);

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
    onChangeMode(mode);
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
