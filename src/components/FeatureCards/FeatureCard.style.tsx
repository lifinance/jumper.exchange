'use client';
import type { CardProps as MuiCardProps } from '@mui/material';
import { Card as MuiCard } from '@mui/material';

import { styled } from '@mui/material/styles';

export interface CardProps extends Omit<MuiCardProps, 'component'> {
  backgroundImageUrl?: string;
  isDarkCard?: boolean;
}

export const FCard = styled(MuiCard, {
  shouldForwardProp: (prop) =>
    prop !== 'backgroundImageUrl' && prop !== 'isDarkCard',
})<CardProps>(({ theme, backgroundImageUrl, isDarkCard }) => ({
  width: 384,
  height: 160,
  cursor: 'pointer',
  borderRadius: '12px',
  position: 'relative',
  marginBottom: theme.spacing(1.5),
  overflow: 'hidden',
  backgroundImage: `url(${backgroundImageUrl}), radial-gradient(circle at 506px 437px, #3F49E1 -43%, ${
    isDarkCard || theme.palette.mode === 'dark' ? '#20223D' : '#FFFFFF'
  } 506px 349px)`,
  backgroundSize: 'contain',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)'
      : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)',
  ':last-child': {
    marginBottom: 0,
  },
}));
