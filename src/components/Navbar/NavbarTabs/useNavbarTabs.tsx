import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { replacePathInUrl } from '@/utils/replacePathInUr';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

interface useNavbarTabsProps {
  navbarPageReload?: boolean;
}

export const useNavbarTabs = ({ navbarPageReload }: useNavbarTabsProps) => {
  const { trackEvent } = useUserTracking();
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleClickTab =
    (tab: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      window.history.replaceState(null, document.title, `/${tab}`);
      pathname && replacePathInUrl(pathname, tab);
      if (navbarPageReload) {
        router.push(`/${tab}`);
      }
      trackEvent({
        category: TrackingCategory.Navigation,
        action: TrackingAction.SwitchTab,
        label: `switch_tab_to_${tab}`,
        data: { [TrackingEventParameter.Tab]: tab },
        enableAddressable: true,
      });
    };

  const output = [
    {
      label: t('navbar.links.exchange'),
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
      onClick: handleClickTab('exchange'),
    },
    {
      label: t('navbar.links.refuel'),
      onClick: handleClickTab('refuel'),
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
      label: t('navbar.links.buy'),
      onClick: handleClickTab('buy'),
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
