'use client';

import type { BoxProps } from '@mui/material';
import { Box, styled } from '@mui/material';

export interface WidgetWrapperProps extends Omit<BoxProps, 'component'> {
  welcomeScreenClosed: boolean;
}

export const WidgetWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'welcomeScreenClosed',
})<WidgetWrapperProps>(({ theme, welcomeScreenClosed }) => ({
  width: '100%',
  position: 'relative',
  margin: theme.spacing(0, 'auto'),
  ...(!welcomeScreenClosed && {
    '&:hover': {
      marginTop: 0,
    },
  }),
  zIndex: 2,
  // [theme.breakpoints.up('sm' as Breakpoint)]: {
  //   maxWidth: 416,
  // },
}));

export const GlowBackground = styled('span')(({ theme }) => ({
  position: 'absolute',
  opacity: 0,
  zIndex: -1,
  minWidth: 440,
  minHeight: 440,
  width: '50vw',
  height: '50vw',
  transform: 'translateX(-50%)',
  left: '50%',
  top: 80,
}));
