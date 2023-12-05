import type { IconButtonProps } from '@mui/material';
import { IconButton } from '@mui/material';
import type { Breakpoint } from '@mui/material/styles';
import { darken, styled } from '@mui/material/styles';
import { getContrastAlphaColor } from '../../utils';

export interface SpotButtonProps extends Omit<IconButtonProps, 'variant'> {
  variant?: string;
}

export const SpotButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<SpotButtonProps>(({ theme, variant }) => ({
  color: theme.palette.text.primary,
  width: '72px',
  height: '72px',
  margin: 'auto',
  backgroundColor:
    variant === 'primary' && theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : variant === 'primary' && theme.palette.mode === 'light'
      ? theme.palette.secondary.main
      : theme.palette.mode === 'dark'
      ? getContrastAlphaColor(theme, '12%')
      : getContrastAlphaColor(theme, '4%'),
  '&:hover': {
    backgroundColor:
      variant === 'primary' && theme.palette.mode === 'dark'
        ? 'rgb(80, 47, 130)'
        : variant === 'primary' && theme.palette.mode === 'light'
        ? darken(theme.palette.secondary.main, 0.08)
        : theme.palette.mode === 'dark'
        ? theme.palette.alphaLight300.main
        : darken(theme.palette.white.main, 0.08),
  },
  '&:hover:before': {
    content: '" "',
    position: 'absolute',
    borderRadius: '50%',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: 'background-color 250ms',
    background: getContrastAlphaColor(theme, '4%'),
  },
  [theme.breakpoints.up('lg' as Breakpoint)]: {
    display: 'flex',
  },
}));
