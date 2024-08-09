import { Box, type Breakpoint, Typography, styled } from '@mui/material';
import { sequel85 } from 'src/fonts/fonts';

export const BackButtonMainBox = styled(Box)(({ theme }) => ({
  width: '80%',
  maxWidth: '1210px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  alignContent: 'center',
  alignItems: 'center',
  marginBottom: '16px',
}));

export const ButtonTypography = styled(Typography)(({ theme }) => ({
  marginLeft: '4px',
  fontSize: '14px',
  typography: sequel85.style.fontFamily,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 232,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    maxWidth: 168,
  },
}));
