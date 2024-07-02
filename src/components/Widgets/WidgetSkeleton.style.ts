import type { Breakpoint } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { WidgetContainerBox } from './WidgetsContainer.style';

export const WidgetSkeletonContainer = styled(WidgetContainerBox)(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: 'unset',
    minHeight: 'unset',
    backgroundColor: theme.palette.surface1.main,
    boxShadow:
      theme.palette.mode === 'light'
        ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)'
        : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)',
    borderRadius: theme.shape.borderRadius,

    [theme.breakpoints.down('sm' as Breakpoint)]: {
      div: {
        width: '100%',
      },
    },

    '&:before': {
      display: 'none',
    },
    '& .widget-wrapper > div:before': {
      display: 'none',
    },
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      maxWidth: 416,
    },
  }),
);
