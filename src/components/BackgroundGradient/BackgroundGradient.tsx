'use client';
import { type CSSObject } from '@mui/material';
import { useMemo } from 'react';
import { STRAPI_URL_PATH } from 'src/const/urls';
import { usePartnerFilter } from 'src/hooks/usePartnerFilter';
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';
import type { ThemeModesSupported } from 'src/types/settings';
import type { PartnerThemesAttributes } from 'src/types/strapi';
import {
  BackgroundGradientBottomLeft,
  BackgroundGradientBottomRight,
  BackgroundGradientContainer,
  BackgroundGradientTopCenter,
} from '.';
import { SirBridgeLot } from '../illustrations/SirBridgeLot';
import { FixBoxWithNoOverflow, MovingBox } from './MovingBox.style';

interface BackgroundGradientProps {
  styles?: CSSObject;
  partnerTheme?: PartnerThemesAttributes;
  themeMode?: ThemeModesSupported;
}

export const BackgroundGradient = ({
  styles,
  partnerTheme,
  themeMode,
}: BackgroundGradientProps) => {
  const { partnerName } = usePartnerFilter();
  const { activeUid, backgroundColor, imgUrl } = usePartnerTheme();
  const bgImg = useMemo(() => {
    return (
      imgUrl ||
      (themeMode === 'light'
        ? partnerTheme?.BackgroundImageLight.data?.attributes.url &&
          new URL(
            partnerTheme?.BackgroundImageLight.data.attributes.url,
            STRAPI_URL_PATH,
          )
        : partnerTheme?.BackgroundImageDark.data?.attributes.url &&
          new URL(
            partnerTheme?.BackgroundImageDark.data.attributes.url,
            STRAPI_URL_PATH,
          ))
    );
  }, [imgUrl, partnerTheme, themeMode]);
  const bgCol = useMemo(() => {
    return (
      backgroundColor ||
      (themeMode === 'light'
        ? partnerTheme?.lightConfig?.customization?.palette.background
        : partnerTheme?.darkConfig?.customization?.palette.background)
    );
  }, [backgroundColor, partnerTheme, themeMode]);

  if (partnerName === 'memecoins') {
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
      backgroundImageUrl={bgImg || undefined}
      backgroundColor={bgCol as string}
    >
      {!activeUid && (
        <>
          <BackgroundGradientBottomLeft />
          <BackgroundGradientBottomRight />
          <BackgroundGradientTopCenter />
        </>
      )}
    </BackgroundGradientContainer>
  );
};
