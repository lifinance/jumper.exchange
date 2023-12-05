import type { CSSObject, TypographyTypeMap } from '@mui/material';
import { Box, Typography, useTheme } from '@mui/material';
import type { ReactNode } from 'react';
import { SpotButton as SpotButtonStyled } from './SpotButton.style';

interface SpotButtonProps {
  name?: string;
  variant?: string;
  onClick: any;
  typography?: TypographyTypeMap['props']['variant'];
  children: ReactNode;
  styles?: CSSObject;
}

export const SpotButton = ({
  children,
  name,
  variant,
  typography,
  onClick,
  styles,
}: SpotButtonProps) => {
  const theme = useTheme();

  return (
    <Box textAlign={'center'} sx={{ ...styles }}>
      <SpotButtonStyled variant={variant} onClick={onClick}>
        {children}
      </SpotButtonStyled>
      {!!name ? (
        <Typography
          mt={theme.spacing(1)}
          sx={{
            overflow: 'hidden',
            fontSize: '12px',
            textOverflow: 'ellipsis',
            margin: '8px auto 0',
            userSelect: 'none',
          }}
          variant={typography || 'lifiBodySmall'}
        >
          {name}
        </Typography>
      ) : null}
    </Box>
  );
};
