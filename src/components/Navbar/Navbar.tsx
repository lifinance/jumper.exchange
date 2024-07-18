'use client';
import { usePathname, useRouter } from 'next/navigation';

import { JUMPER_LEARN_PATH } from '@/const/urls';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useMenuStore } from '@/stores/menu';
import { NavbarContainer as Container, Logo, LogoLink, NavbarButtons } from '.';
import { useSuperfest } from 'src/hooks/useSuperfest';
import { useMainPaths } from 'src/hooks/useMainPaths';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLearnPage = pathname?.includes(JUMPER_LEARN_PATH);
  const { isSuperfest } = useSuperfest();
  const { isMainPaths } = useMainPaths();
  const { setWelcomeScreenClosed } = useWelcomeScreen();
  const { closeAllMenus } = useMenuStore((state) => state);
  const handleClick = () => {
    closeAllMenus();
    setWelcomeScreenClosed(false);

    if (pathname === '/gas/') {
      return;
    }

    isLearnPage ? router.push(JUMPER_LEARN_PATH) : router.push('/');
  };

  return (
    <Container>
      <LogoLink id="jumper-logo" onClick={handleClick}>
        <Logo
          variant={
            isLearnPage
              ? 'learn'
              : isSuperfest || isMainPaths
                ? 'superfest'
                : 'default'
          }
        />
      </LogoLink>
      <NavbarButtons />
    </Container>
  );
};
