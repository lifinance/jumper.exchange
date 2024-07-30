import initTranslations from '@/app/i18n';
import { Logo } from '@/components/Navbar/Logo/Logo';
import { NavbarContainer } from '@/components/Navbar/Navbar.style';
import { NavbarButtons } from '@/components/Navbar/NavbarButtons';
import { NotFoundComponent } from '@/components/NotFound/NotFound';
import TranslationsProvider from '@/providers/TranslationProvider';
import { Link } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { cookies } from 'next/headers';
import RouterLink from 'next/link';
import { defaultNS, namespaces } from 'src/i18n';
import Background from '@/components/Background';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProviderV2 } from '@/providers/ThemeProviderV2';

export default async function NotFound() {
  const cookiesHandler = cookies();
  const locale = cookiesHandler.get('NEXT_LOCALE')?.value ?? 'en';

  const { resources } = await initTranslations(locale, namespaces);

  return (
    <>
      <AppRouterCacheProvider>
        <NextThemeProvider
          themes={['dark', 'light']}
          forcedTheme={'light'}
          enableSystem
          enableColorScheme
        >
          <ThemeProviderV2 themes={[]}>
            <TranslationsProvider
              namespaces={[defaultNS]}
              locale={locale}
              resources={resources}
            >
              <Background />
              <NavbarContainer>
                <Link component={RouterLink} href="/">
                  <Logo variant="default" />
                </Link>
                <NavbarButtons />
              </NavbarContainer>
              <NotFoundComponent />
            </TranslationsProvider>
          </ThemeProviderV2>
        </NextThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
