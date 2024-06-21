import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, useTheme, type CSSObject } from '@mui/material';

import { TrackingAction, TrackingEventParameter } from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CarouselContainerBox,
  CarouselHeader,
  CarouselNavigationButton,
  CarouselNavigationContainer,
  CarouselTitle,
} from '.';

interface CarouselContainerProps {
  title?: string;
  styles?: CSSObject;
  children?: React.ReactNode | React.ReactNode[];
  trackingCategory?: string;
  itemsCount?: number;
}
const swipeDistance = 420;

export const CarouselContainer = ({
  styles,
  title,
  children,
  itemsCount,
  trackingCategory,
}: CarouselContainerProps) => {
  const { trackEvent } = useUserTracking();
  const theme = useTheme();

  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const handleChange = useCallback(
    (direction: 'next' | 'prev') => {
      if (carouselContainerRef.current) {
        const node: HTMLDivElement = carouselContainerRef.current;
        const scrollLeftPos = node.scrollLeft;
        const scrollWidth =
          carouselContainerRef.current.scrollWidth -
          carouselContainerRef.current.clientWidth;

        let scrollPos = 0;
        switch (direction) {
          case 'next':
            trackEvent({
              category: trackingCategory || 'carousel',
              label: 'swipe-carousel',
              action: TrackingAction.SwipeCarousel,
              data: {
                [TrackingEventParameter.SwipeDirection]: 'left',
              },
            });
            if (scrollLeftPos + swipeDistance < scrollWidth) {
              scrollPos = scrollLeftPos + swipeDistance;
            } else {
              scrollPos = scrollWidth;
            }
            break;
          case 'prev':
            trackEvent({
              category: trackingCategory || 'carousel',
              label: 'swipe-carousel',
              action: TrackingAction.SwipeCarousel,
              data: {
                [TrackingEventParameter.SwipeDirection]: 'right',
              },
            });
            if (scrollLeftPos - swipeDistance > 0) {
              scrollPos = scrollLeftPos - swipeDistance;
            } else {
              scrollPos = 0;
            }
            break;
        }

        node.scrollTo({
          left: parseInt(`${scrollPos}`),
          behavior: 'smooth',
        });
      } else {
      }
    },
    [trackEvent, trackingCategory],
  );
  return (
    <Box>
      <CarouselHeader>
        <CarouselTitle variant="lifiHeaderMedium">
          {title ?? t('blog.recentPosts')}
        </CarouselTitle>
        {(itemsCount && itemsCount > 1) ||
          (Array.isArray(children) && children?.length > 1 && (
            <CarouselNavigationContainer
              hide={
                (itemsCount && itemsCount < 4) ||
                (Array.isArray(children) && children?.length < 4)
              }
            >
              <CarouselNavigationButton onClick={() => handleChange('prev')}>
                <ArrowBackIcon sx={{ width: '22px', height: '22px' }} />
              </CarouselNavigationButton>
              <CarouselNavigationButton
                sx={{ marginLeft: theme.spacing(1) }}
                onClick={() => handleChange('next')}
              >
                <ArrowForwardIcon sx={{ width: '22px', height: '22px' }} />
              </CarouselNavigationButton>
            </CarouselNavigationContainer>
          ))}
      </CarouselHeader>
      <CarouselContainerBox ref={carouselContainerRef} sx={styles}>
        {children}
      </CarouselContainerBox>
    </Box>
  );
};
