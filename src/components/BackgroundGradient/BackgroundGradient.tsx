'use client';
import type { CSSObject } from '@mui/material';
import {
  BackgroundGradientBottomLeft,
  BackgroundGradientBottomRight,
  BackgroundGradientContainer,
  BackgroundGradientTopCenter,
  BlogBackgroundGradient,
} from '.';

interface BackgroundGradientProps {
  variant?: 'blog';
  styles?: CSSObject;
}

export const BackgroundGradient = ({
  variant,
  styles,
}: BackgroundGradientProps) => {
  return variant === 'blog' ? (
    <BlogBackgroundGradient />
  ) : (
    <BackgroundGradientContainer sx={styles}>
      <BackgroundGradientBottomLeft />
      <BackgroundGradientBottomRight />
      <BackgroundGradientTopCenter />
    </BackgroundGradientContainer>
  );
};
