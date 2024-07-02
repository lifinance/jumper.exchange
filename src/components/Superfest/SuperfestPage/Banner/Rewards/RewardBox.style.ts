import type { Breakpoint } from '@mui/material';
import { Box, styled } from '@mui/material';

export const RewardTopBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    justifyContent: 'center',
  },
}));
