import type { Breakpoint, IconButtonProps } from '@mui/material';
import { Grid, IconButton } from '@mui/material';

import { getContrastAlphaColor } from '@/utils/colors';
import { styled } from '@mui/material/styles';

export const BlogArticlesBoardContainer = styled(Grid)(({ theme }) => ({
  position: 'relative',
  margin: theme.spacing(6, 2),
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('lg' as Breakpoint)]: {
    margin: theme.spacing(8),
  },
}));

export const ArticlesGrid = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 'auto'),
  display: 'grid',
  marginTop: `calc(${theme.spacing(5)} + ${theme.spacing(8)} + ${theme.spacing(6)} )`, // title height + tabs container + actual offset
  paddingBottom: theme.spacing(13),
  gridTemplateColumns: '1fr',
  justifyItems: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.up('md' as Breakpoint)]: {
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(4),
  },
  [theme.breakpoints.up('lg' as Breakpoint)]: {
    maxWidth: 'fit-content',
    paddingBottom: theme.spacing(14.5),
  },
  [theme.breakpoints.up('xl' as Breakpoint)]: {
    gridTemplateColumns: '1fr 1fr 1fr',
    paddingBottom: theme.spacing(14.5),
    maxWidth: theme.breakpoints.values.xl,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
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
      theme.palette.mode === 'dark'
        ? getContrastAlphaColor(theme, '12%')
        : getContrastAlphaColor(theme, '4%'),
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
