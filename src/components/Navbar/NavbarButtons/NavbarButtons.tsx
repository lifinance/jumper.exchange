'use client';
import { MainMenu } from '@/components/Menus/MainMenu';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useChains } from '@/hooks/useChains';
import { useUserTracking } from '@/hooks/userTracking';
import { useClientTranslation } from '@/i18n/useClientTranslation';
import { useMenuStore } from '@/stores/menu';
import { EventTrackingTool } from '@/types/userTracking';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { MenuToggle, NavbarButtonsContainer, WalletManagementButtons } from '.';

interface NavbarButtonsProps {
  redirectToLearn?: boolean;
}

export const NavbarButtons = ({ redirectToLearn }: NavbarButtonsProps) => {
  const mainMenuAnchor = useRef<any>(null);
  const { trackEvent } = useUserTracking();

  const [openMainMenu, setMainMenuState] = useMenuStore((state) => [
    state.openMainMenu,
    state.setMainMenuState,
  ]);
  const { t } = useClientTranslation();

  // return focus to the button when we transitioned from !open -> open
  const prevMainMenu = useRef(openMainMenu);
  useEffect(() => {
    if (prevMainMenu.current === true && openMainMenu === false) {
      mainMenuAnchor!.current.focus();
    }

    prevMainMenu.current = openMainMenu;
  }, [openMainMenu]);

  const { isSuccess } = useChains();
  const handleOnOpenNavbarMainMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setMainMenuState(!openMainMenu);
    trackEvent({
      category: TrackingCategory.Menu,
      action: TrackingAction.OpenMenu,
      label: 'open_main_menu',
      data: { [TrackingEventParameter.Menu]: 'main_menu' },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
  };

  return (
    <NavbarButtonsContainer className="settings">
      <WalletManagementButtons
        redirectToLearn={redirectToLearn}
        connectButtonLabel={
          <Typography
            variant={'lifiBodyMediumStrong'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {redirectToLearn ? t('blog.openApp') : t('navbar.connect')}
          </Typography>
        }
        isSuccess={isSuccess}
      />

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
      <MainMenu anchorEl={mainMenuAnchor.current} />
    </NavbarButtonsContainer>
  );
};
