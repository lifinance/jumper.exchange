import CheckIcon from '@mui/icons-material/Check';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Breakpoint, useTheme } from '@mui/material/styles';
import { ButtonBackArrow } from '@transferto/shared/src/atoms/ButtonArrowBack';
import { KeyboardEvent, useEffect, useRef } from 'react';
import {
  MenuKeys,
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../const';
import { useMenuStore } from '../../stores/menu';
import { EventTrackingTool, MenuListItem } from '../../types';

import { useUserTracking } from '../../hooks';
import {
  MenuHeaderAppBar,
  MenuHeaderAppWrapper,
  MenuHeaderLabel,
  MenuItem,
  MenuItemLabel,
  MenuLinkItem,
  NavbarPaper,
} from './Navbar.style';

interface NavbarSubMenuProps {
  open: boolean;
  label: string;
  suffixIcon?: JSX.Element | string;
  prefixIcon?: JSX.Element | string;
  checkIcon?: boolean;
  url?: string;
  prevMenu: MenuKeys;
  subMenuList: MenuListItem[];
  triggerSubMenu: MenuKeys;
}

const SubMenuComponent = ({
  open,
  prevMenu,
  label,
  triggerSubMenu,
  subMenuList,
}: NavbarSubMenuProps) => {
  const theme = useTheme();
  const { trackEvent } = useUserTracking();
  const menuListRef = useRef(null);
  const [openNavbarSubMenu, onOpenNavbarSubMenu] = useMenuStore((state) => [
    state.openNavbarSubMenu,
    state.onOpenNavbarSubMenu,
  ]);

  function handleBackSpace(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Backspace') {
      onOpenNavbarSubMenu(prevMenu);
    }
  }

  const handleClick = (el: MenuListItem) => {
    if (el.triggerSubMenu) {
      onOpenNavbarSubMenu(el.triggerSubMenu);
      trackEvent({
        category: TrackingCategory.SubMenu,
        action: TrackingAction.OpenMenu,
        label: `open_submenu_${el.triggerSubMenu.toLowerCase()}`,
        data: {
          [TrackingEventParameter.Menu]: el.triggerSubMenu,
          [TrackingEventParameter.PrevMenu]: prevMenu,
        },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    } else {
      typeof el.onClick === 'function' && el.onClick();
    }
  };

  const handleBackNavigation = () => {
    onOpenNavbarSubMenu(prevMenu);
  };

  useEffect(() => {
    if (menuListRef.current && open && openNavbarSubMenu === triggerSubMenu) {
      const menuList: HTMLUListElement = menuListRef.current;
      menuList.scrollTop = 0;
    }
  }, [open, openNavbarSubMenu, triggerSubMenu]);

  return open && openNavbarSubMenu === triggerSubMenu ? (
    <NavbarPaper
      className="submenu"
      onKeyDown={handleBackSpace}
      autoFocus={open}
      component={'ul'}
      ref={menuListRef}
    >
      <MenuHeaderAppWrapper>
        <MenuHeaderAppBar component="div" elevation={0}>
          <ButtonBackArrow
            styles={{ marginLeft: '0px' }}
            onClick={handleBackNavigation}
          />
          <MenuHeaderLabel>{label}</MenuHeaderLabel>
        </MenuHeaderAppBar>
      </MenuHeaderAppWrapper>
      {!!subMenuList.length ? (
        subMenuList.map((el, index) =>
          !!el.url ? (
            <MenuLinkItem
              autoFocus={index > 0 ? true : false}
              onClick={() => {
                el.triggerSubMenu
                  ? onOpenNavbarSubMenu(el.triggerSubMenu)
                  : el.onClick();
              }}
              component="li"
              key={`${el.label}-${index}`}
            >
              <MenuItemLabel
                variant={
                  !el.suffixIcon && !el.checkIcon && !el.showMoreIcon
                    ? 'lg'
                    : (el.showMoreIcon || el.checkIcon) && el.suffixIcon
                    ? 'xs'
                    : 'md'
                }
              >
                {el.prefixIcon}
                <Typography
                  sx={{
                    maxWidth: 'inherit',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  variant={'lifiBodyMedium'}
                  ml={!!el.prefixIcon ? '12px' : 'inherit'}
                  mr={!!el.suffixIcon ? '12px' : 'inherit'}
                >
                  {`${el.label || ' '}`}
                </Typography>
                {el.suffixIcon}
              </MenuItemLabel>
            </MenuLinkItem>
          ) : (
            <MenuItem
              autoFocus={index > 0 ? true : false}
              onClick={() => handleClick(el)}
              key={`${el.label}-${index}`}
            >
              <MenuItemLabel
                variant={
                  !el.suffixIcon && !el.checkIcon && !el.showMoreIcon
                    ? 'lg'
                    : (el.showMoreIcon || el.checkIcon) && el.suffixIcon
                    ? 'xs'
                    : 'md'
                }
              >
                {el.prefixIcon}
                <Typography
                  variant={'lifiBodyMedium'}
                  ml={!!el.prefixIcon ? '12px' : 'inherit'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 'inherit',
                    [theme.breakpoints.up('sm' as Breakpoint)]: {
                      maxWidth: el.prefixIcon ? '188px' : 'inherit',
                    },
                  }}
                >
                  {`${el.label || ' '}`}
                </Typography>
              </MenuItemLabel>
              {el.checkIcon && <CheckIcon />}
              {el.showMoreIcon && (
                <ChevronRightIcon sx={{ ml: theme.spacing(1) }} />
              )}
            </MenuItem>
          ),
        )
      ) : (
        <Box textAlign={'center'} mt={theme.spacing(1)}>
          <CircularProgress />
        </Box>
      )}
    </NavbarPaper>
  ) : null;
};

export default SubMenuComponent;
