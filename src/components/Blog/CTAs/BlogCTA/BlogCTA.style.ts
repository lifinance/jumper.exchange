import type { BoxProps, Breakpoint } from '@mui/material';
import { Box, alpha, darken } from '@mui/material';

import { urbanist } from '@/fonts/fonts';
import { styled } from '@mui/material/styles';

export const BlogCtaContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(8),
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  overflow: 'hidden',
  textAlign: 'center',
  margin: theme.spacing(6, 0),
  transition: 'background-color 250ms',
  borderRadius: '16px',
  backgroundColor:
    theme.palette.mode === 'light'
      ? '#F9F5FF' //todo: add to theme
      : alpha(theme.palette.white.main, 0.08),
  '&:hover': {
    cursor: 'pointer',
    backgroundColor:
      theme.palette.mode === 'light'
        ? darken('#F9F5FF', 0.02) //todo: add to theme
        : alpha(theme.palette.white.main, 0.16),
  },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    gap: theme.spacing(4),
    flexDirection: 'row',
  },
}));

export const BlogCtaTitle = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: urbanist.style.fontFamily,
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '38px',
  userSelect: 'none',

  [theme.breakpoints.up('sm' as Breakpoint)]: {
    fontSize: '40px',
    lineHeight: '56px',
    textDecoration: 'auto',
  },
}));
