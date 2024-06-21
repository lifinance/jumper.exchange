import { Button } from '@/components/Button/Button';
import { useTheme } from '@mui/material';

import { Discord } from '@/components/illustrations/Discord';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';

import { TrackingAction, TrackingCategory } from '@/const/trackingKeys';
import { DISCORD_URL } from '@/const/urls';
import { getContrastAlphaColor } from '@/utils/colors';
import { openInNewTab } from '@/utils/openInNewTab';
import { useTranslation } from 'react-i18next';
import {
  CenteredContainer,
  ErrorMessage,
  SupportMessage,
} from './ErrorPage.style';

interface FallbackErrorProps {
  reset: () => void;
}

const ErrorPage = ({ reset }: FallbackErrorProps) => {
  const { trackEvent } = useUserTracking();
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <CenteredContainer>
      <ErrorMessage variant={'lifiBodyLarge'}>
        {t('error.message')}
      </ErrorMessage>
      <Button
        variant="primary"
        onClick={() => {
          trackEvent({
            category: TrackingCategory.ErrorPage,
            label: 'click-discord-support',
            action: TrackingAction.OpenDiscordSupport,
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
  );
};

export default ErrorPage;
