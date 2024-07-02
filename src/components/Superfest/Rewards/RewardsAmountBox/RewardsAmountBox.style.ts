import type { BoxProps } from '@mui/material';
import { Box, alpha, styled } from '@mui/material';

export const RewardsdMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
}));

export const RewardsRightBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));
