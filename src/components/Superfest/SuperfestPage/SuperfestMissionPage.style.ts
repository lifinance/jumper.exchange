import type { BoxProps } from '@mui/material';
import { Box, alpha, styled } from '@mui/material';

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
  height: '550px',
  textAlign: 'center',
  overflow: 'hidden',
  borderRadius: '8px',
}));

export const DescriptionBox = styled(Box)(({ theme }) => ({
  width: '80%',
  display: 'flex',
  marginTop: '64px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  textAlign: 'left',
  overflow: 'hidden',
}));

export const InformationBox = styled(Box)(({ theme }) => ({
  width: '80%',
  display: 'flex',
  marginTop: '32px',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  border: '2px solid',
  padding: '32px',
  borderRadius: '24px',
  borderColor: '#000000',
}));

export const BannerBottomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
  padding: '32px',
  backgroundColor: '#fdfbef',
}));

export const BannerTitleBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
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

export const CompletedBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#d6ffe7',
  borderRadius: '128px',
  padding: '4px',
  width: '50%',
}));

export interface QuestPlatformMainBoxProps extends Omit<BoxProps, 'component'> {
  platformName?: string;
}

export const QuestPlatformMainBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'platformName',
})<QuestPlatformMainBoxProps>(({ platformName }) => ({
  display: 'flex',
  justifyContent: platformName ? 'space-between' : 'flex-end',
  alignItems: 'center',
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

export interface XPDisplayBoxProps extends Omit<BoxProps, 'component'> {
  active?: boolean;
}

export const XPDisplayBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<XPDisplayBoxProps>(({ active }) => ({
  width: '54px',
  marginRight: active ? '8px' : undefined,
  display: 'flex',
  height: '24px',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '128px',
  padding: '8px',
  backgroundColor: '#ff0420',
}));
