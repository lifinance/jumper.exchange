'use client';
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';

import { styled } from '@mui/material/styles';

export const FeatureCardsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  right: 0,
  width: 408,
  padding: theme.spacing(1.5),
  bottom: 0,
  zIndex: 2,
}));
