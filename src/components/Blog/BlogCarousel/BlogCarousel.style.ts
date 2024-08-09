import type { BoxProps, Breakpoint } from '@mui/material';
import { Box, alpha, styled } from '@mui/material';
import { ButtonPrimary } from '../../Button';

export const BlogCarouselContainer = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.white.main, 0.48)
      : alpha(theme.palette.white.main, 0.12),
  borderRadius: '32px',
  padding: theme.spacing(2),
  margin: theme.spacing(6, 2, 0),
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)'
      : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    margin: theme.spacing(2, 8, 0),
    padding: theme.spacing(3),
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    padding: theme.spacing(4),
    margin: theme.spacing(12, 8, 0),
  },
  [theme.breakpoints.up('lg' as Breakpoint)]: {
    padding: theme.spacing(6),
  },
  [theme.breakpoints.up('xl' as Breakpoint)]: {
    margin: `${theme.spacing(12, 'auto', 0)}`,
    maxWidth: theme.breakpoints.values.xl,
  },
}));

export interface SeeAllButtonContainerProps
  extends Omit<BoxProps, 'component'> {
  show: boolean;
}

export const SeeAllButtonContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'show',
})<SeeAllButtonContainerProps>(({ theme, show }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: show ? theme.spacing(2) : 0,
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    marginTop: theme.spacing(4),
  },
  [theme.breakpoints.up('lg' as Breakpoint)]: {
    marginTop: theme.spacing(6),
  },
}));

export const SeeAllButton = styled(ButtonPrimary)(({ theme }) => ({
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.white.main
      : theme.palette.black.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.alphaDark100.main
      : theme.palette.alphaLight400.main,
  width: 320,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.alphaDark200.main
        : theme.palette.alphaLight500.main,
  },
}));
