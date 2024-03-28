'use client';
import type { BoxProps } from '@mui/material';
import { Box, keyframes, styled } from '@mui/material';

export interface WrapperProps extends Omit<BoxProps, 'component'> {
  showWelcome?: boolean;
}

export const Overlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showWelcome',
})<WrapperProps>(({ theme, showWelcome }) => ({
  position: 'absolute',
  top: '50vh',
  left: 0,
  right: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  scrollBehavior: 'smooth',
  zIndex: '1400',
}));

export interface ContentWrapperProps extends Omit<BoxProps, 'component'> {
  showWelcome?: boolean;
}

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showWelcome',
})<ContentWrapperProps>(({ theme, showWelcome }) => ({
  textAlign: 'center',
  background: theme.palette.mode === 'dark' ? '#1A1033' : '#F3EBFF',
  width: '100%',
  position: 'absolute',
  top: 0,
  zIndex: '1400',
  height: 'auto',
  animation: !showWelcome ? fadeOut : 'unset',
  animationDuration: '.5s',

  '&:before': {
    content: '" "',
    position: 'absolute',
    height: '35%',
    top: '-35%',
    pointerEvents: 'none',
    left: 0,
    right: 0,
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(to top, #1A1033 0%, transparent 100%)'
        : 'linear-gradient(to top, #F3EBFF 0%, transparent 100%)',
    zIndex: '1000',
  },
}));

export const WelcomeContent = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: '50vh',
}));
