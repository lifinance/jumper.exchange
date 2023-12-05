import CreditCardIcon from '@mui/icons-material/CreditCard';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useUserTracking } from '../hooks';
import { EventTrackingTool } from '../types';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from './trackingKeys';

export const useNavbarTabs = () => {
  const { trackEvent } = useUserTracking();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleClickTab =
    (tab: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      window.history.replaceState(null, document.title, `/${tab}`);
      trackEvent({
        category: TrackingCategory.Navigation,
        action: TrackingAction.SwitchTab,
        label: `switch_tab_to_${tab}`,
        data: { [TrackingEventParameter.Tab]: tab },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    };

  const output = [
    {
      label: t('navbar.links.exchange'),
      value: 0,
      icon: (
        <SwapHorizIcon
          sx={{
            marginRight: '6px',
            marginBottom: '0px !important',
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : theme.palette.black.main,
          }}
        />
      ),
      onClick: handleClickTab('exchange'),
    },
    {
      label: t('navbar.links.refuel'),
      onClick: handleClickTab('refuel'),
      value: 1,
      icon: (
        <EvStationOutlinedIcon
          sx={{
            marginRight: '6px',
            marginBottom: '0px !important',
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : theme.palette.black.main,
          }}
        />
      ),
    },
    {
      label: t('navbar.links.buy'),
      onClick: handleClickTab('buy'),
      value: 2,
      icon: (
        <CreditCardIcon
          sx={{
            marginRight: '6px',
            marginBottom: '0px !important',
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : theme.palette.black.main,
          }}
        />
      ),
      disabled: import.meta.env.VITE_ONRAMPER_ENABLED !== 'true',
    },
  ];

  return output;
};
