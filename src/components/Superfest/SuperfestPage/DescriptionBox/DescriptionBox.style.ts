import type { Breakpoint } from '@mui/material';
import { Typography, styled } from '@mui/material';
import { sequel65, sequel85 } from 'src/fonts/fonts';

export const DescriptionTitleTypography = styled(Typography)(({ theme }) => ({
  typography: sequel65.style.fontFamily,
  [theme.breakpoints.down('md' as Breakpoint)]: {
    fontSize: '32px',
    fontWeight: 700,
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    fontSize: '48px',
    fontWeight: 700,
  },
}));
