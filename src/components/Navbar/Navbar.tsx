'use client';
import { usePathname, useRouter } from 'next/navigation';

import {
  JUMPER_FEST,
  JUMPER_LEARN_PATH,
  JUMPER_LOYALTY_PATH,
} from '@/const/urls';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useMenuStore } from '@/stores/menu';
import {
  NavbarContainer as Container,
  Logo,
  LogoLink,
  NavbarButtons,
  NavbarTabs,
} from '.';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLearnPage = pathname?.includes(JUMPER_LEARN_PATH);
  const isSuperFest = pathname?.includes(JUMPER_FEST);
  const isLoyaltyPage = pathname?.includes(JUMPER_LOYALTY_PATH);
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
      <LogoLink
        id="jumper-logo"
        onClick={handleClick}
        sx={{
          height: '32px',
          display: 'flex',
          alignContent: 'center',
        }}
      >
        <Logo
          variant={
            isLearnPage ? 'learn' : isSuperFest ? 'superfest' : 'default'
          }
        />
      </LogoLink>
      {!isLearnPage ? (
        <NavbarTabs navbarPageReload={isLoyaltyPage || isSuperFest} />
      ) : null}
      <NavbarButtons />
    </Container>
  );
};
