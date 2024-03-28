import { urbanist } from '@/fonts/fonts';
import type { Breakpoint } from '@mui/material';
import { Typography, styled } from '@mui/material';

export const CustomColor = styled(Typography)(({ theme }) => ({
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(90deg, #FFF 25%, #BEA0EB 50%, #D35CFF 75%)'
      : 'linear-gradient(90deg, #31007A 10%, #D35CFF 100%);',
  backgroundClip: 'text',
  margin: 0,
  fontFamily: urbanist.style.fontFamily,
  fontSize: '48px',
  fontWeight: 700,
  lineHeight: '56px',
  textFillColor: 'transparent',
  userSelect: 'none',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    fontSize: '64px',
    lineHeight: '72px',
  },
}));
