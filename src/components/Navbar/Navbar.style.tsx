'use client';

import { AppBar } from '@mui/material';

import { HeaderHeight } from '@/const/headerHeight';
import { Link } from '@mui/material';
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
  cursor: 'pointer',
  display: 'flex',
  height: '32px',
  alignContent: 'center',
  flex: 1,
}));
