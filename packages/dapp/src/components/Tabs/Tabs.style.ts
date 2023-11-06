import {
  Breakpoint,
  CSSObject,
  Tab as MuiTab,
  TabProps as MuiTabProps,
  TabsProps as MuiTabsProps,
  Tabs,
  styled,
} from '@mui/material';
import { getContrastAlphaColor } from '@transferto/shared/src/utils';

interface TabsStyles {
  styles?: CSSObject;
  ['.MuiTabs-indicator']?: CSSObject;
  div?: CSSObject;
  breakpointMd?: CSSObject;
}

export interface TabsProps extends Omit<MuiTabsProps, 'variant'> {
  styles?: TabsStyles;
}

export const TabsContainer = styled(Tabs, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<TabsProps>(({ theme, styles }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? getContrastAlphaColor(theme, '12%')
      : getContrastAlphaColor(theme, '4%'),
  margin: 'auto',
  padding: 1,
  alignItems: 'center',
  [theme.breakpoints.up('md' as Breakpoint)]: {
    ...styles?.breakpointMd,
  },
  div: {
    ...styles?.div,
  },
  '.MuiTabs-flexContainer': {
    alignItems: 'center',
  },
  '.MuiTabs-indicator': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) scaleY(0.98)',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.alphaLight300.main
        : theme.palette.white.main,
    zIndex: '-1',
    ...styles?.['.MuiTabs-indicator'],
  },
  '> .MuiTabs-root': {
    minHeight: 'unset !important',
  },
  '.MuiTabs-root': {
    minHeight: 'unset !important',
  },
  ...styles?.styles,
}));

export interface TabProps extends Omit<MuiTabProps, 'variant'> {
  styles?: CSSObject;
}

export const Tab = styled(MuiTab, {
  shouldForwardProp: (prop) => prop !== 'styles',
})<TabProps>(({ theme, styles }) => ({
  textTransform: 'initial',
  letterSpacing: 0,
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '6px 4px',
  background: 'transparent',
  minHeight: 'unset',
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.white.main
      : theme.palette.black.main,
  textDecoration: 'none',
  '&.Mui-selected': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.white.main
        : theme.palette.black.main,
    backgroundColor: 'transparent',
  },

  ':hover': {
    backgroundColor: getContrastAlphaColor(theme, '4%'),
  },
  ...styles,
}));
