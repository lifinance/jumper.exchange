import type { TypographyProps } from '@mui/material';
import { AppBar, Link, Typography } from '@mui/material';

import { HeaderHeight } from '@/const/headerHeight';
import type { Breakpoint } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export const NavbarContainer = styled(AppBar)<{ sticky?: boolean }>(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    backdropFilter: 'blur(12px)',
    boxShadow: 'unset',
    background: 'transparent',
    alignItems: 'center',
    height: HeaderHeight.XS,
    padding: theme.spacing(1, 2),
    zIndex: 1500,
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      height: HeaderHeight.SM,
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.up('md' as Breakpoint)]: {
      padding: theme.spacing(3),
      height: HeaderHeight.MD,
    },
  }),
);

export const LogoLink = styled(Link)(({ theme }) => ({
  height: 48,
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
}));

export const CenteredContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2.5),
  textAlign: 'center',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.accent1Alt.main
      : theme.palette.primary.main,
  fontWeight: 700,
  [theme.breakpoints.up('sm')]: {
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '32px',
  },
}));

export const SupportMessage = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 208,
    marginLeft: '9.5px',
    marginRight: '9.5px',
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      maxWidth: 168,
    },
  }),
);
