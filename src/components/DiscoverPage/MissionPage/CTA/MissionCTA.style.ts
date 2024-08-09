import { sequel65, sora } from '@/fonts/fonts';
import type { BoxProps, Breakpoint } from '@mui/material';
import { Box, Typography, alpha, lighten, darken } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButtonPrimary } from 'src/components/IconButton';

export const MissionCtaContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(8),
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  overflow: 'hidden',
  textAlign: 'center',
  margin: theme.spacing(6, 0),
  transition: 'background-color 250ms',
  borderRadius: '16px',
  backgroundColor: '#69d7ff',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor:
      theme.palette.mode === 'light'
        ? darken('#69d7ff', 0.02) //todo: add to theme
        : alpha('#69d7ff', 0.16),
  },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    gap: theme.spacing(4),
    flexDirection: 'row',
  },
}));

export const SeveralMissionCtaContainer = styled(Box)<BoxProps>(
  ({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    mardingBottom: '16px',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    overflow: 'hidden',
    textAlign: 'center',
    transition: 'background-color 250ms',
    borderRadius: '16px',
    backgroundColor: '#fff0ca',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.palette.mode === 'light'
          ? darken('#fff0ca', 0.02) //todo: add to theme
          : alpha('#fff0ca', 0.16),
    },
    [theme.breakpoints.up('sm' as Breakpoint)]: {
      gap: theme.spacing(4),
      flexDirection: 'row',
    },
  }),
);

export const MissionCtaTitle = styled(Box)<BoxProps>(({ theme }) => ({
  fontFamily: sora.style.fontFamily,
  fontWeight: 700,
  color: theme.palette.black.main,
  fontSize: '32px',
  lineHeight: '38px',
  userSelect: 'none',

  [theme.breakpoints.up('sm' as Breakpoint)]: {
    fontSize: '40px',
    lineHeight: '56px',
    textDecoration: 'auto',
  },
}));

export const MissionCtaButton = styled(IconButtonPrimary)(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '32px',
  height: '32px',
  border: '2px dotted',
  borderColor: '#000000',
  ':hover': {
    backgroundColor: darken('#f9ebc5', 0.02),
  },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    display: 'flex',
  },
}));

export const CTABox = styled(Box)(({ theme }) => ({
  width: '80%',
  maxWidth: '1210px',
  display: 'flex',
  marginTop: '32px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
}));

export const SeveralCTABox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  marginTop: '32px',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    justifyContent: 'center',
  },
}));

export const StartedTitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: sequel65.style.fontFamily,
  [theme.breakpoints.down('md' as Breakpoint)]: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '14px',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '20px',
  },
}));

export const StartedTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  textAlign: 'left',
}));

export const CTAMainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  maxWidth: '1210px',
  marginTop: '64px',
  borderRadius: '8px',
  padding: '32px',
  backgroundColor: '#fdfbef',
}));

export const CTAExplanationBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('md' as Breakpoint)]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    textAlign: 'left',
  },
  [theme.breakpoints.up('md' as Breakpoint)]: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
}));
