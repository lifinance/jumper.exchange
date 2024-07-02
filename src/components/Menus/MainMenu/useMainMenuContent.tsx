import { Tabs } from '@/components/Tabs/Tabs';
import { Discord } from '@/components/illustrations/Discord';
import { MenuKeysEnum } from '@/const/menuKeys';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import {
  DISCORD_URL,
  EXPLORER_URL,
  JUMPER_FEST,
  JUMPER_LEARN_PATH,
  JUMPER_LOYALTY_PATH,
  X_URL,
} from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu';
import { useSettingsStore } from '@/stores/settings';
import { EventTrackingTool } from '@/types/userTracking';
import { appendUTMParametersToLink } from '@/utils/append-utm-params-to-link';
import { getContrastAlphaColor } from '@/utils/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import FestivalIcon from '@mui/icons-material/Festival';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import XIcon from '@mui/icons-material/X';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useThemeSwitchTabs } from './useThemeSwitchTabs';
import { OPLogo } from 'src/components/illustrations/OPLogo';

export const useMainMenuContent = () => {
  const { t, i18n } = useTranslation();
  const { trackPageload, trackEvent } = useUserTracking();
  const router = useRouter();
  const theme = useTheme();
  const { setSupportModalState, setSubMenuState, closeAllMenus } = useMenuStore(
    (state) => state,
  );
  const themeMode = useSettingsStore((state) => state.themeMode);
  const explorerUrl = appendUTMParametersToLink(EXPLORER_URL, {
    utm_campaign: 'jumper_to_explorer',
    utm_medium: 'menu',
  });

  const themeSwitchTabs = useThemeSwitchTabs();

  const containerStyles = {
    display: 'flex',
    width: '100%',
    borderRadius: '24px',
    div: {
      height: 38,
    },
    '.MuiTabs-indicator': {
      height: 38,
      zIndex: -1,
      borderRadius: '18px',
    },
  };

  const tabStyles = {
    height: 38,
    margin: theme.spacing(0.75),
    minWidth: 'unset',
    borderRadius: '18px',
  };

  return [
    {
      children: (
        <Tabs
          data={themeSwitchTabs}
          value={themeMode === 'light' ? 0 : themeMode === 'dark' ? 1 : 2}
          ariaLabel="theme-switch-tabs"
          containerStyles={containerStyles}
          tabStyles={tabStyles}
        />
      ),
      styles: {
        width: 'auto',
        margin: theme.spacing(1.5),
        gap: '8px',
        backgroundColor: 'transparent',
        borderRadius: '24px',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        paddingTop: `${theme.spacing(0.5)} !important`,
        padding: theme.spacing(0.5),
        '> button:hover': {
          backgroundColor: getContrastAlphaColor(theme, '4%'),
        },
        '> button:hover svg': {
          fill:
            theme.palette.mode === 'light'
              ? theme.palette.grey[700]
              : theme.palette.grey[300],
        },
      },
      showMoreIcon: false,
      disableRipple: true,
    },
    {
      label: t('language.key', { ns: 'language' }),
      prefixIcon: <LanguageIcon />,
      suffixIcon: (
        <Typography
          variant="lifiBodyMedium"
          textTransform={'uppercase'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 38,
          }}
        >
          {i18n.language}
        </Typography>
      ),
      showMoreIcon: true,
      triggerSubMenu: MenuKeysEnum.Language,
      onClick: () => {
        setSubMenuState(MenuKeysEnum.Language);
        trackEvent({
          category: TrackingCategory.MainMenu,
          action: TrackingAction.OpenMenu,
          label: `open_submenu_${MenuKeysEnum.Language.toLowerCase()}`,
          data: { [TrackingEventParameter.Menu]: MenuKeysEnum.Language },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
      },
    },
    {
      label: t('navbar.navbarMenu.developers'),
      prefixIcon: <DeveloperModeIcon />,
      triggerSubMenu: MenuKeysEnum.Devs,
      onClick: () => {
        setSubMenuState(MenuKeysEnum.Devs);
        trackEvent({
          category: TrackingCategory.MainMenu,
          action: TrackingAction.OpenMenu,
          label: `open_submenu_${MenuKeysEnum.Devs.toLowerCase()}`,
          data: { [TrackingEventParameter.Menu]: MenuKeysEnum.Devs },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
      },
    },
    {
      label: t('navbar.navbarMenu.fest'),
      prefixIcon: <OPLogo />,
      showMoreIcon: false,
      link: { url: '/superfest' },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-jumper-fest-link',
          action: TrackingAction.ClickJumperProfileLink,
          data: { [TrackingEventParameter.Menu]: 'fest' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        closeAllMenus();
        router.push(JUMPER_FEST);
      },
    },
    {
      label: t('navbar.navbarMenu.profile'),
      prefixIcon: <AccountCircleIcon />,
      showMoreIcon: false,
      link: { url: '/profile' },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-jumper-pass-link',
          action: TrackingAction.ClickJumperProfileLink,
          data: { [TrackingEventParameter.Menu]: 'pass' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        closeAllMenus();
        router.push(JUMPER_LOYALTY_PATH);
      },
    },
    {
      label: 'Jumper Learn',
      prefixIcon: <SchoolIcon />,
      showMoreIcon: false,
      link: { url: '/learn' },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-jumper-learn-link',
          action: TrackingAction.ClickJumperLearnLink,
          data: { [TrackingEventParameter.Menu]: 'jumper_learn' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        closeAllMenus();
        router.push(JUMPER_LEARN_PATH);
      },
    },
    {
      label: t('navbar.navbarMenu.lifiExplorer'),
      prefixIcon: <SearchOutlinedIcon />,
      showMoreIcon: false,
      link: { url: explorerUrl, external: true },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'open-lifi-explorer',
          action: TrackingAction.ClickLifiExplorerLink,
          data: { [TrackingEventParameter.Menu]: 'lifi_explorer' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        trackPageload({
          source: TrackingCategory.Menu,
          destination: 'lifi-explorer',
          url: explorerUrl,
          pageload: true,
          disableTrackingTool: [EventTrackingTool.Cookie3],
        });
      },
    },
    {
      label: 'X',
      prefixIcon: <XIcon />,
      showMoreIcon: false,
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-x-link',
          action: TrackingAction.ClickXLink,
          data: { [TrackingEventParameter.Menu]: 'lifi_x' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        trackPageload({
          source: TrackingCategory.MainMenu,
          destination: 'x-jumper',
          url: X_URL,
          pageload: true,
          disableTrackingTool: [EventTrackingTool.Cookie3],
        });
      },
      link: { url: X_URL, external: true },
    },
    {
      label: 'Discord',
      prefixIcon: (
        <Discord
          color={
            theme.palette.mode === 'dark'
              ? theme.palette.white.main
              : theme.palette.black.main
          }
        />
      ),
      showMoreIcon: false,
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-discord-link',
          action: TrackingAction.ClickDiscordLink,
          data: { [TrackingEventParameter.Menu]: 'lifi_discord' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        trackPageload({
          source: TrackingCategory.Menu,
          destination: 'discord-lifi',
          url: DISCORD_URL,
          pageload: true,
          disableTrackingTool: [EventTrackingTool.Cookie3],
        });
      },
      link: { url: DISCORD_URL, external: true },
    },
    {
      label: t('navbar.navbarMenu.support'),
      prefixIcon: (
        <Discord
          color={
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.white.main
          }
        />
      ),
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'open-support-modal',
          action: TrackingAction.OpenMenu,
          data: { [TrackingEventParameter.Menu]: 'support_modal' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        setSupportModalState(true);
      },
      showButton: true,
    },
  ];
};
