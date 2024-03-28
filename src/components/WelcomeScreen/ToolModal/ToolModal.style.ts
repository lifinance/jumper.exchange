'use client';
import type {
  AppBarProps,
  BoxProps,
  Breakpoint,
  GridProps,
} from '@mui/material';
import { AppBar, Box, Grid } from '@mui/material';

import { alpha, styled } from '@mui/material/styles';

export interface ModalContainerProps extends Omit<BoxProps, 'component'> {
  component?: string;
}

export const ModalContainer = styled(Box)<ModalContainerProps>(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: 'auto',
  paddingBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)'
      : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)',
  width: `calc( 100% - ${theme.spacing(3)})`,
  maxWidth: 640,
  maxHeight: '85%',
  overflowY: 'auto',
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.surface2.main
      : theme.palette.surface1.main,
  '&:focus-visible': {
    outline: 0,
  },

  [theme.breakpoints.up('md' as Breakpoint)]: {
    margin: 0,
    width: 640,
  },
}));

export const ModalContent = styled(Grid)<GridProps>(({ theme }) => ({
  alignItems: 'center',
  gap: '26px',
  padding: theme.spacing(0, 3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md' as Breakpoint)]: {
    justifyContent: 'inherit',
  },
}));

export interface ModalHeaderAppBarProps extends Omit<AppBarProps, 'component'> {
  component?: string;
}

export const ModalHeaderAppBar = styled(AppBar)<ModalHeaderAppBarProps>(
  ({ theme }) => ({
    zIndex: 1500,
    left: 'initial',
    right: 'initial',
    position: 'sticky',
    color: theme.palette.text.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
    top: 0,
    padding: theme.spacing(1.5, 3),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.surface2.main, 0.2)
        : alpha(theme.palette.surface1.main, 0.84),
    backdropFilter: 'blur(12px)',
    boxShadow: 'unset',
    backgroundImage: 'unset',

    '@supports ( -moz-appearance:none )': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.surface2.main
          : theme.palette.surface1.main,
    },
  }),
);

export const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
}));
