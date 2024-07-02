import { Box, styled } from '@mui/material';

export const InformationBox = styled(Box)(({ theme }) => ({
  width: '80%',
  display: 'flex',
  marginTop: '32px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  border: '2px solid',
  padding: '32px',
  borderRadius: '24px',
  borderColor: '#000000',
}));
