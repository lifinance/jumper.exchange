'use client';

import { ButtonPrimary, ButtonTransparent } from '@/components/Button';
import { avatarMask12 } from '@/components/Mask.style';
import { getContrastAlphaColor } from '@/utils/colors';
import { Avatar, Badge } from '@mui/material';
import type { Breakpoint } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export const WalletMgmtAvatarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(1.5),
}));

export const WalletMgmtWalletAvatar = styled(Avatar)(() => ({
  height: 32,
  width: 32,
}));

export const ConnectButton = styled(ButtonPrimary)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    padding: theme.spacing(3),
    display: 'inline-flex !important',
  },
}));

export const WalletMenuButton = styled(ButtonTransparent)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingRight: theme.spacing(1.5),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.alphaLight300.main
      : theme.palette.white.main,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.alphaLight300.main
        : theme.palette.white.main,
  },
  '&:hover:before': {
    content: '" "',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: 'background-color 250ms',
    background: getContrastAlphaColor(theme, '4%'),
  },
}));

export const WalletMgmtBadge = styled(Badge)(({ theme }) => ({
  borderRadius: '50%',
  // overflow: 'hidden',
  '> .MuiAvatar-root': {
    mask: avatarMask12,
  },
}));

export const WalletMgmtChainAvatar = styled(Avatar)(({ theme }) => ({
  width: 16,
  height: 16,
  border: '2px solid transparent',
  background: 'transparent',
  left: 2.5,
  top: 2.5,
  img: {
    borderRadius: '50%',
  },
}));
