'use client';

import { styled } from '@mui/material';

export const OnRamperIFrame = styled('iframe')(({ theme }) => ({
  borderRadius: '12px',
  border: 'unset',
  margin: theme.spacing(0, 'auto', 3, 'auto'),
  maxWidth: 416,
  height: 630,
  minWidth: 375,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)'
      : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)',
}));
