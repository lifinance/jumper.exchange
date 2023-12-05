import { useTheme } from '@mui/material/styles';
import { BrandLogo } from '@transferto/shared/src/atoms/illustrations';
import { useWallet } from '../../providers/WalletProvider';
import { useSettingsStore } from '../../stores';
import { NavbarTabs } from '../NavbarTabs';
import { NavbarBrandContainer, NavbarContainer } from './Navbar.style';
import { NavbarManagement } from './index';
const Navbar = () => {
  const theme = useTheme();
  const { account } = useWallet();
  const [onWelcomeScreenClosed] = useSettingsStore((state) => [
    state.onWelcomeScreenClosed,
  ]);

  const handleClick = () => {
    onWelcomeScreenClosed(false);
  };

  return (
    <NavbarContainer>
      <NavbarBrandContainer onClick={handleClick}>
        <BrandLogo isConnected={!!account.address} theme={theme} />
      </NavbarBrandContainer>
      <NavbarTabs />
      <NavbarManagement />
    </NavbarContainer>
  );
};

export default Navbar;
