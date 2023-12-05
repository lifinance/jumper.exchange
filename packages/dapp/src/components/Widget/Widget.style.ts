import { Box, BoxProps, styled } from '@mui/material';

export interface WidgetWrapperProps extends Omit<BoxProps, 'component'> {
  welcomeScreenClosed: boolean;
}

export const WidgetWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'welcomeScreenClosed',
})<WidgetWrapperProps>(({ theme, welcomeScreenClosed }) => ({
  minWidth: '392px',
  position: 'relative',
  margin: ' 0 auto',

  ...(!welcomeScreenClosed && {
    '&:hover': {
      marginTop: 0,
    },

    iframe: {
      ...(!welcomeScreenClosed && { pointerEvents: 'none' }),
    },
  }),
  zIndex: 2,
}));

export const GlowBackground = styled('span')(({ theme }) => ({
  position: 'absolute',
  opacity: 0,
  zIndex: -1,
  minWidth: '440px',
  minHeight: '440px',
  width: '50vw',
  height: '50vw',
  transform: 'translateX(-50%)',
  left: '50%',
  top: '80px',
}));
