import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  JumperLearnLogo,
  JumperLogo,
  NavbarButtons,
  NavbarTabs,
} from 'src/components';
import { JUMPER_LEARN_PATH } from 'src/const';
import { useAccounts } from 'src/hooks';
import { useMenuStore, useSettingsStore } from 'src/stores';
import { NavbarContainer as Container, Logo, LogoLink } from '.';

interface NavbarProps {
  hideNavbarTabs?: boolean;
  redirectToLearn?: boolean;
  navbarPageReload?: boolean;
}

export const Navbar = ({
  hideNavbarTabs,
  redirectToLearn,
  navbarPageReload,
}: NavbarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { account } = useAccounts();
  const [setWelcomeScreenClosed] = useSettingsStore((state) => [
    state.setWelcomeScreenClosed,
  ]);
  const { closeAllMenus } = useMenuStore((state) => state);

  const handleClick = () => {
    closeAllMenus();
    setWelcomeScreenClosed(false);
    redirectToLearn ? navigate(JUMPER_LEARN_PATH) : navigate('/');
  };

  return (
    <Container>
      <LogoLink onClick={handleClick} sx={{ height: '32px' }}>
        <Logo
          isConnected={!!account?.address}
          theme={theme}
          logo={redirectToLearn ? <JumperLearnLogo /> : <JumperLogo />}
        />
      </LogoLink>
      {!hideNavbarTabs ? (
        <NavbarTabs navbarPageReload={navbarPageReload} />
      ) : null}
      <NavbarButtons redirectToLearn={redirectToLearn} />
    </Container>
  );
};
