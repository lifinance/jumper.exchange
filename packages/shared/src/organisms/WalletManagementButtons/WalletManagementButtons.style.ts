import { Avatar } from '@mui/material';
import type { Breakpoint } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export const WalletMgmtAvatarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: '12px',
}));

export const WalletMgmtWalletAvatar = styled(Avatar)(({ theme }) => ({
  background:
    theme.palette.mode === 'light' ? 'transparent' : theme.palette.white.main,
  height: '32px',
  width: '32px',
  padding: '4px',
  mr: '8px',
  ml: '2px',
  [theme.breakpoints.up('md' as Breakpoint)]: {
    mr: '0px',
    ml: '0px',
  },
  [theme.breakpoints.up('lg' as Breakpoint)]: {
    mr: '8px',
    ml: '2px',
  },
}));

export const WalletMgmtChainAvatar = styled(Avatar)(({ theme }) => ({
  height: '20px',
  width: '20px',
  position: 'absolute',
  padding: '4px',
  right: '-10px',
  borderRadius: '10px',
  bottom: '-6px',
  background: 'white',
  img: {
    borderRadius: '6px',
  },
}));
