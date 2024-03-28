'use client';
import type {
  AppBarProps,
  CSSObject,
  LinkProps,
  ListItemProps,
  MenuListProps as MuiMenuListProps,
  PaperProps,
  PopperProps,
} from '@mui/material';
import {
  AppBar,
  Drawer,
  Link,
  ListItem,
  MenuList as MuiMenuList,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

import type { Breakpoint } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';
import type { ElementType } from 'react';

const MENU_LABEL_HEIGHT = 64;

export const MenuPopper = styled(Popper)<PopperProps>(({ theme }) => ({
  zIndex: 1600,
  top: '16px !important',
}));
export interface MenuListProps extends Omit<MuiMenuListProps, 'component'> {
  component?: string;
  isOpenSubMenu?: boolean;
  styles?: CSSObject;
  cardsLayout?: boolean;
  hasLabel?: boolean;
}

export const MenuList = styled(MuiMenuList, {
  shouldForwardProp: (prop) =>
    prop !== 'isOpenSubMenu' && prop !== 'hasLabel' && prop !== 'cardsLayout',
})<MenuListProps>(({ theme, isOpenSubMenu, hasLabel, cardsLayout }) => ({
  marginTop: 0,
  display: cardsLayout ? 'flex' : 'block',
  justifyContent: cardsLayout ? 'center' : 'unset',
  flexWrap: cardsLayout ? 'wrap' : 'inherit',
  padding: cardsLayout ? theme.spacing(0, 3) : 0,
  gap: cardsLayout ? '12px' : 'inherit',
  '& > :first-of-type': {
    marginTop:
      isOpenSubMenu || hasLabel || cardsLayout ? 'inherit' : theme.spacing(1.5),
    paddingTop: isOpenSubMenu ? theme.spacing(1.5) : 'inherit',
  },
  '& > :last-child': {
    marginBottom: isOpenSubMenu ? 'inherit' : theme.spacing(3),
    paddingBottom: isOpenSubMenu ? theme.spacing(1.5) : 'inherit',
    paddingTop: hasLabel ? 0 : 'inherit',
  },
}));

export const MenuHeaderLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.lifiBodyMediumStrong,
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  justifyContent: 'center',
  display: 'flex',
  marginRight: theme.spacing(4.75),
  flexWrap: 'nowrap',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    maxWidth: 174,
    marginRight: 0,
    marginLeft: theme.spacing(0.75),
  },
}));

export interface MenuPaperProps
  extends Omit<PaperProps, 'isDarkMode' | 'isWide' | 'component'> {
  isMobile?: boolean;
  width?: string;
  component?: ElementType<any>;
}

export const MenuPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    prop !== 'isMobile' && prop !== 'isWide' && prop !== 'isSubMenu',
})<MenuPaperProps>(({ theme, isMobile, width }) => ({
  background: theme.palette.surface1.main,
  padding: 0,
  marginTop: 0,
  boxShadow:
    theme.palette.mode === 'light'
      ? `0px ${isMobile ? '-' : ''}2px 4px rgba(0, 0, 0, 0.08), 0px ${
          isMobile ? '-' : ''
        }8px 16px rgba(0, 0, 0, 0.08)`
      : `0px ${isMobile ? '-' : ''}2px 4px rgba(0, 0, 0, 0.08), 0px ${
          isMobile ? '-' : ''
        }8px 16px rgba(0, 0, 0, 0.16)`,
  borderRadius: '12px 12px 0 0',
  marginBottom: 0,
  maxHeight: `calc( 100vh - ${MENU_LABEL_HEIGHT}px - 12px )`, // viewHeight - navbarHeight - offset
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  transformOrigin: 'bottom',
  transition:
    'opacity 307ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 204ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

  '.submenu .wallet-select-avatar': {
    width: 32,
    height: 32,
  },

  [theme.breakpoints.up('sm' as Breakpoint)]: {
    maxHeight: 'calc( 100vh - 72px - 12px )',
  },

  [theme.breakpoints.up('md' as Breakpoint)]: {
    transformOrigin: 'inherit',
    maxHeight: 'calc( 100vh - 80px - 12px )',
    borderRadius: '12px !important',
    width: width ?? 288,
    marginTop: -2,
  },
}));

export const MobileDrawer = styled(Drawer)<MenuItemLinkProps>(({ theme }) => ({
  zIndex: 1400,
}));

export interface MenuItemLinkProps extends Omit<LinkProps, 'component'> {
  component?: string;
}

export const MenuItemLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'component',
})<MenuItemLinkProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1.5),
  height: 48,
  textDecoration: 'none',
  color: 'inherit',
}));

export const MenuItemText = styled('span')({});

export const MenuHeaderAppWrapper = styled(ListItem)<ListItemProps>(
  ({ theme }) => ({
    position: 'sticky',
    top: 0,
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.surface1.main, 0.84),
    backdropFilter: 'blur(12px)',
    zIndex: 1400,
    overflow: 'hidden',
    margin: theme.spacing(0),
    marginBottom: 'inherit',
    marginTop: 0,
    height: MENU_LABEL_HEIGHT,
    padding: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      paddingLeft: 0,
    },
  }),
);
export interface MenuHeaderAppBarProps extends Omit<AppBarProps, 'component'> {
  component?: string;
}

export const MenuHeaderAppBar = styled(AppBar)<MenuHeaderAppBarProps>(
  ({ theme }) => ({
    backgroundColor: 'transparent',
    zIndex: 1500,
    position: 'fixed',
    top: 'initial',
    left: 'initial',
    right: 'initial',
    padding: theme.spacing(0, 1.5, 0, 1.5),
    color: theme.palette.text.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,

    [theme.breakpoints.up('sm' as Breakpoint)]: {
      padding: theme.spacing(0, 1.5),
      position: 'relative',
      justifyContent: 'flex-start',
    },
  }),
);
