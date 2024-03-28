'use client';

import { Badge, Button, Container, darken, styled } from '@mui/material';

export const ConnectButton = styled(Button)(({ theme }) => ({
  boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.04)',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: ' 1 0 0',
  cursor: 'pointer',
  backgroundColor: theme.palette.surface2.main,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.alphaLight300.main
        : darken(theme.palette.white.main, 0.08),
  },
  width: 158,
  height: 166,
  textTransform: 'none',
}));

export const ConnectButtonContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: '12px',
  background: theme.palette.surface1.main,
  margin: '0 0 12px 0 !important',
  padding: '0 12px !important',
}));

export const EcoSystemSelectBadge = styled(Badge)(({ theme }) => ({
  borderRadius: '50%',
  // overflow: 'hidden',
  '> .MuiAvatar-root': {
    overflow: 'hidden',
    '--g': '#0000 98%,#000',
    '--s': '100% 100% no-repeat',
    '--mask':
      'radial-gradient(circle 23px at calc(100% - 12.5px) calc(100% - 12.5px),var(--g)) 100% 100%/var(--s)',
    mask: 'var(--mask)',
  },
}));
