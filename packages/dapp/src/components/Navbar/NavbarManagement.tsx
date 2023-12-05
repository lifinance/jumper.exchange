import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { WalletManagementButtons } from '@transferto/shared/src';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../const';
import { useUserTracking } from '../../hooks';
import { useChains } from '../../hooks/useChains';
import { useWallet } from '../../providers/WalletProvider';
import { useMenuStore, useSettingsStore } from '../../stores';
import { EventTrackingTool } from '../../types';
import {
  NavbarDropdownButton,
  NavbarManagement as NavbarManagementContainer,
} from './Navbar.style';

const NavbarManagement = () => {
  const mainMenuAnchor = useRef<any>(null);
  const { trackEvent } = useUserTracking();

  const onWalletDisconnect = useSettingsStore(
    (state) => state.onWalletDisconnect,
  );

  const [openMainNavbarMenu, onOpenNavbarMainMenu] = useMenuStore((state) => [
    state.openMainNavbarMenu,
    state.onOpenNavbarMainMenu,
  ]);

  const { t } = useTranslation();
  const walletManagement = useWallet();
  const { account } = useWallet();
  !account.isActive ?? onWalletDisconnect();

  // return focus to the button when we transitioned from !open -> open
  const prevMainMenu = useRef(openMainNavbarMenu);
  useEffect(() => {
    if (prevMainMenu.current === true && openMainNavbarMenu === false) {
      mainMenuAnchor!.current.focus();
    }

    prevMainMenu.current = openMainNavbarMenu;
  }, [openMainNavbarMenu]);

  const { isSuccess } = useChains();

  const handleOnOpenNavbarMainMenu = () => {
    onOpenNavbarMainMenu(!openMainNavbarMenu, mainMenuAnchor.current);
    trackEvent({
      category: TrackingCategory.Menu,
      action: TrackingAction.OpenMenu,
      label: 'open_main_menu',
      data: { [TrackingEventParameter.Menu]: 'main_menu' },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
  };

  return (
    <NavbarManagementContainer className="settings">
      <WalletManagementButtons
        walletManagement={walletManagement}
        connectButtonLabel={
          <Typography
            variant={'lifiBodyMediumStrong'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {t('navbar.connect')}
          </Typography>
        }
        isSuccess={isSuccess}
      />
      <NavbarDropdownButton
        ref={mainMenuAnchor}
        id="composition-button"
        aria-controls={openMainNavbarMenu ? 'composition-menu' : undefined}
        aria-expanded={openMainNavbarMenu ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOnOpenNavbarMainMenu}
      >
        <MenuIcon
          sx={{
            fontSize: '32px',
            color: 'inherit',
          }}
        />
      </NavbarDropdownButton>
    </NavbarManagementContainer>
  );
};

export default NavbarManagement;
