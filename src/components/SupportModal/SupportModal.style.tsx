'use client';

import { HeaderHeight } from '@/const/headerHeight';
import { Box, Modal as MUIModal } from '@mui/material';
import type { Breakpoint } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export const Modal = styled(MUIModal)(({ theme }) => ({
  paddingTop: HeaderHeight.XS,
  zIndex: 1500,
  overflow: 'auto',
}));

export const SupportModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  top: `calc( ${HeaderHeight.XS} + ${theme.spacing(1.5)} )`,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    top: HeaderHeight.SM,
    width: '100%',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    width: '50%',
    maxHeight: `calc( 100vh - ${HeaderHeight.MD} - ${theme.spacing(2)} )`,
    overflow: 'auto',
    borderRadius: '12px',
    top: HeaderHeight.MD,
  },
}));
