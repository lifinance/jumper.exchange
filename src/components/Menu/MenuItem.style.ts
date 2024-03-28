'use client';
import type {
  ListItemProps,
  MenuItemProps as MUIMenuItemProps,
} from '@mui/material';
import { MenuItem as MUIMenuItem } from '@mui/material';

import { getContrastAlphaColor } from '@/utils/colors';
import type { Breakpoint } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import type { ElementType } from 'react';

export interface MenuItemProps extends Omit<MUIMenuItemProps, 'showButton'> {
  showButton?: boolean;
  component?: ElementType<any>;
}

export const MenuItemContainer = styled(MUIMenuItem, {
  shouldForwardProp: (prop) => prop !== 'showButton' && prop !== 'component',
})<MenuItemProps>(({ theme, showButton }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'inherit',
  padding: showButton ? theme.spacing(0, 1.5, 1.5) : theme.spacing(0, 1.5),
  backgroundColor: 'inherit',
  justifyContent: 'space-between',
  margin: theme.spacing(0, 1.5),
  height: showButton ? 'auto' : 48,
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
    height: showButton ? 'auto' : 48,
  },
}));

export interface MenuLabelProps extends Omit<ListItemProps, 'variant'> {
  variant?: 'xs' | 'md' | 'lg';
}

export const MenuLabel = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<MenuLabelProps>(({ variant, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: variant === 'xs' ? 198 : variant === 'md' ? 232 : 260,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    maxWidth: variant === 'xs' ? 168 : variant === 'md' ? 194 : 244,
  },
}));
