import { Box, Breakpoint, Typography, styled } from '@mui/material';
import { NavbarHeight } from '../Navbar/Navbar.style';

export const Background = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  overflow: 'hidden',
  position: 'fixed',
  width: '100%',
  top: `-${NavbarHeight.XS}`,
  filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.04))',
  height: `calc( 100% + ${NavbarHeight.XS})`,
  zIndex: 1400,
  ':before': {
    content: '" "',
    height: '100%',
    width: '100%',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, rgba(36, 32, 61, 0.24) 0%, #24203D 49.48%, #181529 100%)'
        : ' linear-gradient(180deg, rgba(237, 224, 255, 0) 0%, #EDE0FF 49.48%, #F3EBFF 97.4%)',
    zIndex: -1,
  },
  ':after': {
    content: '" "',
    height: '100%',
    width: '100%',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background:
      'radial-gradient(50% 50% at 50% 50%, rgba(190, 160, 235, 0.4) 0%, rgba(190, 160, 235, 0) 100%)',
    zIndex: -1,
  },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    height: `calc( 100% + ${NavbarHeight.SM} )`,
    top: `-${NavbarHeight.SM}`,
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    height: `calc( 100% + ${NavbarHeight.LG} )`,
    top: `-${NavbarHeight.LG}`,
  },
}));

export const CustomColor = styled(Typography)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(270deg, #D35CFF 0%, #BEA0EB 94.17%)'
      : 'linear-gradient(270deg, #31007A 0%, #8700B8 94.17%);',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export const ColoredContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  height: '50%',
  width: '100%',
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  bottom: 0,
  width: '100%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-33.33%)',
  padding: theme.spacing(0, 2, 8),
  background: 'transparent',
  [`@media screen and (min-height: 650px)`]: {
    transform: 'unset',
    bottom: 0,
    paddingBottom: theme.spacing(8),
  },
}));
