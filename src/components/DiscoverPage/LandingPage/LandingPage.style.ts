import { Box, Typography, styled } from '@mui/material';
import { sequel65, sequel85, sora } from 'src/fonts/fonts';

export const SuperfestContainer = styled(Box)(() => ({
  background: 'transparent',
  position: 'relative',
  width: '100% !important',
  overflow: 'hidden',
  paddingBottom: 20,
}));

export const CenteredBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const FlexSpaceBetweenBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const SuperfestMainBox = styled(Box)(() => ({
  minWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
}));

export const SoraTypography = styled(Typography)(() => ({
  fontFamily: sora.style.fontFamily,
}));

export const Sequel85Typography = styled(Typography)(() => ({
  fontFamily: sequel85.style.fontFamily,
}));

export const Sequel65Typography = styled(Typography)(() => ({
  fontFamily: sequel65.style.fontFamily,
}));
