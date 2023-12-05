import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '@mui/material/styles';
import { openInNewTab } from '@transferto/shared/src/utils/';
import { useTranslation } from 'react-i18next';
import { useUserTracking } from '../../hooks';
import { useMenuStore } from '../../stores';
import { EventTrackingTool } from '../../types';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../trackingKeys';
import { DOCS_URL, GITHUB_URL } from '../urls';
export const useDevelopersContent = () => {
  const { t } = useTranslation();
  const { trackPageload, trackEvent } = useUserTracking();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const onCloseAllNavbarMenus = useMenuStore(
    (state) => state.onCloseAllNavbarMenus,
  );

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
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        trackPageload({
          source: TrackingCategory.Menu,
          destination: 'lifi-github',
          url: GITHUB_URL,
          pageload: true,
          disableTrackingTool: [EventTrackingTool.Cookie3],
        });
        openInNewTab(GITHUB_URL);
        onCloseAllNavbarMenus();
      },
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
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        trackPageload({
          source: TrackingCategory.Menu,
          destination: 'lifi-docs',
          url: DOCS_URL,
          pageload: true,
          disableTrackingTool: [EventTrackingTool.Cookie3],
        });
        openInNewTab(DOCS_URL);
        onCloseAllNavbarMenus();
      },
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
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        openInNewTab('/jumper_brand_assets.zip');
      },
    },
  ];
};
