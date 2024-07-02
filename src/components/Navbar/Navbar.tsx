'use client';
import { usePathname, useRouter } from 'next/navigation';

import { JUMPER_LEARN_PATH, JUMPER_LOYALTY_PATH } from '@/const/urls';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useMenuStore } from '@/stores/menu';
import { usePartnerFilter } from 'src/hooks/usePartnerFilter';
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
  const isLoyaltyPage = pathname?.includes(JUMPER_LOYALTY_PATH);
  const { setWelcomeScreenClosed } = useWelcomeScreen();
  const { closeAllMenus } = useMenuStore((state) => state);
  const handleClick = () => {
    closeAllMenus();
    setWelcomeScreenClosed(false);
    isLearnPage ? router.push(JUMPER_LEARN_PATH) : router.push('/');
  };

  const { hasTheme } = usePartnerFilter();

  return (
    <Container>
      <LogoLink id="jumper-logo" onClick={handleClick} sx={{ height: '32px' }}>
        <Logo variant={isLearnPage ? 'learn' : 'default'} />
      </LogoLink>
      {!isLearnPage && !hasTheme ? (
        <NavbarTabs navbarPageReload={isLoyaltyPage} />
      ) : null}
      <NavbarButtons />
    </Container>
  );
};
