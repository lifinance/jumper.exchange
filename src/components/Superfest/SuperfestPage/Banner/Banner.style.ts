import type { BoxProps, Breakpoint } from '@mui/material';
import { Box, Typography, alpha, styled } from '@mui/material';
import { sequel65, sequel85 } from 'src/fonts/fonts';

export const BannerMainBox = styled(Box)(({ theme }) => ({
  width: '80%',
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
    height: '850px',
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
    height: '60%',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    height: '40%',
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
  marginLeft: '8px',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const RewardLeftBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
  alignContent: 'center',
  ml: '20px',
}));

export const RewardMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '16px',
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
  typography: sequel65.style.fontFamily,
  [theme.breakpoints.down('md' as Breakpoint)]: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '48px',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    fontSize: '56px',
    fontWeight: 700,
    lineHeight: '96px',
  },
}));
