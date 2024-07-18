'use client';

import type { Breakpoint } from '@mui/material';
import { Box, alpha, styled } from '@mui/material';
import Image from 'next/image';

export interface WidgetContainerProps {
  isActive?: boolean;
  welcomeScreenClosed: boolean;
}

export const WidgetContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isActive' && prop !== 'welcomeScreenClosed',
})<WidgetContainerProps>(
  ({ theme, isActive, welcomeScreenClosed = false }) => ({
    display: 'flex',
    overflow: !welcomeScreenClosed ? 'hidden' : 'inherit',
    width: 'auto',
    minHeight: '50vh',
    transitionProperty: 'max-height',
    transitionDuration: '.3s',
    transitionTimingFunction: 'ease-in-out',
    maxHeight: 'inherit',

    // setting hover animations on widget wrappers
    '& > .widget-wrapper > div': {
      transitionProperty: 'margin-top',
      transitionDuration: '.3s',
      transitionTimingFunction: 'ease-in-out',
      marginTop: !welcomeScreenClosed ? '24px' : 0,
      cursor: !welcomeScreenClosed ? 'pointer' : 'auto',
      [theme.breakpoints.down('sm' as Breakpoint)]: {
        height: 'auto',
        div: {
          maxHeight: '100%',
        },
      },

      [theme.breakpoints.up('sm' as Breakpoint)]: {
        marginTop: !welcomeScreenClosed ? '24px' : 0,
        [`@media screen and (min-height: 700px)`]: {
          marginTop: !welcomeScreenClosed
            ? 'calc( 50vh - 680px / 2.75 - 40px)'
            : 0, // (mid viewheight - half-two/thirds widget height - navbar height )
        },

        [`@media screen and (min-height: 900px)`]: {
          marginTop: !welcomeScreenClosed
            ? 'calc( 50vh - 680px / 2.75 - 128px)'
            : 0, // (mid viewheight - half-two/thirds widget height - ( navbar height + additional spacing) )
        },
      },
    },

    // widget overlay when welcome screen opened
    '& .widget-wrapper > div:before': {
      content: '" "',
      visibility: !welcomeScreenClosed ? 'visible' : 'hidden',
      position: 'absolute',
      width: 'inherit',
      zIndex: 900,
      left: 0,
      right: 0,
      bottom: !welcomeScreenClosed ? 0 : 'calc( 680px - 486px )',
      background:
        theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, transparent 15%,  #000 40%)'
          : 'linear-gradient(180deg, transparent 15%, #fff 40%)',
      opacity: 0.5,
      margin: 'auto',
      transitionProperty: 'opacity, bottom',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'ease-in-out',
      transitionDelay: !welcomeScreenClosed ? '0s' : '0.3s',
      borderTopRightRadius: '12px',
      borderTopLeftRadius: '12px',
      top: 24,

      [`@media screen and (min-height: 700px)`]: {
        top: 'calc( 50vh - 680px / 2.75 - 40px)', // (mid viewheight - half-two/thirds widget height - navbar height )
      },

      [`@media screen and (min-height: 900px)`]: {
        top: 'calc( 50vh - 680px / 2.75 - 128px)', // (mid viewheight - half-two/thirds widget height - ( navbar height + additional spacing) )
        bottom: !welcomeScreenClosed
          ? 'calc( 680px - 300px)'
          : 'calc( 680px - 486px )',
      },
    },

    // dark widget overlay when welcome screen opened -> hover animation
    '& .widget-wrapper > div:hover:before': {
      opacity: 0.25,
    },

    '.welcome-screen-container + & .widget-wrapper > div': {
      cursor: 'pointer',
    },

    // // TODO move to welcome screen component
    '.welcome-screen-container + &': {
      maxHeight: !welcomeScreenClosed ? '50vh' : 'auto',
    },

    // radial shadow glow
    '.welcome-screen-container + &:before': {
      content: '" "',
      transitionProperty: 'top, opacity',
      transitionDuration: '.4s',
      transitionTimingFunction: 'ease-in-out',
      background:
        theme.palette.mode === 'dark'
          ? 'radial-gradient(50% 50% at 50% 50%, #6600FF 0%, rgba(255, 255, 255, 0) 100%);'
          : 'radial-gradient(50% 50% at 50% 50%, #8700B8 0%, rgba(255, 255, 255, 0) 100%);',
      position: 'absolute',
      zIndex: -1,
      pointerEvents: 'none',
      width: 1080,
      height: 1080,
      maxWidth: '90vw',
      maxHeight: '90vh',
      transform: 'translate(-50%, -50%)',
      left: '50%',
      top: '50%',
      opacity:
        !welcomeScreenClosed && theme.palette.mode === 'dark'
          ? 0.24
          : !welcomeScreenClosed && theme.palette.mode === 'light'
            ? 0.12
            : 0,
    },

    // radial shadow glow -> animation
    '&:hover:before': {
      ...(!welcomeScreenClosed && {
        opacity: theme.palette.mode === 'dark' ? 0.48 : 0.34,
        top: '45%',
      }),
    },
  }),
);

export const BackgroundFooterImage = styled(Image)(({ theme }) => ({
  width: 200,
  height: 'auto',
  bottom: 0,
  objectFit: 'contain',
  left: 0,
  cursor: 'pointer',
  margin: theme.spacing(2),
  transition: 'background-color 0.3s ease-in',
  borderRadius: '12px',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    margin: theme.spacing(4),
    width: 400,
    height: 'auto',
  },

  '&:hover': {
    backgroundColor: alpha(theme.palette.black.main, 0.04),
  },
}));
