'use client';
import type { Breakpoint, Theme } from '@mui/material/styles';
import { alpha, darken, styled } from '@mui/material/styles';

export interface BackgroundGradientContainerProps {
  backgroundImageUrl?: URL;
  backgroundColor?: string;
}

export const BackgroundGradientContainer = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'backgroundImageUrl' && prop !== 'backgroundColor',
})<BackgroundGradientContainerProps>(({
  theme,
  backgroundImageUrl,
  backgroundColor,
}) => {
  return {
    position: 'fixed',
    overflow: 'hidden',
    pointerEvents: 'none',
    background: backgroundImageUrl
      ? `url(${backgroundImageUrl.href})`
      : (theme as Theme).palette.surface1.main,
    backgroundColor: backgroundColor,
    left: 0,
    ...(backgroundImageUrl && { backgroundSize: 'cover' }),
    bottom: 0,
    right: 0,
    top: 0,
    zIndex: -1,
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  };
});

const BackgroundGradient = styled('span')(() => ({
  content: '" "',
  position: 'absolute',
  width: '100vh',
  height: '100vh',
  opacity: '0.12',
}));

export const BackgroundGradients = styled('span')(({ theme }) => ({
  width: theme.palette.mode === 'dark' ? '100vw' : '100vh',
  height: theme.palette.mode === 'dark' ? '100vw' : '100vh',
  opacity: theme.palette.mode === 'dark' ? '0.24' : '0.12',
  transform:
    theme.palette.mode === 'dark'
      ? 'translate(-0%, -50%) scale( calc( 1 + 1 / 3 ))'
      : 'translate(0%,-50%) scale(1.5)',
  background:
    'radial-gradient(50% 50% at 50% 50%, #9747FF 0%, rgba(255, 255, 255, 0) 100%)',
  ':before': {
    content: '" "',
    width: '100vh',
    height: '100vh',
    transform:
      theme.palette.mode === 'dark'
        ? 'translate( -50vh, 100vh ) scale(1.5)'
        : undefined,
    opacity: theme.palette.mode === 'dark' ? '0.24' : '0.12',
    background:
      'radial-gradient(50% 50% at 50% 50%, #1969FF 0%, rgba(255, 255, 255, 0) 100%)',
  },
  ':after': {
    content: '" "',
    position: 'absolute',
    width: '100vh',
    height: '100vh',
    transform: 'translate(50%,50%) scale(1.5)',
    right: 0,
    bottom: 0,
    opacity: theme.palette.mode === 'dark' ? '0.24' : '0.12',
    background:
      'radial-gradient(50% 50% at 50% 50%, #E1147B 0%, rgba(255, 255, 255, 0) 100%)',
  },
}));

export const BackgroundGradientBottomLeft = styled(BackgroundGradient)(
  ({ theme }) => ({
    [theme.breakpoints.down('sm' as Breakpoint)]: {
      display: 'none',
    },
    transform: 'translate(-50%,50%) scale(1.5)',
    left: 0,
    opacity: theme.palette.mode === 'dark' ? '0.24' : '0.16',
    bottom: 0,
    background:
      'radial-gradient(50% 50% at 50% 50%, #BB00FF 0%, rgba(255, 255, 255, 0) 100%)',
  }),
);

export const BackgroundGradientBottomRight = styled(BackgroundGradient)(
  ({ theme }) => ({
    [theme.breakpoints.down('sm' as Breakpoint)]: {
      display: 'none',
    },
    transform: 'translate(50%,50%) scale(1.5)',
    right: 0,
    bottom: 0,
    opacity: theme.palette.mode === 'dark' ? '0.24' : '0.16',
    background:
      'radial-gradient(50% 50% at 50% 50%, #0044FF 0%, rgba(255, 255, 255, 0) 100%)',
  }),
);

export const BackgroundGradientTopCenter = styled(BackgroundGradient)(
  ({ theme }) => ({
    [theme.breakpoints.down('sm' as Breakpoint)]: {
      display: 'none',
    },
    transform:
      theme.palette.mode === 'dark'
        ? 'translate(-50%, -50%) scale( calc( 1 + 1 / 3 ))'
        : 'translate(-50%, -50%) scale(1.5)',
    top: 0,
    left: '50%',
    width: theme.palette.mode === 'dark' ? '100vw' : '100vh',
    height: theme.palette.mode === 'dark' ? '100vw' : '100vh',
    opacity: theme.palette.mode === 'dark' ? '0.24' : '0.12',
    background:
      'radial-gradient(50% 50% at 50% 50%, #8800FF 0%, rgba(255, 255, 255, 0) 100%)',
  }),
);

export const BlogBackgroundGradient = styled(BackgroundGradient)(
  ({ theme }) => ({
    transform: 'translateX(-50%)',
    top: -200,
    left: '50%',
    position: theme.palette.mode === 'light' ? 'absolute' : 'fixed',
    opacity: 1,
    width: '100%',
    height: 'calc( 100vh + 200px )',
    zIndex: -1,
    background:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, ${alpha(theme.palette.bg.main, 1)} 0%, ${alpha(theme.palette.bg.main, 0)} 100%)`
        : `linear-gradient(180deg, rgba(3, 0, 20, 1) 0%, ${darken('#9747FF', 0.6)} 150%)`,
  }),
);

export const SuperfestBackgroundContainer = styled('div')(() => ({
  position: 'fixed',
  backgroundRepeat: 'repeat',
  width: '100%',
  height: '100%',
  backgroundImage: `url(https://strapi.li.finance/uploads/Superfest_OP_9e52e7917e.svg)`,
  overflow: 'hidden',
  // pointerEvents: 'none',
  left: 0,
  bottom: 0,
  right: 0,
  top: 0,
  zIndex: -1,
}));
