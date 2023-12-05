import { Typography, useTheme } from '@mui/material';
import {
  LIFI_URL,
  TrackingAction,
  TrackingCategory,
} from '@transferto/dapp/src/const';
import { useUserTracking } from '@transferto/dapp/src/hooks';
import { EventTrackingTool } from '@transferto/dapp/src/types';
import { Trans } from 'react-i18next';
import { appendUTMParametersToLink, openInNewTab } from '../../utils';
import { Container } from './PoweredBy.style';

const lifiUrl = appendUTMParametersToLink(LIFI_URL, {
  utm_campaign: 'jumper_to_lifi',
  utm_medium: 'powered_by',
});

export const PoweredBy = () => {
  const theme = useTheme();
  const { trackPageload, trackEvent } = useUserTracking();

  const handleClick = () => {
    trackPageload({
      source: TrackingCategory.PoweredBy,
      destination: 'lifi-website',
      url: lifiUrl,
      pageload: true,
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    trackEvent({
      category: TrackingCategory.PoweredBy,
      action: TrackingAction.PoweredBy,
      label: 'click_lifi_in_powered_by',
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    openInNewTab(lifiUrl);
  };

  return (
    <Container>
      <Typography
        variant={'lifiBodySmall'}
        sx={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.alphaLight500.main
              : theme.palette.alphaDark500.main,
        }}
      >
        <Trans
          i18nKey={'navbar.poweredByLifi' as string & never[]}
          components={[
            // fix: allow component with "no content"
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <span style={{ userSelect: 'none' }}></span>,
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
              className={'link-lifi'}
              onClick={handleClick}
              href={lifiUrl}
              target={'_blank'}
              rel="noreferrer"
            />,
          ]}
        />
      </Typography>
    </Container>
  );
};
