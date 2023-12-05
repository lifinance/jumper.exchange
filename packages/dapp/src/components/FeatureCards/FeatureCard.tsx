import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Link, Slide, useTheme } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../../stores';

import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../const';
import { useUserTracking } from '../../hooks';
import { EventTrackingTool } from '../../types';
import {
  FeatureCardAsset,
  FeatureCardType,
} from '../../types/featureCardsRequest.types';
import { Card } from './FeatureCard.style';

interface FeatureCardProps {
  data: FeatureCardType;
  isSuccess: boolean;
  assets: FeatureCardAsset[];
}

export const FeatureCard = ({ data, isSuccess, assets }: FeatureCardProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const [onDisableFeatureCard] = useSettingsStore((state) => [
    state.onDisableFeatureCard,
  ]);
  const theme = useTheme();
  useEffect(() => {
    data?.fields?.displayConditions &&
      data?.fields?.displayConditions.showOnce &&
      onDisableFeatureCard(data?.fields?.displayConditions?.id);
  }, [data?.fields?.displayConditions, onDisableFeatureCard]);

  const typographyColor = useMemo(() => {
    if (data.fields.displayConditions.mode) {
      if (data.fields.displayConditions.mode === 'dark') {
        return theme.palette.white.main;
      } else if (data.fields.displayConditions.mode === 'light') {
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
    data.fields.displayConditions.mode,
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
          [TrackingEventParameter.FeatureCardTitle]: data.fields.title,
          [TrackingEventParameter.FeatureCardId]:
            data.fields.displayConditions.id,
          url: data.fields.url,
        },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    }
  }, [
    data.fields.displayConditions.id,
    data.fields.title,
    data.fields.url,
    open,
    trackEvent,
  ]);

  const imageUrl = useMemo(() => {
    return assets.filter((el: FeatureCardAsset) => {
      return theme.palette.mode === 'dark'
        ? el?.sys?.id === data?.fields?.backgroundImageDark?.sys?.id
        : el?.sys?.id === data?.fields?.backgroundImageLight?.sys?.id;
    })[0]?.fields?.file?.url;
  }, [
    theme.palette.mode,
    assets,
    data?.fields?.backgroundImageDark?.sys?.id,
    data?.fields?.backgroundImageLight?.sys?.id,
  ]);

  const handleClose = () => {
    setOpen(false);
    !data?.fields?.displayConditions?.hasOwnProperty('showOnce') &&
      !!data?.fields?.displayConditions?.id &&
      onDisableFeatureCard(data?.fields?.displayConditions?.id);
    trackEvent({
      category: TrackingCategory.FeatureCard,
      action: TrackingAction.CloseFeatureCard,
      label: `close_${data?.fields?.displayConditions?.id}`,
      data: {
        [TrackingEventParameter.FeatureCardTitle]: data?.fields?.title,
        [TrackingEventParameter.FeatureCardId]:
          data?.fields?.displayConditions?.id,
      },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
  };

  const handleCTA = () => {
    trackEvent({
      category: TrackingCategory.FeatureCard,
      action: TrackingAction.ClickLearnMore,
      label: 'click_cta',
      data: {
        [TrackingEventParameter.FeatureCardTitle]: data.fields.title,
        [TrackingEventParameter.FeatureCardId]:
          data.fields.displayConditions.id,
        url: data.fields.url,
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
      timeout={150}
      easing={'cubic-bezier(0.32, 0, 0.67, 0)'}
    >
      <Card backgroundImageUrl={imageUrl}>
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
              right: theme.spacing(1),
              top: theme.spacing(1),
            }}
            onClick={handleClose}
          >
            <CloseIcon
              sx={{
                width: '24px',
                height: '24px',
                color: typographyColor,
              }}
            />
          </IconButton>
          {!!data?.fields?.title && (
            <Typography
              variant={'lifiHeaderSmall'}
              sx={{
                color: data.fields.titleColor ?? typographyColor,
                fontSize: '24px',
                lineHeight: '32px',
                userSelect: 'none',
                maxHeight: '32px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              gutterBottom
            >
              {data?.fields?.title}
            </Typography>
          )}
          {!!data?.fields?.subtitle && (
            <Typography
              variant={'lifiBodySmall'}
              sx={{
                color: typographyColor,
                lineHeight: '24px',
                width: '224px',
                userSelect: 'none',
                height: '48px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data?.fields?.subtitle}
            </Typography>
          )}
          <CardActions sx={{ padding: 0, marginTop: theme.spacing(1) }}>
            <Link
              target="_blank"
              rel="noopener"
              href={data?.fields?.url}
              onClick={handleCTA}
              sx={{
                textDecoration: 'none',
                color:
                  data.fields.displayConditions.mode === 'dark' ||
                  theme.palette.mode === 'dark'
                    ? theme.palette.accent1Alt?.main
                    : theme.palette.primary.main,
              }}
            >
              <Typography
                variant="lifiBodySmallStrong"
                sx={{
                  maxWidth: '224px',
                  maxHeight: '20px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: data.fields.ctaColor ?? 'inherit',
                }}
              >
                {data.fields.ctaCall ?? t('featureCard.learnMore')}
              </Typography>
            </Link>
          </CardActions>
        </CardContent>
      </Card>
    </Slide>
  );
};
