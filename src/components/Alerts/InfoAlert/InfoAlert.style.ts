import type { BoxProps, Breakpoint } from '@mui/material';
import { Box } from '@mui/material';

import { styled } from '@mui/material/styles';
import { InfoMessageCard } from '../../MessageCard/';

export const InfoAlertContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  position: 'fixed',
  left: 0,
  padding: theme.spacing(1.5),
  bottom: 0,
  zIndex: 2,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    width: 'auto',
  },
}));

export const InfoAlertCard = styled(InfoMessageCard)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#EBF3FF' : '#00317A', //todo: add to theme
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    width: 384,
  },
}));
