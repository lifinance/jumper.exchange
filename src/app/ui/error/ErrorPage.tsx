import { Button } from '@/components/Button/Button';
import { LogoLink } from '@/components/Navbar';
import { JumperLogo } from '@/components/illustrations/JumperLogo';
import { useTheme } from '@mui/material';

import { Logo } from '@/components/Navbar/Logo/Logo';
import { Discord } from '@/components/illustrations/Discord';
import { useAccounts } from '@/hooks/useAccounts';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useClientTranslation } from '@/i18n/useClientTranslation';
import { EventTrackingTool } from '@/types/userTracking';

import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { DISCORD_URL } from '@/const/urls';
import { getContrastAlphaColor } from '@/utils/colors';
import { openInNewTab } from '@/utils/openInNewTab';
import {
  CenteredContainer,
  ErrorMessage,
  NavbarContainer,
  SupportMessage,
} from './ErrorPage.style';

interface FallbackErrorProps {
  reset: () => void;
}

const ErrorPage = ({ reset }: FallbackErrorProps) => {
  const { trackPageload, trackEvent } = useUserTracking();
  const theme = useTheme();
  const { t } = useClientTranslation();
  const { account } = useAccounts();
  return (
    <>
      <NavbarContainer>
        <LogoLink>
          <Logo
            isConnected={!!account?.address}
            theme={theme}
            logo={<JumperLogo />}
          />
        </LogoLink>
      </NavbarContainer>
      <CenteredContainer>
        <ErrorMessage variant={'lifiBodyLarge'}>
          {t('error.message')}
        </ErrorMessage>
        <Button
          variant="primary"
          onClick={() => {
            trackEvent({
              category: TrackingCategory.Menu,
              label: 'click-discord-link',
              action: TrackingAction.OpenMenu,
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
            openInNewTab(DISCORD_URL);
          }}
          styles={{
            width: 'auto',
            margin: theme.spacing(1.5),
            gap: '8px',
            borderRadius: '24px',
            padding: theme.spacing(1),
            '> button:hover': {
              backgroundColor: getContrastAlphaColor(theme, '4%'),
            },
            '> button:hover svg': {
              fill:
                theme.palette.mode === 'light'
                  ? theme.palette.grey[700]
                  : theme.palette.grey[300],
            },
          }}
          fullWidth={true}
        >
          <Discord
            color={
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : theme.palette.black.main
            }
          />
          <SupportMessage variant="lifiBodyMediumStrong" component="span">
            {t('navbar.navbarMenu.support')}
          </SupportMessage>
        </Button>
      </CenteredContainer>
    </>
  );
};

export default ErrorPage;
