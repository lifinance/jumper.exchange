'use client';
import { MainMenu } from '@/components/Menus/MainMenu';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking';
import { useMenuStore } from '@/stores/menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useRef } from 'react';
import { MenuToggle, NavbarButtonsContainer, WalletManagementButtons } from '.';

export const NavbarButtons = () => {
  const mainMenuAnchor = useRef(null);
  const { trackEvent } = useUserTracking();

  const [openedMenu, openMainMenu, setMainMenuState] = useMenuStore((state) => [
    state.openedMenu,
    state.openMainMenu,
    state.setMainMenuState,
  ]);
  // return focus to the button when we transitioned from !open -> open
  const prevMainMenu = useRef(openMainMenu);
  useEffect(() => {
    if (prevMainMenu.current === true && openMainMenu === false) {
      mainMenuAnchor.current && (mainMenuAnchor.current as HTMLElement).focus();
    }

    prevMainMenu.current = openMainMenu;
  }, [openMainMenu]);

  const handleOnOpenNavbarMainMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const menuOpen = openedMenu();
    if (menuOpen) {
      setMainMenuState(false);
    } else {
      setMainMenuState(true);
    }
    trackEvent({
      category: TrackingCategory.Menu,
      action: TrackingAction.OpenMenu,
      label: 'open_main_menu',
      data: { [TrackingEventParameter.Menu]: 'main_menu' },
    });
  };

  return (
    <>
      <NavbarButtonsContainer className="settings">
        <WalletManagementButtons />
        <MenuToggle
          ref={mainMenuAnchor}
          id="main-burger-menu-button"
          aria-controls={openMainMenu ? 'main-burger-menu' : undefined}
          aria-expanded={openMainMenu ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(e) => handleOnOpenNavbarMainMenu(e)}
        >
          <MenuIcon
            sx={{
              fontSize: '32px',
              color: 'inherit',
            }}
          />
        </MenuToggle>
      </NavbarButtonsContainer>
      <MainMenu anchorEl={mainMenuAnchor.current ?? undefined} />
    </>
  );
};
