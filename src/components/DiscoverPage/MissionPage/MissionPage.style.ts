import { Box, styled } from '@mui/material';

export const SuperfestPageElementContainer = styled(Box)(({ theme }) => ({
  width: '80%',
  maxWidth: '960px',
  display: 'flex',
  marginTop: '64px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  textAlign: 'left',
  overflow: 'hidden',
}));

export const LeftTextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  textAlign: 'left',
}));

export const SuperfestPageMainBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
}));

export const FlexCenterRowBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
}));

export const FlexCenterSpaceRowBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
}));
