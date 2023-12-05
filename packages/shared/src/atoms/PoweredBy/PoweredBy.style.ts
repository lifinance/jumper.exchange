import { styled, type BoxProps } from '@mui/material';

export interface ContainerProps extends Omit<BoxProps, 'variant'> {
  variant?: 'xs' | 'md' | 'lg';
  cardsLayout?: boolean;
}
//, {  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'cardsLayout',}
export const Container = styled('div')<ContainerProps>(({ theme }) => ({
  position: 'fixed',
  bottom: '22px',
  right: '24px',
  display: 'block',
  zIndex: '1',

  '.link-lifi': {
    fontWeight: '700',
    color:
      theme.palette.mode === 'light'
        ? theme.palette.accent1.main
        : theme.palette.accent1Alt.main,
    textDecoration: 'none',
  },
}));
