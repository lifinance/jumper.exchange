import { Breakpoint, Slide, Typography, useTheme } from '@mui/material';
import { appendUTMParametersToLink } from '@transferto/shared/src/utils';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
import {
  AUDITS_URL,
  LIFI_URL,
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../const';
import { useUserTracking } from '../../hooks';
import { useSettingsStore } from '../../stores';
import { EventTrackingTool } from '../../types';
import { Button } from '../Button';
import { StatsCards } from '../StatsCard';
import {
  ContentWrapper,
  CustomColor,
  Overlay,
  WelcomeContent,
} from './WelcomeScreen.style';

export const WelcomeScreen = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [welcomeScreenClosed, onWelcomeScreenClosed] = useSettingsStore(
    (state) => [state.welcomeScreenClosed, state.onWelcomeScreenClosed],
    shallow,
  );

  const auditsWelcomeUrl = appendUTMParametersToLink(AUDITS_URL, {
    utm_campaign: 'jumper_to_docs',
    utm_medium: 'welcome_screen',
  });
  const lifiWelcomeUrl = appendUTMParametersToLink(LIFI_URL, {
    utm_campaign: 'jumper_to_lifi',
    utm_medium: 'welcome_screen',
  });

  const { trackPageload, trackEvent } = useUserTracking();
  const [openChainsPopper, setOpenChainsPopper] = useState(false);
  const [openBridgesPopper, setOpenBridgesPopper] = useState(false);
  const [openDexsPopper, setOpenDexsPopper] = useState(false);

  useEffect(() => {
    if (!welcomeScreenClosed) {
      trackEvent({
        category: TrackingCategory.WelcomeScreen,
        label: 'open-welcome-screen',
        action: TrackingAction.OpenWelcomeMessageScreen,
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    }
  }, [trackEvent, welcomeScreenClosed]);

  const handleAuditClick = () => {
    trackEvent({
      category: TrackingCategory.WelcomeScreen,
      label: 'open-welcome-message-link',
      action: TrackingAction.OpenWelcomeMessageLink,
      data: { [TrackingEventParameter.WelcomeMessageLink]: '4x_audited' },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    trackPageload({
      source: TrackingCategory.WelcomeScreen,
      destination: 'docs-sc-audits',
      url: auditsWelcomeUrl,
      pageload: true,
      disableTrackingTool: [EventTrackingTool.Cookie3],
    });
  };

  const handleLIFIClick = () => {
    trackEvent({
      category: TrackingCategory.WelcomeScreen,
      label: 'open-welcome-message-link',
      action: TrackingAction.OpenWelcomeMessageLink,
      data: { [TrackingEventParameter.WelcomeMessageLink]: 'LIFI' },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    trackPageload({
      source: TrackingCategory.WelcomeScreen,
      destination: 'lifi-website',
      url: lifiWelcomeUrl,
      pageload: true,
      disableTrackingTool: [EventTrackingTool.Cookie3],
    });
  };

  const handleGetStarted: MouseEventHandler<HTMLButtonElement> = (event) => {
    const classList = (event.target as HTMLElement).classList;
    if (
      classList.contains?.('stats-card') ||
      classList.contains?.('link-lifi')
    ) {
      return;
    } else {
      event.stopPropagation();
      onWelcomeScreenClosed(true);
      trackEvent({
        category: TrackingCategory.WelcomeScreen,
        action: TrackingAction.CloseWelcomeScreen,
        label: 'enter_welcome_screen',
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    }
  };

  return (
    <Overlay showWelcome={!welcomeScreenClosed || false}>
      <Slide
        direction="up"
        unmountOnExit
        appear={false}
        timeout={400}
        in={!welcomeScreenClosed}
      >
        <ContentWrapper showWelcome={!welcomeScreenClosed}>
          <WelcomeContent>
            <CustomColor variant={'lifiHeaderMedium'}>
              {t('navbar.welcome.title')}
            </CustomColor>
            <Typography
              variant={'lifiBodyLarge'}
              sx={{
                marginTop: theme.spacing(2),
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.accent1Alt.main
                    : theme.palette.primary.main,
                '& > .link-lifi': {
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                },
                [theme.breakpoints.up('sm' as Breakpoint)]: {
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: '32px',
                },
              }}
            >
              {
                <Trans
                  i18nKey={'navbar.welcome.subtitle' as string & never[]}
                  components={[
                    // fix: allow component with "no content"
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a
                      className={'link-lifi'}
                      href={auditsWelcomeUrl}
                      target={'_blank'}
                      rel="noreferrer"
                      onClick={handleAuditClick}
                    />,
                    // eslint-disable-next-line jsx-a11y/anchor-has-content
                    <a
                      className={'link-lifi'}
                      href={lifiWelcomeUrl}
                      onClick={handleLIFIClick}
                      target={'_blank'}
                      rel="noreferrer"
                    />,
                  ]}
                />
              }
            </Typography>
            <StatsCards
              openChainsPopper={openChainsPopper}
              setOpenChainsPopper={setOpenChainsPopper}
              openBridgesPopper={openBridgesPopper}
              setOpenBridgesPopper={setOpenBridgesPopper}
              openDexsPopper={openDexsPopper}
              setOpenDexsPopper={setOpenDexsPopper}
            />
            <Button
              variant="primary"
              onClick={handleGetStarted}
              styles={{
                height: '48px',
                width: '192px',
                margin: `${theme.spacing(4)} auto`,
                [theme.breakpoints.up('sm' as Breakpoint)]: {
                  margin: `${theme.spacing(6)} auto`,
                  height: '56px',
                  borderRadius: '28px',
                  width: '247px',
                },
              }}
            >
              <Typography
                variant={'lifiBodyMediumStrong'}
                sx={{
                  maxHeight: '40px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  [theme.breakpoints.up('sm' as Breakpoint)]: {
                    fontSize: '18px',
                    maxHeight: '48px',
                    lineHeight: '24px',
                  },
                }}
              >
                {t('navbar.welcome.cta')}
              </Typography>
            </Button>
          </WelcomeContent>
        </ContentWrapper>
      </Slide>
    </Overlay>
  );
};
