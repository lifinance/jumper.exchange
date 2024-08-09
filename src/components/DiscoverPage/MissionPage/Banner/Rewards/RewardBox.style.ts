import { Box, styled } from '@mui/material';

export const RewardTopBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
}));

export const RewardSubtitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  textAlign: 'left',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
}));
