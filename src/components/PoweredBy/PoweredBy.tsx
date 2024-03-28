'use client';

import { TrackingAction, TrackingCategory } from '@/const/trackingKeys';
import { LIFI_URL } from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { EventTrackingTool } from '@/types/userTracking';
import { appendUTMParametersToLink } from '@/utils/append-utm-params-to-link';
import { openInNewTab } from '@/utils/openInNewTab';
import type { CSSObject } from '@mui/material';
import { Typography, useTheme } from '@mui/material';
import { Trans } from 'react-i18next';
import { Container } from './PoweredBy.style';

const lifiUrl = appendUTMParametersToLink(LIFI_URL, {
  utm_campaign: 'jumper_to_lifi',
  utm_medium: 'powered_by',
});

interface PoweredByProps {
  fixedPosition?: boolean;
  styles?: CSSObject;
}

export const PoweredBy = ({ fixedPosition, styles }: PoweredByProps) => {
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
    <Container fixedPosition={fixedPosition} sx={styles}>
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
