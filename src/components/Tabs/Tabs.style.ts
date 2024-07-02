'use client';

import { getContrastAlphaColor } from '@/utils/colors';
import type { TabProps as MuiTabProps, TabsProps } from '@mui/material';
import { Tab as MuiTab, Tabs, alpha, styled } from '@mui/material';

export const TabsContainer = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<TabsProps>(({ theme }) => ({
  margin: '0 auto',
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

export interface CustomTabProps extends Omit<MuiTabProps, 'component'> {
  blur?: boolean;
}

export const Tab = styled(MuiTab, {
  shouldForwardProp: (prop) => prop !== 'blur',
})<CustomTabProps>(({ theme, blur }) => ({
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
  opacity: blur ? 0.2 : 'unset',

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
