import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { Button as MuiButton, alpha } from '@mui/material'; //ButtonProps
import { styled } from '@mui/material/styles';
import { getContrastAlphaColor } from '@transferto/shared/src/utils';

const ButtonBase = styled(MuiButton)<MuiButtonProps>(({ theme }) => ({
  height: '48px',
  borderRadius: '24px',
  fontSize: '16px',
  letterSpacing: '0',
  textTransform: 'none',
  fontWeight: 'bold',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.white.main
      : theme.palette.black.main,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : theme.palette.accent1.main,
  },
}));

export const ButtonPrimary = styled(ButtonBase)<MuiButtonProps>(
  ({ theme }) => ({
    color: theme.palette.white.main,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : theme.palette.accent1.main,
    ':hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgb(80, 47, 130)' : 'rgb(39, 0, 97)',
    },
  }),
);

export const ButtonSecondary = styled(ButtonBase)<MuiButtonProps>(
  ({ theme }) => ({
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.white.main
        : theme.palette.black.main,
    overflow: 'hidden',
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
  }),
);

export const ButtonTransparent = styled(ButtonBase)<MuiButtonProps>(
  ({ theme }) => ({
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.white.main
        : theme.palette.black.main,
    overflow: 'hidden',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.white.main, 0.12)
        : alpha(theme.palette.black.main, 0.08),
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.white.main, 0.16)
          : alpha(theme.palette.black.main, 0.12),
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
  }),
);
