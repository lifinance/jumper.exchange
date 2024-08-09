import type { Breakpoint } from '@mui/material';
import { Box, alpha, styled } from '@mui/material';

export const LeaderboardContainer = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.white.main, 0.48)
      : alpha(theme.palette.white.main, 0.12),
  borderRadius: '32px',
  width:'100%',
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0, 0),
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)'
      : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)',
}));