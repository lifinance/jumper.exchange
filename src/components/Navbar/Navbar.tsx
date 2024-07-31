'use client';
import { usePathname, useRouter } from 'next/navigation';

import {
  JUMPER_LEARN_PATH,
  JUMPER_LOYALTY_PATH,
  JUMPER_SCAN_PATH,
} from '@/const/urls';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useMenuStore } from '@/stores/menu';
import { useSuperfest } from 'src/hooks/useSuperfest';
import {
  NavbarContainer as Container,
  Logo,
  LogoLink,
  NavbarButtons,
  NavbarTabs,
} from '.';

export const Navbar = ({ disableNavbar = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isLearnPage = pathname?.includes(JUMPER_LEARN_PATH);
  const isLoyaltyPage = pathname?.includes(JUMPER_LOYALTY_PATH);
  const isScanPage = pathname?.includes(JUMPER_SCAN_PATH);
  const { isSuperfest } = useSuperfest();
  const { setWelcomeScreenClosed } = useWelcomeScreen();

  const { closeAllMenus } = useMenuStore((state) => state);
  const handleClick = () => {
    closeAllMenus();
    setWelcomeScreenClosed(false);

    if (pathname === '/gas/') {
      return;
    }
    if (isLearnPage) {
      router.push(JUMPER_LEARN_PATH);
    } else if (isScanPage) {
      window.open(JUMPER_SCAN_PATH, '_self');
    } else {
      router.push('/');
    }
  };

  return (
    <Container>
      <LogoLink id="jumper-logo" onClick={handleClick}>
        <Logo
          variant={isScanPage ? 'scan' : isLearnPage ? 'learn' : 'default'}
        />
      </LogoLink>
      {!isScanPage && !isLearnPage && !disableNavbar && (
        <NavbarTabs navbarPageReload={isLoyaltyPage || isSuperfest} />
      )}
      <NavbarButtons />
    </Container>
  );
};
