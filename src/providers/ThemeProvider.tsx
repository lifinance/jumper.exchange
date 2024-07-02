'use client';
import { useSettingsStore } from '@/stores/settings';
import type { ThemeModesSupported } from '@/types/settings';
import { CssBaseline, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { sora } from 'src/fonts/fonts';
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';
import { darkTheme, lightTheme } from 'src/theme/theme';
import type { PartnerThemesAttributes } from 'src/types/strapi';

export const useDetectDarkModePreference = () => {
  const themeMode = useSettingsStore((state) => state.themeMode);
  const isDarkModeHook = useMediaQuery('(prefers-color-scheme: dark)');

  if (themeMode === 'dark') {
    return true;
  } else if (themeMode === 'light') {
    return false;
  } else {
    return isDarkModeHook;
  }
};

export const ThemeProvider: React.FC<
  PropsWithChildren<{
    theme?: ThemeModesSupported | 'auto';
    partnerCustomizedTheme?: PartnerThemesAttributes;
  }>
> = ({ children, theme: themeProp, partnerCustomizedTheme }) => {
  const [cookie, setCookie] = useCookies(['theme', 'partnerThemeUid']);
  const [updatedTheme, setUpdatedTheme] = useState<Theme | undefined>();
  const [abcd, setAbcd] = useState(false);
  const themeMode = useSettingsStore((state) => state.themeMode);
  const [themeModeState, setThemeModeState] = useState<
    ThemeModesSupported | undefined
  >(themeProp);
  const isDarkMode = useDetectDarkModePreference();
  const { currentCustomizedTheme } = usePartnerTheme();

  useEffect(() => {
    setTimeout(() => {
      setAbcd(true);
    }, 100);
  });

  useEffect(() => {
    setUpdatedTheme(
      (partnerCustomizedTheme &&
        (themeModeState === 'light'
          ? partnerCustomizedTheme.lightConfig?.customization
          : partnerCustomizedTheme.darkConfig?.customization)) ||
        currentCustomizedTheme,
    );
  }, [currentCustomizedTheme, partnerCustomizedTheme, themeModeState]);

  // Update the themeModeState whenever themeMode changes
  useEffect(() => {
    if (
      (partnerCustomizedTheme?.lightConfig &&
        partnerCustomizedTheme.darkConfig) ||
      themeMode === 'auto'
    ) {
      setThemeModeState(isDarkMode ? 'dark' : 'light');
      setCookie('theme', isDarkMode ? 'dark' : 'light', {
        path: '/',
        sameSite: true,
      });
    } else {
      setCookie(
        'theme',
        partnerCustomizedTheme?.darkConfig || themeMode === 'dark'
          ? 'dark'
          : 'light',
        {
          path: '/',
          sameSite: true,
        },
      );
      setThemeModeState(themeMode === 'dark' ? 'dark' : 'light');
    }
  }, [themeMode, isDarkMode, setCookie, partnerCustomizedTheme]);

  const activeTheme = useMemo(() => {
    let currentTheme = themeModeState === 'dark' ? darkTheme : lightTheme;

    // if (abcd) {
    //   return deepmerge(currentTheme, {
    //     typography: {
    //       fontFamily: currentTheme.typography.fontFamily,
    //     },
    //     palette: {
    //       primary: {
    //         main: '#ff0000',
    //       },
    //       secondary: {
    //         main: '#ff0000',
    //       },
    //       accent1: {
    //         main: '#ff0000',
    //       },
    //       accent1Alt: {
    //         main: '#ff0000',
    //       },
    //       accent2: {
    //         main: '#ff0000',
    //       },
    //       surface1: {
    //         main: '#ff0000',
    //       },
    //     },
    //     // typography: updatedTheme?.typography
    //     //   ? updatedTheme?.typography
    //     //   : currentTheme.typography,
    //   });
    // }

    if (
      partnerCustomizedTheme ||
      (cookie.partnerThemeUid !== undefined &&
        cookie.partnerThemeUid !== 'undefined')
    ) {
      // Merge partner themeModeState attributes into the base themeModeState
      const mergedTheme = deepmerge(currentTheme, {
        typography: {
          fontFamily:
            updatedTheme?.typography &&
            currentTheme.typography.fontFamily &&
            currentCustomizedTheme?.typography?.includes('Sora')
              ? sora.style.fontFamily.concat(currentTheme.typography.fontFamily)
              : currentTheme.typography.fontFamily,
        },
        palette: {
          primary: {
            main: updatedTheme?.palette?.primary
              ? updatedTheme?.palette.primary
              : currentTheme.palette.primary.main,
          },
          secondary: {
            main: updatedTheme?.palette?.secondary
              ? updatedTheme?.palette.secondary
              : currentTheme.palette.secondary.main,
          },
          accent1: {
            main: updatedTheme?.palette?.accent1
              ? updatedTheme?.palette.accent1
              : currentTheme.palette.surface1.main,
          },
          accent1Alt: {
            main: updatedTheme?.palette?.accent1Alt
              ? updatedTheme?.palette.accent1Alt
              : currentTheme.palette.surface1.main,
          },
          accent2: {
            main: updatedTheme?.palette?.accent2
              ? updatedTheme?.palette.accent2
              : currentTheme.palette.surface1.main,
          },
          surface1: {
            main: updatedTheme?.palette?.surface1
              ? updatedTheme?.palette.surface1
              : currentTheme.palette.surface1.main,
          },
          surface2: {
            main: updatedTheme?.palette?.surface2
              ? updatedTheme?.palette.surface2
              : currentTheme.palette.surface2.main,
          },
        },
        // typography: updatedTheme?.typography
        //   ? updatedTheme?.typography
        //   : currentTheme.typography,
      });
      return mergedTheme;
    } else {
      return currentTheme;
    }
  }, [
    cookie.partnerThemeUid,
    currentCustomizedTheme?.typography,
    partnerCustomizedTheme,
    themeModeState,
    updatedTheme,
  ]);

  // Render children only when the themeModeState is determined
  return (
    <MuiThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
