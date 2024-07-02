import { usePartnerTheme } from '@/hooks/usePartnerTheme';
import type { Breakpoint } from '@mui/material';
import { useTheme } from '@mui/material';
import { darkTheme } from 'src/theme';
import type { PartnerTheme } from 'src/types/strapi';

export const useWidgetTheme = (): PartnerTheme => {
  const theme = useTheme();
  const { activeUid, isSuccess, currentWidgetTheme } = usePartnerTheme();
  const defaultWidgetTheme = {
    config: {
      appearance: theme.palette.mode,
      theme: {
        typography: {
          fontFamily: theme.typography.fontFamily,
        },
        container: {
          borderRadius: '12px',
          maxWidth: '100%',
          [theme.breakpoints.up('sm' as Breakpoint)]: {
            borderRadius: '12px',
            maxWidth: 416,
            minWidth: 416,
            boxShadow:
              theme.palette.mode === 'light'
                ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)'
                : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)',
          },
        },
        shape: {
          borderRadius: 12,
          borderRadiusSecondary: 24,
        },
        palette: {
          background: {
            paper: theme.palette.surface2.main,
            default: theme.palette.surface1.main,
          },
          primary: {
            main: theme.palette.accent1.main,
          },
          secondary: {
            // FIXME: we need to find out how to use the correct color from the main theme config
            main: darkTheme.palette.accent2.main,
          },
          grey: theme.palette.grey,
        },
      },
    },
  };

  if (!!activeUid && isSuccess && !!currentWidgetTheme) {
    return currentWidgetTheme;
  } else {
    return defaultWidgetTheme;
  }
};
