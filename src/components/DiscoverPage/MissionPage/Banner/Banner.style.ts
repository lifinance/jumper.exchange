import type { BoxProps, Breakpoint } from '@mui/material';
import { Box, Typography, alpha, styled } from '@mui/material';
import { sequel65 } from 'src/fonts/fonts';

export const BannerMainBox = styled(Box)(({ theme }) => ({
  width: '80%',
  maxWidth: '1210px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor:
    theme.palette.mode === 'light'
      ? '#FFFFFF'
      : alpha(theme.palette.white.main, 0.08),
  textAlign: 'center',
  overflow: 'hidden',
  borderRadius: '8px',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    height: '900px',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    height: '620px',
  },
}));

export const BannerBottomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '32px',
  backgroundColor: '#fdfbef',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    height: '55%',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    height: '35%',
  },
}));

export const BannerTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    textAlign: 'center',
    marginTop: '16px',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    justifyContent: 'space-between',
    textAlign: 'left',
  },
}));

export interface BannerInfoBoxProps extends Omit<BoxProps, 'component'> {
  points?: number;
}

export const BannerInfoBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'points',
})<BannerInfoBoxProps>(({ points }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const QuestDatesBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.black.main, 0.04)
      : theme.palette.alphaLight300.main,
  paddingTop: '4px',
  paddingBottom: '4px',
  paddingLeft: '8px',
  paddingRight: '8px',
  borderRadius: '128px',
  justifyContent: 'center',
}));

export const SuperfestPageMainBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
}));

export const BannerImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  flexGrow: 1,
}));

export const DateChainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    flexDirection: 'column',
    gap: '8px',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    flexDirection: 'row',
  },
}));

export const SupportedChainsBox = styled(Box)(() => ({
  display: 'flex',
  alignContent: 'flex-start',
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

export const RewardBottomBox = styled(Box)(() => ({
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'row',
  textAlign: 'center',
  alignContent: 'center',
  alignItems: 'center',
}));

export const RewardMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    gap: '16px',
    alignItems: 'left',
    alignContent: 'flex-start',
    textAlign: 'left',
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    flexDirection: 'row',
    alignContent: 'center',
  },
}));

export const BannerTitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: sequel65.style.fontFamily,
  [theme.breakpoints.down('md' as Breakpoint)]: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: '32px',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '48px',
  },
}));

export const BannerLabelBox = styled(Box)(({ theme }) => ({
  border: '2px dotted',
  borderColor: '#000000',
  borderRadius: '8px',
  padding: '8px',
  zindex: 100,
  backgroundColor: 'red',
  animation: 'spin 30s linear infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(360deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },
}));

export const RotatingBox = styled(Box)(() => ({
  animation: 'spin 120s linear infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

export const BadgeRelativeBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  left: '5%',
  bottom: '42px',
}));

export const BadgeMainBox = styled(Box)(() => ({
  height: '1px',
  width: '80%',
  maxWidth: '1210px',
  display: 'flex',
  justifyContent: 'flex-end',
  top: '32px',
  left: '32px',
  zIndex: 500,
}));
