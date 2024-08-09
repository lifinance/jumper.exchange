import { Box, styled } from '@mui/material';

export const NFTCardMainBox = styled(Box)(({ theme }) => ({
  width: '288px',
  height: '344px',
  justifyContent: 'center',
  alignContent: 'center',
}));

export const NFTCardBotomBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff0ca',

  height: '72px',
  justifyContent: 'center',
  alignContent: 'center',
  textAlign: 'center',
  borderBottomRightRadius: '8px',
  borderBottomLeftRadius: '8px',
  marginTop: '-6px',
}));
