import {
  AppBar,
  AppBarProps,
  ButtonProps,
  CSSObject,
  Link,
  LinkProps,
  ListItem,
  ListItemProps as MUIListItemProps,
  MenuItem as MUIMenuItem,
  MenuItemProps as MUIMenuItemProps,
  MenuList,
  MenuListProps,
  Paper,
  PaperProps,
  Popper,
  PopperProps,
  Typography,
} from '@mui/material';

import { Breakpoint, alpha, styled } from '@mui/material/styles';
import { getContrastAlphaColor } from '@transferto/shared/src/utils';
import { ElementType } from 'react';
import { ButtonSecondary } from '../Button';

const MenuLabelHeight = '64px';

export enum NavbarHeight {
  XS = '64px',
  SM = '72px',
  LG = '80px',
}

export const NavbarBrandContainer = styled(Link)(({ theme }) => ({
  height: '48px',
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
}));

export const NavbarExternalBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1600,
  backgroundColor: '#000000',
  opacity: theme.palette.mode === 'dark' ? 0.75 : 0.25,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    backgroundColor: 'transparent',
  },
}));

export const NavbarManagement = styled('div')({
  display: 'flex',
  justifySelf: 'self-end',
});

export const NavBar = styled(AppBar)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: 'transparent',
  boxShadow: 'none',
}));

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
    height: NavbarHeight.XS,
    padding: theme.spacing(1, 2),
    zIndex: 1500,
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      height: NavbarHeight.SM,
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.up('md' as Breakpoint)]: {
      padding: theme.spacing(3),
      height: NavbarHeight.LG,
    },
  }),
);

export const NavbarDropdownButton = styled(ButtonSecondary)<ButtonProps>(
  ({ theme }) => ({
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.accent1Alt.main
        : theme.palette.primary.main,
    width: '48px',
    borderRadius: '50%',
    marginLeft: theme.spacing(1.5),
    minWidth: 'unset',
    height: '48px',
    ':hover:before': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? getContrastAlphaColor(theme, '4%')
          : theme.palette.alphaDark100.main,
    },
    ':hover': {
      backgroundColor: 'transparent',
    },
  }),
);

export const NavbarPopper = styled(Popper)<PopperProps>(({ theme }) => ({
  zIndex: 1600,
  bottom: '0 !important',
  left: '0 !important',
  top: 'unset !important',
  right: '0 !important',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    bottom: 'unset !important',
    left: 'unset !important',
    top: 'unset !important',
    right: '1.5rem !important',
    transform: 'unset !important',
  },
}));
export interface NavbarMenuListProps extends Omit<MenuListProps, 'component'> {
  component?: string;
  isOpenSubMenu?: boolean;
  styles?: CSSObject;
  cardsLayout?: boolean;
  hasLabel?: boolean;
}

export const NavbarMenuList = styled(MenuList, {
  shouldForwardProp: (prop) =>
    prop !== 'isOpenSubMenu' && prop !== 'hasLabel' && prop !== 'cardsLayout',
})<NavbarMenuListProps>(({ theme, isOpenSubMenu, hasLabel, cardsLayout }) => ({
  marginTop: 0,
  display: cardsLayout ? 'flex' : 'block',
  justifyContent: cardsLayout ? 'center' : 'unset',
  flexWrap: cardsLayout ? 'wrap' : 'inherit',
  padding: cardsLayout ? '0 24px' : 0,
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
  marginRight: '38px',
  flexWrap: 'nowrap',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    maxWidth: '174px',
    marginRight: '0px',
    marginLeft: '6px',
  },
}));

export interface MenuItemProps extends Omit<MUIMenuItemProps, 'showButton'> {
  showButton?: boolean;
  styles?: CSSObject;
  component?: ElementType<any>;
}

export const MenuItem = styled(MUIMenuItem, {
  shouldForwardProp: (prop) =>
    prop !== 'showButton' && prop !== 'component' && prop !== 'styles',
})<MenuItemProps>(({ theme, showButton }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'inherit',
  padding: showButton ? theme.spacing(0, 1.5, 1.5) : theme.spacing(0, 1.5),
  backgroundColor: 'inherit',
  justifyContent: 'space-between',
  margin: theme.spacing(0, 1.5),
  height: showButton ? 'auto' : '48px',
  marginTop: showButton ? theme.spacing(1) : 0,
  borderRadius: '12px',
  width: 'auto',
  placeContent: 'space-between',

  '&:hover': {
    backgroundColor: showButton
      ? 'transparent'
      : getContrastAlphaColor(theme, '4%'),
  },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    height: showButton ? 'auto' : '48px',
  },
}));

export interface NavbarPaperProps
  extends Omit<PaperProps, 'isDarkMode' | 'isWide' | 'component'> {
  isMobile?: boolean;
  isWide?: boolean;
  component?: ElementType<any>;
}

export const NavbarPaper = styled(Paper, {
  shouldForwardProp: (prop) =>
    prop !== 'isDarkMode' && prop !== 'isWide' && prop !== 'isSubMenu',
})<NavbarPaperProps>(({ theme, isMobile, isWide }) => ({
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
  maxHeight: `calc( 100vh - ${MenuLabelHeight} - 12px )`, // viewHeight - navbarHeight - offset
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  transformOrigin: 'bottom',
  transition:
    'opacity 307ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 204ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

  '.submenu .wallet-select-avatar': {
    width: '32px ',
    height: '32px',
  },

  [theme.breakpoints.up('sm' as Breakpoint)]: {
    transformOrigin: 'inherit',
    maxHeight: 'calc( 100vh - 72px - 12px )',
    borderRadius: '12px !important',
    width: isWide ? '320px' : '288px',
    marginTop: '-2px',
  },

  [theme.breakpoints.up('md' as Breakpoint)]: {
    maxHeight: 'calc( 100vh - 80px - 12px )',
  },
}));

export interface MenuLinkItemProps extends Omit<LinkProps, 'component'> {
  component?: string;
}

export const MenuLinkItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'component',
})<MenuLinkItemProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `0 ${theme.spacing(3)}`,
  height: '48px',
  textDecoration: 'none',
  color: 'inherit',
}));

export interface MenuItemLabelProps extends Omit<MUIListItemProps, 'variant'> {
  variant?: 'xs' | 'md' | 'lg';
}

export const MenuItemLabel = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<MenuItemLabelProps>(({ variant, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: variant === 'xs' ? '198px' : variant === 'md' ? '232px' : '260px',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    maxWidth: variant === 'xs' ? '168px' : variant === 'md' ? '194px' : '244px',
  },
}));

export const MenuItemText = styled('span')({});

export const MenuHeaderAppWrapper = styled(ListItem)<MUIListItemProps>(
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
    marginTop: '0px',
    height: MenuLabelHeight,
    padding: '0px',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      paddingLeft: '0px',
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
