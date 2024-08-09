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
  JUMPER_FEST_PATH,
  JUMPER_LEARN_PATH,
  JUMPER_LOYALTY_PATH,
  X_URL,
} from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu';
import { useSettingsStore } from '@/stores/settings';
import { getContrastAlphaColor } from '@/utils/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import SchoolIcon from '@mui/icons-material/School';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import XIcon from '@mui/icons-material/X';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTheme as useNextTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { OPLogo } from 'src/components/illustrations/OPLogo';
import { useMainPaths } from 'src/hooks/useMainPaths';
import { useThemeSwitchTabs } from './useThemeSwitchTabs';

export const useMainMenuContent = () => {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useUserTracking();
  const router = useRouter();
  const theme = useTheme();
  const configTheme = useSettingsStore((state) => state.configTheme);
  const { forcedTheme } = useNextTheme();
  const { isMainPaths } = useMainPaths();
  const themeMode = useSettingsStore((state) => state.themeMode);
  const { setSupportModalState, setSubMenuState, closeAllMenus } = useMenuStore(
    (state) => state,
  );

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

  let mainMenu: any[] = [];

  if (!forcedTheme && configTheme?.hasThemeModeSwitch) {
    mainMenu.push({
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
    });
  }

  if (!forcedTheme && isMainPaths) {
    mainMenu.push({
      label: t('navbar.navbarMenu.theme'),
      prefixIcon: <PaletteIcon />,
      triggerSubMenu: !['dark', 'light'].includes(configTheme?.uid)
        ? MenuKeysEnum.Theme
        : undefined,
      showMoreIcon: !['dark', 'light'].includes(configTheme?.uid),
      suffixIcon: configTheme?.uid && (
        <Typography
          variant="bodyMedium"
          textTransform={'uppercase'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 38,
          }}
        >
          {configTheme.uid}
        </Typography>
      ),
      onClick: () => {
        setSubMenuState(MenuKeysEnum.Theme);
        trackEvent({
          category: TrackingCategory.MainMenu,
          action: TrackingAction.OpenMenu,
          label: `open_submenu_${MenuKeysEnum.Theme.toLowerCase()}`,
          data: { [TrackingEventParameter.Menu]: MenuKeysEnum.Theme },
        });
      },
    });
  }

  mainMenu = mainMenu.concat([
    {
      label: t('language.key', { ns: 'language' }),
      prefixIcon: <LanguageIcon />,
      suffixIcon: (
        <Typography
          variant="bodyMedium"
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
        });
      },
    },
    {
      label: t('navbar.navbarMenu.fest'),
      prefixIcon: <OPLogo />,
      showMoreIcon: false,
      link: { url: '/superfest/' },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-jumper-fest-link',
          action: TrackingAction.ClickJumperProfileLink,
          data: { [TrackingEventParameter.Menu]: 'fest' },
        });
        closeAllMenus();
        router.push(JUMPER_FEST_PATH);
      },
    },
    {
      label: t('navbar.navbarMenu.profile'),
      prefixIcon: <AccountCircleIcon />,
      showMoreIcon: false,
      link: { url: '/profile/' },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-jumper-pass-link',
          action: TrackingAction.ClickJumperProfileLink,
          data: { [TrackingEventParameter.Menu]: 'pass' },
        });
        closeAllMenus();
        router.push(JUMPER_LOYALTY_PATH);
      },
    },
    {
      label: 'Jumper Learn',
      prefixIcon: <SchoolIcon />,
      showMoreIcon: false,
      link: { url: '/learn/' },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-jumper-learn-link',
          action: TrackingAction.ClickJumperLearnLink,
          data: { [TrackingEventParameter.Menu]: 'jumper_learn' },
        });
        closeAllMenus();
        router.push(JUMPER_LEARN_PATH);
      },
    },
    {
      label: 'Jumper Scan',
      prefixIcon: <SearchOutlinedIcon />,
      showMoreIcon: false,
      link: { url: '/scan/', external: false },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'open-jumper-scan',
          action: TrackingAction.ClickJumperScanLink,
          data: { [TrackingEventParameter.Menu]: 'jumper_scan' },
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
          label: 'click-jumper-x',
          action: TrackingAction.ClickXLink,
          data: { [TrackingEventParameter.Menu]: 'jumper-x' },
        });
        trackEvent({
          category: TrackingCategory.Pageload,
          action: TrackingAction.PageLoad,
          label: 'pageload-x_jumper',
          data: {
            [TrackingEventParameter.PageloadSource]: TrackingCategory.Menu,
            [TrackingEventParameter.PageloadDestination]: 'jumper-x',
            [TrackingEventParameter.PageloadURL]: X_URL,
            [TrackingEventParameter.PageloadExternal]: true,
          },
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
          data: { [TrackingEventParameter.Menu]: 'jumper_discord' },
        });
        trackEvent({
          category: TrackingCategory.Pageload,
          action: TrackingAction.PageLoad,
          label: 'pageload-discord',
          data: {
            [TrackingEventParameter.PageloadSource]: TrackingCategory.MainMenu,
            [TrackingEventParameter.PageloadDestination]: 'jumper_discord',
            [TrackingEventParameter.PageloadURL]: DISCORD_URL,
            [TrackingEventParameter.PageloadExternal]: true,
          },
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
        });
        setSupportModalState(true);
      },
      showButton: true,
    },
  ]);

  return mainMenu;
  /*
  //Todo: to generate on the server side
  if (!!hasTheme || isSuperfest || isMainPaths) {
    return ;
  }

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
          variant="bodyMedium"
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
        });
        closeAllMenus();
        router.push(JUMPER_FEST_PATH);
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
          label: 'open-jumper-scan',
          action: TrackingAction.ClickJumperScanLink,
          data: { [TrackingEventParameter.Menu]: 'jumper_scan' },
        });
        trackEvent({
          category: TrackingCategory.Pageload,
          action: TrackingAction.PageLoad,
          label: 'pageload-jumper-scan',
          data: {
            [TrackingEventParameter.PageloadSource]: TrackingCategory.Menu,
            [TrackingEventParameter.PageloadDestination]: 'jumper-scan',
            [TrackingEventParameter.PageloadURL]: explorerUrl,
            [TrackingEventParameter.PageloadExternal]: true,
          },
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
          data: { [TrackingEventParameter.Menu]: 'x_jumper' },
        });
        trackEvent({
          category: TrackingCategory.Pageload,
          action: TrackingAction.PageLoad,
          label: 'pageload-x_jumper',
          data: {
            [TrackingEventParameter.PageloadSource]: TrackingCategory.Menu,
            [TrackingEventParameter.PageloadDestination]: 'jumper-x',
            [TrackingEventParameter.PageloadURL]: X_URL,
            [TrackingEventParameter.PageloadExternal]: true,
          },
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
          data: { [TrackingEventParameter.Menu]: 'jumper_discord' },
        });
        trackEvent({
          category: TrackingCategory.Pageload,
          action: TrackingAction.PageLoad,
          label: 'pageload-discord',
          data: {
            [TrackingEventParameter.PageloadSource]: TrackingCategory.Menu,
            [TrackingEventParameter.PageloadDestination]: 'discord-jumper',
            [TrackingEventParameter.PageloadURL]: DISCORD_URL,
            [TrackingEventParameter.PageloadExternal]: true,
          },
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
        });
        setSupportModalState(true);
      },
      showButton: true,
    },
  ];*/
};
