import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { EventTrackingTool } from '@/types/userTracking';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

interface useVerticalTabsProps {
  verticalPageReload?: boolean;
}

export const useVerticalTabs = ({
  verticalPageReload,
}: useVerticalTabsProps) => {
  const { trackEvent } = useUserTracking();
  const theme = useTheme();
  const router = useRouter();

  const handleClickTab =
    (tab: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      // Does not get updated if taken from the hook for some reasons
      const searchParams = new URLSearchParams(window.location.search);

      // Only replace it if exists
      if (searchParams.has('toToken')) {
        searchParams.set(
          'toToken',
          '0x0000000000000000000000000000000000000000',
        );
      }

      let path = searchParams.toString();
      path = path.startsWith('?') ? path.substring(1) : path;

      router.push(`/${tab}?${path}`);
      trackEvent({
        category: TrackingCategory.Navigation,
        action: TrackingAction.SwitchTab,
        label: `switch_tab_to_${tab}`,
        data: { [TrackingEventParameter.Tab]: tab },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
        enableAddressable: true,
      });
    };

  const output = [
    {
      onClick: handleClickTab(''),
      value: 0,
      icon: (
        <SwapHorizIcon
          sx={{
            marginRight: 0.75,
            marginBottom: `${theme.spacing(0)} !important`,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : theme.palette.black.main,
          }}
        />
      ),
    },
    {
      onClick: handleClickTab('gas/'),
      value: 1,
      icon: (
        <EvStationOutlinedIcon
          sx={{
            marginRight: 0.75,
            marginBottom: `${theme.spacing(0)} !important`,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : theme.palette.black.main,
          }}
        />
      ),
    },
    {
      onClick: handleClickTab('buy/'),
      value: 2,
      icon: (
        <CreditCardIcon
          sx={{
            marginRight: 0.75,
            marginBottom: `${theme.spacing(0)} !important`,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : theme.palette.black.main,
          }}
        />
      ),
      disabled: process.env.NEXT_PUBLIC_ONRAMPER_ENABLED !== 'true',
    },
  ];

  return output;
};
