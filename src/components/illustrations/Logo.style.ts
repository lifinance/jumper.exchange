'use client';
import { styled } from '@mui/system';

export const LogoWrapper = styled('div')(({ theme }) => {
  const mainCol =
    theme.palette.mode === 'light'
      ? theme.palette.accent1.main
      : theme.palette.accent1Alt.main;
  const subCol = theme.palette.accent2.main;

  return {
    cursor: 'pointer',
    display: 'flex',
    fill: 'none',
    '.main-color': {
      fill: mainCol,
    },
    '.sub-color': {
      fill: subCol,
    },
    [theme.breakpoints.down('sm')]: {
      '& .jumper-learn-logo, & .jumper-logo, ': {
        width: 32,
        height: 32,
      },
      '& .jumper-learn-logo-desktop, & .jumper-logo-desktop': {
        display: 'none',
      },
    },
  };
});

export const CollabLogoWrapper = styled('div')(({ theme }) => {
  const mainCol =
    theme.palette.mode === 'light'
      ? theme.palette.accent1.main
      : theme.palette.accent1Alt.main;
  const subCol = theme.palette.accent2.main;

  return {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fill: 'none',
    '.main-color': {
      fill: mainCol,
    },
    '.sub-color': {
      fill: subCol,
    },
    [theme.breakpoints.down('sm')]: {
      '& .jumper-learn-logo, & .jumper-logo, ': {
        width: 32,
        height: 32,
      },
      '& .jumper-learn-logo-desktop, & .jumper-logo-desktop': {
        display: 'none',
      },
    },
  };
});
