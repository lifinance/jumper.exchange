import {
  Box,
  BoxProps,
  Breakpoint,
  Typography,
  keyframes,
  styled,
} from '@mui/material';
import { NavbarHeight } from '../Navbar/Navbar.style';

export interface WrapperProps extends Omit<BoxProps, 'component'> {
  showWelcome?: boolean;
}

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showWelcome',
})<WrapperProps>(({ theme, showWelcome }) => ({
  position: 'absolute',
  top: '0px',
  padding: `${NavbarHeight.XS} 0px 0px`,
  left: 0,
  right: 0,
  width: '100%',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  scrollBehavior: 'smooth',
  overflowX: 'hidden',

  [theme.breakpoints.up('sm' as Breakpoint)]: {
    padding: `${NavbarHeight.SM} 0px 0px`,
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    padding: `${NavbarHeight.LG} 0px 0px`,
  },
  // maxHeight: showWelcome ? `calc( 100vh - ${NavbarHeight.XS} )` : 'unset',
  // overflow: showWelcome ? 'hidden' : 'hidden',
  // [`@media screen and (min-width: 392px)`]: {
  //   overflow: showWelcome ? 'visible' : 'hidden',
  // },
  // [theme.breakpoints.up('sm' as Breakpoint)]: {
  //   maxHeight: showWelcome ? `calc( 100vh - ${NavbarHeight.SM} )` : 'auto',
  // },
  // [theme.breakpoints.up('md' as Breakpoint)]: {
  //   maxHeight: showWelcome ? `calc( 100vh - ${NavbarHeight.LG} )` : 'auto',
  // },
  // '&:after': {
  //   content: showWelcome && '" "',
  //   top: 0,
  //   position: 'absolute',
  //   left: 0,
  //   zIndex: -1,
  //   right: 0,
  //   bottom: 0,
  //   background:
  //     showWelcome && theme.palette.mode === 'dark'
  //       ? 'linear-gradient(180deg, rgba(26, 16, 51, 0) 0%, #1A1033 21.15%)'
  //       : showWelcome && theme.palette.mode === 'light'
  //       ? 'linear-gradient(180deg, rgba(243, 235, 255, 0) 0%, #f3ebffd4 21.15%)'
  //       : 'unset',
  // },
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
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '56px',
  },
}));

export const ColoredContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  height: '50%',
  width: '100%',
}));

export const SlideWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: NavbarHeight.XS,
  left: 0,
  right: 0,
  bottom: 0,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    top: NavbarHeight.SM,
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    top: NavbarHeight.LG,
  },
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
  bottom: 0,
  height: 'fit-content',
  minHeight: '50%',
  background: theme.palette.mode === 'dark' ? '#1A1033' : '#F3EBFF',
  width: '100%',
  position: 'absolute',
  zIndex: '1400',
  top: `calc( 50% - ${NavbarHeight.XS} / 2 )`,
  padding: theme.spacing(0, 1, 4),
  overflow: 'visible',
  animation: !showWelcome ? fadeOut : 'unset',
  animationDuration: '.5s',

  '&:before': {
    content: '" "',
    position: 'absolute',
    height: '35%',
    top: '-35%',
    pointerEvents: 'none',
    left: '0',
    right: '0',
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(to top, #1A1033 0%, transparent 100%)'
        : 'linear-gradient(to top, #F3EBFF 0%, transparent 100%)',
    zIndex: '1000',
  },

  [theme.breakpoints.up('sm' as Breakpoint)]: {
    top: `calc( 50% - ${NavbarHeight.SM} / 2)`,
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    top: `calc( 50% - ${NavbarHeight.LG} / 2 )`,
  },

  [`@media screen and (min-height: 490px)`]: {
    padding: theme.spacing(1, 1, 3),

    '&:before': {
      top: '-200px',
      height: '200px',
    },
  },
}));

export const WelcomeContent = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: '50vh',
}));
