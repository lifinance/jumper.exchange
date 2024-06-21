'use client';
import { LinkMap } from '@/const/linkMap';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { JUMPER_MEMECOIN_PATH, LIFI_URL } from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { appendUTMParametersToLink } from '@/utils/append-utm-params-to-link';
import { isArticlePage } from '@/utils/isArticlePage';
import { openInNewTab } from '@/utils/openInNewTab';
import type { CSSObject } from '@mui/material';
import { Typography, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Trans } from 'react-i18next/TransWithoutContext';
import { Container } from './PoweredBy.style';

const lifiUrl = appendUTMParametersToLink(LIFI_URL, {
  utm_campaign: 'jumper_to_lifi',
  utm_medium: 'powered_by',
});

interface PoweredByProps {
  fixedPosition?: boolean;
  styles?: CSSObject;
}

export const PoweredBy = ({ styles }: PoweredByProps) => {
  const theme = useTheme();
  const { trackEvent } = useUserTracking();
  const currentPath = usePathname();
  let result = currentPath?.substring(0, currentPath.lastIndexOf('/'));
  const isArticle = isArticlePage(
    `${process.env.NEXT_PUBLIC_SITE_URL}/${currentPath}`,
  );

  //Todo: logic to review
  const isRoot = result === '/' || result === '';
  const isThemePage = result === JUMPER_MEMECOIN_PATH;
  const isApp = Object.values(LinkMap).some((page) =>
    result?.includes(`/${page}`),
  );

  const handleClick = () => {
    trackEvent({
      category: TrackingCategory.Pageload,
      action: TrackingAction.PageLoad,
      label: 'pageload-powered-by',
      data: {
        [TrackingEventParameter.PageloadSource]: TrackingCategory.PoweredBy,
        [TrackingEventParameter.PageloadDestination]: 'lifi-website',
        [TrackingEventParameter.PageloadURL]: lifiUrl,
        [TrackingEventParameter.PageloadExternal]: true,
      },
    });
    trackEvent({
      category: TrackingCategory.PoweredBy,
      action: TrackingAction.PoweredBy,
      label: 'click_lifi_in_powered_by',
    });
    openInNewTab(lifiUrl);
  };

  return (
    <Container
      fixedPosition={isRoot || isApp || isThemePage}
      sx={styles}
      isArticlePage={isArticle}
    >
      <Typography
        variant={'lifiBodySmall'}
        sx={{
          zIndex: 1,
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.alphaLight500.main
              : theme.palette.alphaDark500.main,
        }}
      >
        <Trans
          as="div"
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
