import { Breakpoint, Slide, Typography, useTheme } from '@mui/material';
import { ButtonPrimary } from '@transferto/shared/src/atoms/ButtonPrimary.style';
import { appendUTMParametersToLink } from '@transferto/shared/src/utils';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../const';
import { useUserTracking } from '../../hooks';
import { EventTrackingTool } from '../../types';
import { StatsCards } from '../StatsCard';
import { ContentContainer, CustomColor, Wrapper } from './WelcomeWrapper.style';
interface WelcomeWrapperProps {
  showWelcome: boolean;
  handleGetStarted: (event: any) => void;
}

export const WelcomeWrapper: React.FC<
  PropsWithChildren<WelcomeWrapperProps>
> = ({ children, showWelcome, handleGetStarted }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { trackPageload, trackEvent } = useUserTracking();
  const [openChainsPopper, setOpenChainsPopper] = useState(false);
  const [openBridgesPopper, setOpenBridgesPopper] = useState(false);
  const [openDexsPopper, setOpenDexsPopper] = useState(false);

  const utmWelcomePage = {
    utm_medium: 'landing_page',
  };
  const auditsWelcomeUrl = appendUTMParametersToLink(
    'https://docs.li.fi/smart-contracts/audits',
    { ...utmWelcomePage, utm_campaign: 'jumper_to_docs' },
  );
  const lifiWelcomeUrl = appendUTMParametersToLink('https://li.fi/', {
    ...utmWelcomePage,
    utm_campaign: 'jumper_to_lifi',
  });

  useEffect(() => {
    if (showWelcome) {
      trackEvent({
        category: TrackingCategory.WelcomeScreen,
        label: 'open-welcome-screen',
        action: TrackingAction.OpenWelcomeMessageScreen,
        disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Raleon],
      });
    }
  }, [showWelcome, trackEvent]);

  const handleAuditClick = () => {
    trackEvent({
      category: TrackingCategory.WelcomeScreen,
      label: 'open-welcome-message-link',
      action: TrackingAction.OpenWelcomeMessageLink,
      data: { [TrackingEventParameter.WelcomeMessageLink]: '4x_audited' },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Raleon],
    });
    trackPageload({
      source: 'welcome-screen',
      destination: 'docs-sc-audits',
      url: auditsWelcomeUrl,
      pageload: true,
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Raleon],
    });
  };

  const handleLIFIClick = () => {
    trackEvent({
      category: TrackingCategory.WelcomeScreen,
      label: 'open-welcome-message-link',
      action: TrackingAction.OpenWelcomeMessageLink,
      data: { [TrackingEventParameter.WelcomeMessageLink]: 'LIFI' },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Raleon],
    });
    trackPageload({
      source: 'welcome-screen',
      destination: 'lifi-website',
      url: lifiWelcomeUrl,
      pageload: true,
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Raleon],
    });
  };

  return (
    <Wrapper showWelcome={showWelcome || false}>
      {children}
      <Slide
        direction="up"
        unmountOnExit
        appear={false}
        timeout={400}
        in={showWelcome}
      >
        <ContentContainer showWelcome={showWelcome}>
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
          <ButtonPrimary
            onClick={handleGetStarted}
            sx={(theme) => ({
              margin: 'auto',
              marginTop: theme.spacing(4),
              height: '48px',
              width: '192px',
              [theme.breakpoints.up('sm' as Breakpoint)]: {
                marginTop: theme.spacing(6),
                height: '56px',
                borderRadius: '28px',
                width: '247px',
              },
            })}
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
          </ButtonPrimary>
        </ContentContainer>
      </Slide>
    </Wrapper>
  );
};
