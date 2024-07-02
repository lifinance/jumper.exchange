'use client';
import type { Breakpoint } from '@mui/material';
import { styled, type BoxProps } from '@mui/material';

export interface ContainerProps extends Omit<BoxProps, 'variant'> {
  variant?: 'xs' | 'md' | 'lg';
  fixedPosition?: boolean;
  isArticlePage?: boolean;
}
//, {  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'cardsLayout',}
export const SuperFestPoweredContainer = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'isArticlePage' && prop !== 'fixedPosition',
})<ContainerProps>(({ theme, fixedPosition, isArticlePage }) => ({
  display: 'none',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    ...(!fixedPosition
      ? {
          position: 'static',
          display: 'flex',
          justifyContent: 'flex-start',
          // marginRight: theme.spacing(3),
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(4),
          marginLeft: theme.spacing(2),
          [theme.breakpoints.up('sm' as Breakpoint)]: {
            // marginTop: isArticlePage ? theme.spacing(-6) : theme.spacing(8),
          },
        }
      : {
          position: 'fixed',
          display: 'block',
          bottom: theme.spacing(2.75),
          right: theme.spacing(3),
        }),
    zIndex: 1,

    '.link-lifi': {
      fontWeight: '700',
      color:
        theme.palette.mode === 'light'
          ? theme.palette.accent1.main
          : theme.palette.accent1Alt.main,
      textDecoration: 'none',
    },
  },
}));
