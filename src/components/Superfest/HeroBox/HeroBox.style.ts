import { Box, Breakpoint, styled } from '@mui/material';

export const HeroMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    marginTop: '16px',
    marginBottom: '32px',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    marginTop: '16px',
  },
}));

export const HeroButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    marginTop: '16px',
  },
}));
