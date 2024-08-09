import { Box, alpha, styled } from '@mui/material';

export const LeaderboardSkeletonContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F3E0',
  height: 450,
  width: 288,
  textAlign: 'center',
  borderRadius: '8px',
  border: 16,
  borderColor:
    theme.palette.mode === 'light'
      ? '#ffffff'
      : alpha(theme.palette.white.main, 0.08),
}));
