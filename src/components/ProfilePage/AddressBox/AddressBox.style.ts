import type { IconButtonProps } from '@mui/material';
import { Box, IconButton, alpha, styled } from '@mui/material';

export const ProfileIconButton = styled(IconButton)<IconButtonProps>(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : alpha(theme.palette.grey[200], 0.08),
    color:
      theme.palette.mode === 'light'
        ? theme.palette.black.main
        : theme.palette.grey[100],
    width: '32px',
    height: '32px',
    marginLeft: 8,
  }),
);

export const BackgroundBox = styled(Box)(({ theme }) => ({
  height: '50%',
  backgroundColor: theme.palette.mode === 'light' ? '#31007A' : '#BEA0EB',
  borderTopLeftRadius: '24px',
  borderTopRightRadius: '24px',
}));

export const AddressDisplayBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50%',
  marginTop: 4,
}));

export const PassImageBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  bottom: '75%',
}));
