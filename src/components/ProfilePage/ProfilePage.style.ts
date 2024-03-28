import { inter } from '@/fonts/fonts';
import type { TypographyProps } from '@mui/material';
import { Box, Container, Typography, alpha, styled } from '@mui/material';

export const ProfilePageContainer = styled(Container)(() => ({
  marginTop: 32,
  background: 'transparent',
  borderRadius: '8px',
  position: 'relative',
  width: '100% !important',
  overflow: 'hidden',
}));

export const ProfilePageHeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : alpha(theme.palette.grey[100], 0.08),
  height: '312px',
  borderRadius: '24px',
}));

export interface ProfilePageTypographyProps
  extends Omit<TypographyProps, 'component'> {
  fontSize: string | number;
  lineHeight: string;
  fontWeight?: number;
}

export const ProfilePageTypography = styled(
  Typography,
)<ProfilePageTypographyProps>(({ fontSize, fontWeight, lineHeight }) => ({
  fontFamily: inter.style.fontFamily,
  fontStyle: 'normal',
  fontSize: fontSize,
  fontWeight: fontWeight ?? 700,
  lineHeight: lineHeight,
  userSelect: 'none',
}));

export const CenteredBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
