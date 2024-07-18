'use client';

import { getContrastAlphaColor } from '@/utils/colors';
import type { TabProps, TabsProps } from '@mui/material';
import { alpha } from '@mui/material';
import { Tab as MuiTab, Tabs, styled } from '@mui/material';

export const TabsContainer = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<TabsProps>(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? getContrastAlphaColor(theme, '12%')
      : getContrastAlphaColor(theme, '4%'),
  padding: 1,
  alignItems: 'center',

  '.MuiTabs-flexContainer': {
    alignItems: 'center',
  },
  '.MuiTabs-indicator': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) scaleY(0.98)',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.alphaLight300.main
        : theme.palette.white.main,
    zIndex: '-1',
  },
  '> .MuiTabs-root': {
    minHeight: 'unset !important',
  },
}));

export const Tab = styled(MuiTab, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<TabProps>(({ theme }) => ({
  textTransform: 'initial',
  letterSpacing: 0,
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '20px',
  margin: theme.spacing(0.75, 0.5),
  transition: 'background 250ms',
  background: 'transparent',
  minHeight: 'unset',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.white.main
      : theme.palette.black.main,
  textDecoration: 'none',
  '&.Mui-selected': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.white.main
        : theme.palette.black.main,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.white.main, 0.1)
        : theme.palette.white.main,
  },

  ':hover': {
    backgroundColor: getContrastAlphaColor(theme, '4%'),
  },
}));
