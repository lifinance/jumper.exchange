'use client';
import { inter, roboto_mono } from '@/fonts/fonts';
import type { Breakpoint, Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import type React from 'react';

declare module '@mui/material/styles' {
  interface Shape {
    borderRadius: number;
    borderRadiusSecondary: number;
  }

  interface Theme {
    shape: Shape;
  }

  interface ThemeOptions {
    shape?: Partial<Shape>;
  }
  interface Palette {
    tertiary: Palette['primary'];
    white: Palette['primary'];
    black: Palette['primary'];
    accent1: Palette['primary'];
    accent1Alt: Palette['primary'];
    accent2: Palette['primary'];
    surface1: Palette['primary'];
    surface2: Palette['primary'];
    surface3: Palette['primary'];
    templateBg: Palette['primary'];
    templateOutline: Palette['primary'];
    dataBg: Palette['primary'];
    dataOutline: Palette['primary'];
    bg: Palette['primary'];
    shadow: Palette['primary'];
    alphaDark100: Palette['primary'];
    alphaDark200: Palette['primary'];
    alphaDark300: Palette['primary'];
    alphaDark400: Palette['primary'];
    alphaDark500: Palette['primary'];
    alphaDark600: Palette['primary'];
    alphaDark700: Palette['primary'];
    alphaDark800: Palette['primary'];
    alphaLight100: Palette['primary'];
    alphaLight200: Palette['primary'];
    alphaLight300: Palette['primary'];
    alphaLight400: Palette['primary'];
    alphaLight500: Palette['primary'];
    alphaLight600: Palette['primary'];
    alphaLight700: Palette['primary'];
    alphaLight800: Palette['primary'];
    pink: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
    black?: PaletteOptions['primary'];
    accent1?: PaletteOptions['primary'];
    accent1Alt?: PaletteOptions['primary'];
    accent2?: PaletteOptions['primary'];
    surface1?: PaletteOptions['primary'];
    surface2?: PaletteOptions['primary'];
    surface3?: PaletteOptions['primary'];
    templateBg?: Palette['primary'];
    templateOutline?: Palette['primary'];
    dataBg?: Palette['primary'];
    dataOutline?: Palette['primary'];
    bg?: PaletteOptions['primary'];
    shadow?: PaletteOptions['primary'];
    alphaDark100?: PaletteOptions['primary'];
    alphaDark200?: PaletteOptions['primary'];
    alphaDark300?: PaletteOptions['primary'];
    alphaDark400?: PaletteOptions['primary'];
    alphaDark500?: PaletteOptions['primary'];
    alphaDark600?: PaletteOptions['primary'];
    alphaDark700?: PaletteOptions['primary'];
    alphaDark800?: PaletteOptions['primary'];
    alphaLight100?: PaletteOptions['primary'];
    alphaLight200?: PaletteOptions['primary'];
    alphaLight300?: PaletteOptions['primary'];
    alphaLight400?: PaletteOptions['primary'];
    alphaLight500?: PaletteOptions['primary'];
    alphaLight600?: PaletteOptions['primary'];
    alphaLight700?: PaletteOptions['primary'];
    alphaLight800?: PaletteOptions['primary'];
    pink: Palette['primary'];
  }
  interface TypographyVariants {
    lifiHeaderDisplay: React.CSSProperties;
    lifiHeaderXLarge: React.CSSProperties;
    lifiHeaderLarge: React.CSSProperties;
    lifiHeaderMedium: React.CSSProperties;
    lifiHeaderSmall: React.CSSProperties;
    lifiHeaderXSmall: React.CSSProperties;
    lifiBodyXLargeStrong: React.CSSProperties;
    lifiBodyXLarge: React.CSSProperties;
    lifiBodyLargeStrong: React.CSSProperties;
    lifiBodyLarge: React.CSSProperties;
    lifiBodyMediumStrong: React.CSSProperties;
    lifiBodyMedium: React.CSSProperties;
    lifiBodySmallStrong: React.CSSProperties;
    lifiBodySmall: React.CSSProperties;
    lifiBodyXSmallStrong: React.CSSProperties;
    lifiBodyXSmall: React.CSSProperties;
    lifiBrandHeaderXLarge: React.CSSProperties;
    lifiMono5: React.CSSProperties;
    lifiMono4: React.CSSProperties;
    lifiMono3: React.CSSProperties;
    lifiMono2: React.CSSProperties;
    lifiMono1: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // lifiBrandBodyMedium: React.CSSProperties;
    // lifiBrandBodyLarge: React.CSSProperties;
    // lifiBrandBodyXLarge: React.CSSProperties;
    // lifiBrandBodySmall: React.CSSProperties;
    // lifiBrandHeaderMedium: React.CSSProperties;
    // lifiBrandHeaderLarge: React.CSSProperties;
    lifiBrandHeaderXLarge: React.CSSProperties;
    lifiHeaderDisplay?: React.CSSProperties;
    lifiHeaderXLarge?: React.CSSProperties;
    lifiHeaderLarge?: React.CSSProperties;
    lifiHeaderMedium?: React.CSSProperties;
    lifiHeaderSmall?: React.CSSProperties;
    lifiHeaderXSmall?: React.CSSProperties;
    lifiBodyXLargeStrong?: React.CSSProperties;
    lifiBodyXLarge: React.CSSProperties;
    lifiBodyLargeStrong: React.CSSProperties;
    lifiBodyLarge: React.CSSProperties;
    lifiBodyMediumStrong: React.CSSProperties;
    lifiBodyMedium: React.CSSProperties;
    lifiBodySmallStrong: React.CSSProperties;
    lifiBodySmall: React.CSSProperties;
    lifiBodyXSmallStrong: React.CSSProperties;
    lifiBodyXSmall: React.CSSProperties;
    lifiMono5: React.CSSProperties;
    lifiMono4: React.CSSProperties;
    lifiMono3: React.CSSProperties;
    lifiMono2: React.CSSProperties;
    lifiMono1: React.CSSProperties;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
    white: true;
    black: true;
    accent1: true;
    accent1Alt: true;
    accent2: true;
    surface1: true;
    surface2: true;
    surface3: true;
    templateBg: true;
    templateOutline: true;
    dataBg: true;
    dataOutline: true;
    bg: true;
    shadow: true;
    alphaDark100: true;
    alphaDark200: true;
    alphaDark300: true;
    alphaDark400: true;
    alphaDark500: true;
    alphaDark600: true;
    alphaDark700: true;
    alphaDark800: true;
    alphaLight100: true;
    alphaLight200: true;
    alphaLight300: true;
    alphaLight400: true;
    alphaLight500: true;
    alphaLight600: true;
    alphaLight700: true;
    alphaLight800: true;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    '@supports (font-variation-settings: normal)': true;
    lifiHeaderDisplay: true;
    lifiHeaderXLarge: true;
    lifiHeaderLarge: true;
    lifiHeaderMedium: true;
    lifiHeaderSmall: true;
    lifiHeaderXSmall: true;
    lifiBodyXLargeStrong: true;
    lifiBodyXLarge: true;
    lifiBodyLargeStrong: true;
    lifiBodyLarge: true;
    lifiBodyMediumStrong: true;
    lifiBodyMedium: true;
    lifiBodySmallStrong: true;
    lifiBodySmall: true;
    lifiBodyXSmallStrong: true;
    lifiBodyXSmall: true;
    lifiBrandHeaderXLarge: true;
    lifiMono5: true;
    lifiMono4: true;
    lifiMono3: true;
    lifiMono2: true;
    lifiMono1: true;
  }
}

const shape = {
  borderRadius: 12,
  borderRadiusSecondary: 8,
};

const themeBase: Theme = createTheme();

// in a separate 'createTheme' to allow listening to breakpoints set above
const themeCustomized: Theme = createTheme({
  shape: {
    ...shape,
  },
  components: {
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          fontFamily:
            'Inter, Inter fallback, Arial, Noto Sans, BlinkMacSystemFont, Segoe UI, Helvetica Neue, sans-serif',
          '@supports (font-variation-settings: normal)': {
            fontFamily:
              'Inter var, Inter fallback, Arial, Noto Sans, BlinkMacSystemFont, Segoe UI, Helvetica Neue, sans-serif',
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: () => ({
          top: 80,
          [themeBase.breakpoints.up('sm' as Breakpoint)]: {
            top: 80,
          },
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: 'rgb(0 0 0 / 64%)',
          backdropFilter: 'blur(3px)',
          fontSize: '0.75rem',
          padding: theme.spacing(1, 1.5),
        }),
        arrow: {
          color: 'rgb(0 0 0 / 64%)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        img: {
          objectFit: 'contain',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@supports': { fontVariationSettings: 'normal' },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'large',
      },
      styleOverrides: {
        sizeSmall: {
          height: 32,
        },
        sizeMedium: {
          height: 40,
        },
        sizeLarge: {
          height: 48,
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          lifiHeaderDisplay: 'p',
          lifiHeaderXLarge: 'p',
          lifiHeaderLarge: 'p',
          lifiHeaderMedium: 'p',
          lifiHeaderSmall: 'p',
          lifiHeaderXSmall: 'p',
          lifiBodyXLargeStrong: 'p',
          lifiBodyXLarge: 'p',
          lifiBodyLargeStrong: 'p',
          lifiBodyLarge: 'p',
          lifiBodyMediumStrong: 'p',
          lifiBodyMedium: 'p',
          lifiBodySmallStrong: 'p',
          lifiBodySmall: 'p',
          lifiBodyXSmallStrong: 'p',
          lifiBodyXSmall: 'p',
          lifiBrandHeaderXLarge: 'h1',
          lifiMono5: 'p',
          lifiMono4: 'p',
          lifiMono3: 'p',
          lifiMono2: 'p',
          lifiMono1: 'p',
        },
      },
    },
  },
  palette: {
    grey: {
      100: '#F6F5FA',
      200: '#ECEBF0',
      300: '#DDDCE0',
      400: '#C9C8CC',
      500: '#9DA1A3',
      600: '#8A8D8F',
      700: '#70767A',
      800: '#4B4F52',
      900: '#000000',
    },
    success: {
      main: '#0AA65B',
      light: '#0AA65B',
      dark: '#0AA65B',
    },
    error: {
      main: '#E5452F',
      light: '#E5452F',
      dark: '#E5452F',
    },
    warning: {
      main: '#FFCC00',
      light: '#FFCC00',
      dark: '#EBC942',
    },
    info: {
      main: '#297EFF',
      light: '#297EFF',
      dark: '#297EFF',
    },
    white: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF',
    },
    black: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
    },
    alphaDark100: {
      main: 'rgba(0, 0, 0, 0.04)',
    },
    alphaDark200: {
      main: 'rgba(0, 0, 0, 0.08)',
    },
    alphaDark300: {
      main: 'rgba(0, 0, 0, 0.12)',
    },
    alphaDark400: {
      main: 'rgba(0, 0, 0, 0.16)',
    },
    alphaDark500: {
      main: 'rgba(0, 0, 0, 0.24)',
    },
    alphaDark600: {
      main: 'rgba(0, 0, 0, 0.32)',
    },
    alphaDark700: {
      main: 'rgba(0, 0, 0, 0.48)',
    },
    alphaDark800: {
      main: 'rgba(0, 0, 0, 0.64)',
    },
    alphaLight100: {
      main: 'rgba(255, 255, 255, 0.04)',
    },
    alphaLight200: {
      main: 'rgba(255, 255, 255, 0.08)',
    },
    alphaLight300: {
      main: 'rgba(255, 255, 255, 0.12)',
    },
    alphaLight400: {
      main: 'rgba(255, 255, 255, 0.16)',
    },
    alphaLight500: {
      main: 'rgba(255, 255, 255, 0.24)',
    },
    alphaLight600: {
      main: 'rgba(255, 255, 255, 0.32)',
    },
    alphaLight700: {
      main: 'rgba(255, 255, 255, 0.48)',
    },
    alphaLight800: {
      main: 'rgba(255, 255, 255, 0.64)',
    },
    pink: {
      main: '',
      contrastText: '',
      light: '#31007A',
      dark: '#BEA0EB',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    lifiHeaderDisplay: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontSize: '96px',
      lineHeight: '128px',
      fontWeight: 700,
    },
    lifiHeaderXLarge: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '64px',
      lineHeight: '96px',
      letterSpacing: 0,
    },
    lifiHeaderLarge: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '48px',
      lineHeight: '64px',
      letterSpacing: 0,
    },
    lifiHeaderMedium: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: 0,
    },
    lifiHeaderSmall: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: 0,
    },
    lifiHeaderXSmall: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: 0,
    },
    lifiBodyXLargeStrong: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 800,
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: 0,
    },
    lifiBodyXLarge: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: 0,
    },
    lifiBodyLargeStrong: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: 0,
    },
    lifiBodyLarge: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: 0,
    },
    lifiBodyMediumStrong: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: 0,
    },
    lifiBodyMedium: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: 0,
    },
    lifiBodySmallStrong: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: 0,
    },
    lifiBodySmall: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: 0,
    },
    lifiBodyXSmallStrong: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: 0,
    },
    lifiBodyXSmall: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: 0,
    },
    lifiBrandHeaderXLarge: {
      fontFamily: inter.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '64px',
      lineHeight: '72px',
      letterSpacing: 0,
    },
    lifiMono5: {
      fontFamily: roboto_mono.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '21px',
      letterSpacing: 0,
    },
    lifiMono4: {
      fontFamily: roboto_mono.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: 0,
    },
    lifiMono3: {
      fontFamily: roboto_mono.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: 0,
    },
    lifiMono2: {
      fontFamily: roboto_mono.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '10px',
      lineHeight: '13px',
      letterSpacing: 0,
    },
    lifiMono1: {
      fontFamily: roboto_mono.style.fontFamily,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '8px',
      lineHeight: '11px',
      letterSpacing: 0,
    },
  },
});

const themePreset: Theme = createTheme(deepmerge(themeBase, themeCustomized));

export const lightTheme: Theme = createTheme(
  deepmerge(themePreset, {
    palette: {
      mode: 'light',
      background: {
        default:
          'linear-gradient(180deg, #F9F5FF 0%, #F3EBFF 49.48%, #F9F5FF 99.48%)',
      },
      text: {
        primary: '#000',
      },
      grey: {
        300: '#E5E1EB',
      },
      bg: {
        light: '#F3EBFF',
        main: '#F3EBFF',
        dark: '#F3EBFF',
      },
      shadow: {
        light: '#F3EBFF',
        main: '#F3EBFF',
        dark: '#F3EBFF',
      },
      primary: {
        light: '#31007A',
        main: '#31007A',
        dark: '#31007A',
      },
      secondary: {
        light: '#E9E1F5',
        main: '#E9E1F5',
        dark: '#E9E1F5',
      },
      tertiary: {
        light: '#FCEBFF',
        main: '#FCEBFF',
        dark: '#FCEBFF',
      },
      accent1: {
        light: '#31007A',
        main: '#31007A',
        dark: '#31007A',
      },
      accent2: {
        light: '#8700B8',
        main: '#8700B8',
        dark: '#8700B8',
      },
      surface1: {
        light: '#FCFAFF',
        main: '#FCFAFF',
        dark: '#FCFAFF',
      },
      surface2: {
        light: '#FFFFFF',
        main: '#FFFFFF',
        dark: '#FFFFFF',
      },
      surface3: {
        light: '#E5E1EB',
        main: '#E5E1EB',
        dark: '#E5E1EB',
      },
      templateBg: {
        light: '#FEF5FF',
        main: '#FEF5FF',
        dark: '#FEF5FF',
      },
      templateOutline: {
        light: '#C95CFF',
        main: '#C95CFF',
        dark: '#C95CFF',
      },
      dataBg: {
        light: '#F5F6FF',
        main: '#F5F6FF',
        dark: '#F5F6FF',
      },
      dataOutline: {
        light: '#7B61FF',
        main: '#7B61FF',
        dark: '#7B61FF',
      },
    },
  }),
);

export const darkTheme: Theme = createTheme(
  deepmerge(themePreset, {
    palette: {
      mode: 'dark',
      background: {
        default:
          'linear-gradient(180deg, #000000 0%, #0C001F 49.48%, #000000 99.48%)', //'#241D52',
      },
      text: {
        primary: '#fff',
      },
      grey: {
        800: '#302B52',
      },
      bg: {
        light: '#030014',
        main: '#030014',
        dark: '#030014',
      },
      shadow: {
        light: '#F3EBFF',
        main: '#F3EBFF',
        dark: '#F3EBFF',
      },
      primary: {
        light: '#653BA3',
        main: '#653BA3',
        dark: '#653BA3',
      },
      secondary: {
        light: '#321D52',
        main: '#321D52',
        dark: '#321D52',
      },
      tertiary: {
        light: '#33163D',
        main: '#33163D',
        dark: '#33163D',
      },
      accent1: {
        light: '#653BA3',
        main: '#653BA3',
        dark: '#653BA3',
      },
      accent1Alt: {
        light: '#BEA0EB',
        main: '#BEA0EB',
        dark: '#BEA0EB',
      },
      accent2: {
        light: '#D35CFF',
        main: '#D35CFF',
        dark: '#D35CFF',
      },
      surface1: {
        light: '#120F29',
        main: '#120F29',
        dark: '#120F29',
      },
      surface2: {
        light: '#24203D',
        main: '#24203D',
        dark: '#24203D',
      },
      surface3: {
        light: '#302B52',
        main: '#302B52',
        dark: '#302B52',
      },
      templateBg: {
        light: '#401946',
        main: '#401946',
        dark: '#401946',
      },
      templateOutline: {
        light: '#D47BEB',
        main: '#D47BEB',
        dark: '#D47BEB',
      },
      dataBg: {
        light: '#28203D',
        main: '#28203D',
        dark: '#28203D',
      },
      dataOutline: {
        light: '#B8ADFF',
        main: '#B8ADFF',
        dark: '#B8ADFF',
      },
    },
  }),
);
