'use client';
import { useTheme, type CSSObject } from '@mui/material';
import { useMemo } from 'react';
import { useMainPaths } from 'src/hooks/useMainPaths';
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';
import { useSuperfest } from 'src/hooks/useSuperfest';
import {
  BackgroundGradientBottomLeft,
  BackgroundGradientBottomRight,
  BackgroundGradientContainer,
  BackgroundGradientTopCenter,
} from '.';
import { SirBridgeLot } from '../illustrations/SirBridgeLot';
import { FixBoxWithNoOverflow, MovingBox } from './MovingBox.style';
import SuperfestBackground from './SuperfestBackground';

interface BackgroundGradientProps {
  styles?: CSSObject;
}

export const BackgroundGradient = ({ styles }: BackgroundGradientProps) => {
  const { partnerName } = usePartnerTheme();
  const { isSuperfest } = useSuperfest();
  const { isMainPaths } = useMainPaths();
  const { partnerTheme, hasTheme, backgroundColor, imgUrl } = usePartnerTheme();
  const theme = useTheme();
  const bgImg = useMemo(() => {
    return imgUrl;
  }, [imgUrl]);
  const bgCol = useMemo(() => {
    return (
      backgroundColor ||
      (theme.palette.mode === 'light'
        ? partnerTheme?.attributes.lightConfig?.customization?.palette
            .background
        : partnerTheme?.attributes.darkConfig?.customization?.palette
            .background)
    );
  }, [
    backgroundColor,
    partnerTheme?.attributes.darkConfig,
    partnerTheme?.attributes.lightConfig,
    theme.palette.mode,
  ]);

  if (isSuperfest || isMainPaths) {
    return <SuperfestBackground />;
  }

  if (partnerName.includes('memecoins')) {
    return (
      <>
        <FixBoxWithNoOverflow>
          <MovingBox>
            <SirBridgeLot />
          </MovingBox>
        </FixBoxWithNoOverflow>
        <BackgroundGradientContainer sx={styles}>
          <BackgroundGradientBottomLeft />
          <BackgroundGradientBottomRight />
          <BackgroundGradientTopCenter />
        </BackgroundGradientContainer>
      </>
    );
  }
  return (
    <BackgroundGradientContainer
      sx={styles}
      backgroundImageUrl={!!hasTheme ? bgImg : undefined}
      backgroundColor={!!hasTheme ? (bgCol as string) : undefined}
    >
      {!hasTheme && (
        <>
          <BackgroundGradientBottomLeft />
          <BackgroundGradientBottomRight />
          <BackgroundGradientTopCenter />
        </>
      )}
    </BackgroundGradientContainer>
  );
};
