import type { IconButtonProps } from '@mui/material';
import { Box, IconButton } from '@mui/material';

import { getContrastAlphaColor } from '@/utils/colors';
import { styled } from '@mui/material/styles';

export const PaginationContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  padding: theme.spacing(1),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? getContrastAlphaColor(theme, '12%')
      : getContrastAlphaColor(theme, '4%'),
  borderRadius: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  marginTop: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

export interface PaginationIndexButtonProps
  extends Omit<IconButtonProps, 'isDarkMode' | 'isWide' | 'component'> {
  active: boolean;
}

export const PaginationIndexButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<PaginationIndexButtonProps>(({ theme, active }) => ({
  ...(active
    ? {
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.white.main
            : getContrastAlphaColor(theme, '12%'),
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[300],
      }
    : {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[400],
      }),
  width: 40,
  height: 40,
  ...(active && {
    '& .MuiTouchRipple-root': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.alphaDark100.main
          : theme.palette.alphaLight300.main,
      zIndex: -1,
    },
  }),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? getContrastAlphaColor(theme, '4%')
        : getContrastAlphaColor(theme, '32%'),
  },
}));

export const PaginationButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[500],
  width: 40,
  height: 40,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? getContrastAlphaColor(theme, '12%')
        : getContrastAlphaColor(theme, '4%'),
  },
}));
