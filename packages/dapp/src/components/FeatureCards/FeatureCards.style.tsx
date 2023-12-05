import { Box, BoxProps } from '@mui/material';

import { styled } from '@mui/material/styles';

export const FeatureCardsContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  right: '0',
  width: '408px',
  padding: '12px',
  bottom: '0',
  zIndex: 2,
}));
