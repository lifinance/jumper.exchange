import { useMenuStore } from '@/stores/menu';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../../const/trackingKeys';

import { DOCS_URL, GITHUB_URL } from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useTranslation } from 'react-i18next';
export const useDevelopersContent = () => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const closeAllMenus = useMenuStore((state) => state.closeAllMenus);

  return [
    {
      label: t('navbar.developers.github'),
      prefixIcon: (
        <GitHubIcon
          sx={{
            color: isDarkMode
              ? theme.palette.white.main
              : theme.palette.black.main,
          }}
        />
      ),
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'open-lifi-github',
          action: TrackingAction.OpenMenu,
          data: { [TrackingEventParameter.Menu]: 'lifi_github' },
        });
        trackEvent({
          category: TrackingCategory.Pageload,
          action: TrackingAction.PageLoad,
          label: 'pageload-lifi-github',
          data: {
            [TrackingEventParameter.PageloadSource]: TrackingCategory.Menu,
            [TrackingEventParameter.PageloadDestination]: 'lifi-github',
            [TrackingEventParameter.PageloadURL]: GITHUB_URL,
            [TrackingEventParameter.PageloadExternal]: true,
          },
        });
        closeAllMenus();
      },
      link: { url: GITHUB_URL, external: true },
    },
    {
      label: t('navbar.developers.documentation'),
      prefixIcon: <DescriptionOutlinedIcon />,
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'open-lifi-docs',
          action: TrackingAction.OpenMenu,
          data: { [TrackingEventParameter.Menu]: 'lifi_docs' },
        });
        trackEvent({
          category: TrackingCategory.Pageload,
          action: TrackingAction.PageLoad,
          label: 'pageload-lifi_docs',
          data: {
            [TrackingEventParameter.PageloadSource]: TrackingCategory.Menu,
            [TrackingEventParameter.PageloadDestination]: 'lifi-docs',
            [TrackingEventParameter.PageloadURL]: DOCS_URL,
            [TrackingEventParameter.PageloadExternal]: true,
          },
        });
        closeAllMenus();
      },
      link: { url: DOCS_URL, external: true },
    },
    {
      label: t('navbar.navbarMenu.brandAssets'),
      prefixIcon: <FolderZipOutlinedIcon />,
      showMoreIcon: false,
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-brand-assets',
          action: TrackingAction.DownloadBrandAssets,
          data: { [TrackingEventParameter.Menu]: 'brand_assets' },
        });
        closeAllMenus();
      },
      link: { url: '/jumper_brand_assets.zip', external: true },
    },
  ];
};
