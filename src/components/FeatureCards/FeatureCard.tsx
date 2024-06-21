'use client';
import CloseIcon from '@mui/icons-material/Close';
import { Slide, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { STRAPI_FEATURE_CARDS } from '@/const/strapiContentKeys';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useStrapi } from '@/hooks/useStrapi';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useSettingsStore } from '@/stores/settings/SettingsStore';
import type { FeatureCardData } from '@/types/strapi';
import { openInNewTab } from '@/utils/openInNewTab';
import { useTranslation } from 'react-i18next';
import {
  FCard as Card,
  FeatureCardActions,
  FeatureCardCloseButton,
  FeatureCardContent,
  FeatureCardCtaLabel,
  FeatureCardCtaLink,
  FeatureCardSubtitle,
  FeatureCardTitle,
} from '.';

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
    });
  };

  const handleCTA = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    !data?.attributes.DisplayConditions?.hasOwnProperty('showOnce') &&
      !!data?.attributes.uid &&
      setDisabledFeatureCard(data?.attributes.uid);
    trackEvent({
      category: TrackingCategory.FeatureCard,
      action: TrackingAction.ClickFeatureCard,
      label: `click_cta`,
      data: {
        [TrackingEventParameter.FeatureCardTitle]: data.attributes.Title,
        [TrackingEventParameter.FeatureCardId]: data.attributes.uid,
        url: data.attributes.URL,
      },
    });
  };

  const handleCardClick = () => {
    data?.attributes.URL && openInNewTab(data?.attributes.URL);
    !data?.attributes.DisplayConditions?.hasOwnProperty('showOnce') &&
      !!data?.attributes.uid &&
      setDisabledFeatureCard(data?.attributes.uid);
    trackEvent({
      category: TrackingCategory.FeatureCard,
      action: TrackingAction.ClickFeatureCard,
      label: 'click_card_bg',
      data: {
        [TrackingEventParameter.FeatureCardTitle]: data.attributes.Title,
        [TrackingEventParameter.FeatureCardId]: data.attributes.uid,
        url: data.attributes.URL,
      },
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
        <FeatureCardContent>
          <FeatureCardCloseButton
            disableRipple={true}
            onClick={(e) => handleClose(e)}
          >
            <CloseIcon
              sx={{
                width: 24,
                height: 24,
                color: typographyColor,
              }}
            />
          </FeatureCardCloseButton>
          {!!data?.attributes.Title && (
            <FeatureCardTitle
              variant="lifiHeaderSmall"
              data={data}
              typographyColor={data.attributes.TitleColor || typographyColor}
              gutterBottom
            >
              {data?.attributes.Title}
            </FeatureCardTitle>
          )}
          {!!data?.attributes.Subtitle && (
            <FeatureCardSubtitle
              variant="lifiBodySmall"
              typographyColor={typographyColor}
            >
              {data?.attributes.Subtitle}
            </FeatureCardSubtitle>
          )}
          <FeatureCardActions>
            <FeatureCardCtaLink
              target="_blank"
              rel="noopener"
              href={data?.attributes.URL}
              onClick={(e) => handleCTA(e)}
              data={data}
            >
              <FeatureCardCtaLabel
                variant="lifiBodySmallStrong"
                data={data}
                typographyColor={data.attributes.CTAColor || typographyColor}
              >
                {data.attributes.CTACall ?? t('featureCard.learnMore')}
              </FeatureCardCtaLabel>
            </FeatureCardCtaLink>
          </FeatureCardActions>
        </FeatureCardContent>
      </Card>
    </Slide>
  );
};
