'use client';
import { useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';

import { JumperLogo } from '@/components/illustrations/JumperLogo';
import { JUMPER_LEARN_PATH, JUMPER_LOYALTY_PATH } from '@/const/urls';
import { useAccounts } from '@/hooks/useAccounts';
import { useMenuStore } from '@/stores/menu';
import { useSettingsStore } from '@/stores/settings';
import {
  NavbarContainer as Container,
  Logo,
  LogoLink,
  NavbarButtons,
  NavbarTabs,
} from '.';
import { JumperLearnLogo } from '../illustrations/JumperLearnLogo';

export const Navbar = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isLearnPage = pathname.includes(JUMPER_LEARN_PATH);
  const isLoyaltyPage = pathname.includes(JUMPER_LOYALTY_PATH);
  const { account } = useAccounts();
  const [setWelcomeScreenClosed] = useSettingsStore((state) => [
    state.setWelcomeScreenClosed,
  ]);
  const { closeAllMenus } = useMenuStore((state) => state);
  const handleClick = () => {
    closeAllMenus();
    setWelcomeScreenClosed(false);
    isLearnPage ? router.push(JUMPER_LEARN_PATH) : router.push('/');
  };

  return (
    <Container>
      <LogoLink onClick={handleClick} sx={{ height: '32px' }}>
        <Logo
          isConnected={!!account?.address}
          theme={theme}
          logo={isLearnPage ? <JumperLearnLogo /> : <JumperLogo />}
        />
      </LogoLink>
      {!isLearnPage ? <NavbarTabs navbarPageReload={isLoyaltyPage} /> : null}
      <NavbarButtons redirectToLearn={isLearnPage} />
    </Container>
  );
};
