'use client';
import { styled } from '@mui/material/styles';
import React from 'react';
import {
  BackgroundGradientBottomLeft,
  BackgroundGradientBottomRight,
  BackgroundGradientTopCenter,
} from './BackgroundGradient';
import { useSettingsStore } from '@/stores/settings';

export interface BackgroundContainerProps {
  variant?: 'outlined';
  backgroundColor?: string;
  backgroundImageUrl?: URL;
}

const BackgroundContainer = styled('div', {
  name: 'Background', // The component name
  slot: 'root', // The slot name
})(({ theme }) => ({}));

function Background() {
  const configTheme = useSettingsStore((state) => state.configTheme);

  return (
    <BackgroundContainer>
      {configTheme?.hasBackgroundGradient && (
        <>
          <BackgroundGradientBottomLeft />
          <BackgroundGradientBottomRight />
          <BackgroundGradientTopCenter />
        </>
      )}
    </BackgroundContainer>
  );
}

export default Background;
