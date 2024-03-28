import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Link, Slide, useTheme } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from 'src/stores';

import {
  STRAPI_FEATURE_CARDS,
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from 'src/const';
import { useStrapi, useUserTracking } from 'src/hooks';
import { EventTrackingTool, type FeatureCardData } from 'src/types';
import { openInNewTab } from 'src/utils';
import { FCard as Card } from '.';

interface FeatureCardProps {
  data: FeatureCardData;
  isSuccess: boolean;
}

export const FeatureCard = ({ data, isSuccess }: FeatureCardProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const { url } = useStrapi<FeatureCardData>({
    contentType: STRAPI_FEATURE_CARDS,
  });
  const { trackEvent } = useUserTracking();
  const [setDisabledFeatureCard] = useSettingsStore((state) => [
    state.setDisabledFeatureCard,
  ]);
  const theme = useTheme();
  useEffect(() => {
    if (data?.attributes.DisplayConditions?.showOnce) {
      setDisabledFeatureCard(data?.attributes.uid);
    }
  }, [
    data?.attributes.DisplayConditions,
    data?.attributes.uid,
    setDisabledFeatureCard,
  ]);

  const typographyColor = useMemo(() => {
    if (data.attributes.DisplayConditions.mode) {
      if (data.attributes.DisplayConditions.mode === 'dark') {
        return theme.palette.white.main;
      } else if (data.attributes.DisplayConditions.mode === 'light') {
        return theme.palette.black.main;
      }
    } else {
      if (theme.palette.mode === 'dark') {
        return theme.palette.white.main;
      } else {
        return theme.palette.black.main;
      }
    }
  }, [
    data.attributes.DisplayConditions.mode,
    theme.palette.black.main,
    theme.palette.mode,
    theme.palette.white.main,
  ]);

  useEffect(() => {
    if (open) {
      trackEvent({
        category: TrackingCategory.FeatureCard,
        action: TrackingAction.DisplayFeatureCard,
        label: 'display-feature-card',
        data: {
          [TrackingEventParameter.FeatureCardTitle]: data.attributes.Title,
          [TrackingEventParameter.FeatureCardId]: data.attributes.uid,
          url: data.attributes.URL,
        },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    }
  }, [
    data.attributes.uid,
    data.attributes.Title,
    data.attributes.URL,
    open,
    trackEvent,
  ]);

  const mode = data.attributes.DisplayConditions.mode || theme.palette.mode;
  const imageUrl =
    mode === 'dark'
      ? new URL(
          data.attributes.BackgroundImageDark.data?.attributes.url,
          url.origin,
        )
      : new URL(
          data.attributes.BackgroundImageLight.data?.attributes.url,
          url.origin,
        );

  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setOpen(false);
    !data?.attributes.DisplayConditions?.hasOwnProperty('showOnce') &&
      !!data?.attributes.uid &&
      setDisabledFeatureCard(data?.attributes.uid);
    trackEvent({
      category: TrackingCategory.FeatureCard,
      action: TrackingAction.CloseFeatureCard,
      label: `click_close`,
      data: {
        [TrackingEventParameter.FeatureCardTitle]: data?.attributes.Title,
        [TrackingEventParameter.FeatureCardId]: data?.attributes.uid,
      },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
  };

  const handleCTA = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    trackEvent({
      category: TrackingCategory.FeatureCard,
      action: TrackingAction.ClickFeatureCard,
      label: `click_cta`,
      data: {
        [TrackingEventParameter.FeatureCardTitle]: data.attributes.Title,
        [TrackingEventParameter.FeatureCardId]: data.attributes.uid,
        url: data.attributes.URL,
      },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
  };

  const handleCardClick = () => {
    data?.attributes.URL && openInNewTab(data?.attributes.URL);

    trackEvent({
      category: TrackingCategory.FeatureCard,
      action: TrackingAction.ClickFeatureCard,
      label: 'click_card_bg',
      data: {
        [TrackingEventParameter.FeatureCardTitle]: data.attributes.Title,
        [TrackingEventParameter.FeatureCardId]: data.attributes.uid,
        url: data.attributes.URL,
      },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
  };

  return (
    <Slide
      direction="up"
      in={open}
      unmountOnExit
      appear={true}
      timeout={500}
      easing={'cubic-bezier(0.32, 0, 0.67, 0)'}
    >
      <Card
        backgroundImageUrl={imageUrl?.href}
        onClick={handleCardClick}
        isDarkCard={data.attributes.DisplayConditions.mode === 'dark'}
      >
        <CardContent
          sx={{
            padding: theme.spacing(3),
            position: 'relative',
          }}
        >
          <IconButton
            disableRipple={true}
            sx={{
              position: 'absolute',
              right: 1,
              top: 1,
            }}
            onClick={(e) => handleClose(e)}
          >
            <CloseIcon
              sx={{
                width: 24,
                height: 24,
                color: typographyColor,
              }}
            />
          </IconButton>
          {!!data?.attributes.Title && (
            <Typography
              variant={'lifiHeaderSmall'}
              sx={{
                color: data.attributes.TitleColor ?? typographyColor,
                fontSize: '24px',
                lineHeight: '32px',
                userSelect: 'none',
                maxHeight: 32,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              gutterBottom
            >
              {data?.attributes.Title}
            </Typography>
          )}
          {!!data?.attributes.Subtitle && (
            <Typography
              variant={'lifiBodySmall'}
              sx={{
                color: typographyColor,
                lineHeight: '24px',
                width: 224,
                userSelect: 'none',
                height: 48,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data?.attributes.Subtitle}
            </Typography>
          )}
          <CardActions sx={{ padding: 0, marginTop: theme.spacing(1) }}>
            <Link
              target="_blank"
              rel="noopener"
              href={data?.attributes.URL}
              onClick={(e) => handleCTA(e)}
              sx={{
                textDecoration: 'none',
                color:
                  data.attributes.DisplayConditions.mode === 'dark' ||
                  theme.palette.mode === 'dark'
                    ? theme.palette.accent1Alt?.main
                    : theme.palette.primary.main,
              }}
            >
              <Typography
                variant="lifiBodySmallStrong"
                sx={{
                  maxWidth: 224,
                  maxHeight: 20,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: data.attributes.CTAColor ?? 'inherit',
                }}
              >
                {data.attributes.CTACall ?? t('featureCard.learnMore')}
              </Typography>
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Slide>
  );
};
