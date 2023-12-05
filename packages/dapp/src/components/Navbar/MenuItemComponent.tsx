import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CSSObject, Typography } from '@mui/material';
import { Breakpoint, useTheme } from '@mui/material/styles';

import { JsxElement } from 'typescript';
import {
  MenuKeys,
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../const';
import { useUserTracking } from '../../hooks';
import { useMenuStore } from '../../stores';
import { EventTrackingTool } from '../../types';
import { Button } from '../Button';
import { MenuItem, MenuItemLabel } from './Navbar.style';
interface MenuItemProps {
  open: boolean;
  showButton: boolean | undefined;
  children?: Element | JsxElement | undefined;
  disableRipple?: boolean | undefined;
  autoFocus?: boolean;
  showMoreIcon?: boolean;
  styles?: CSSObject;
  label?: string;
  onClick: any;
  triggerSubMenu?: MenuKeys;
  prefixIcon?: JSX.Element | string;
  suffixIcon?: JSX.Element | string;
  checkIcon?: boolean;
}

const MenuItemComponent = ({
  open,
  showButton,
  autoFocus,
  disableRipple,
  children,
  showMoreIcon = true,
  styles,
  onClick,
  label,
  triggerSubMenu,
  prefixIcon,
  suffixIcon,
}: MenuItemProps) => {
  const theme = useTheme();
  const { trackEvent } = useUserTracking();
  const [onOpenNavbarSubMenu] = useMenuStore((state) => [
    state.onOpenNavbarSubMenu,
  ]);

  const handleClick = () => {
    !!triggerSubMenu && onOpenNavbarSubMenu(triggerSubMenu);
    !!triggerSubMenu &&
      trackEvent({
        category: TrackingCategory.MainMenu,
        action: TrackingAction.OpenMenu,
        label: `open_submenu_${triggerSubMenu.toLowerCase()}`,
        data: { [TrackingEventParameter.Menu]: triggerSubMenu },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    !!onClick && onClick();
  };

  return open ? (
    <MenuItem
      disableRipple={disableRipple || showButton}
      showButton={showButton}
      sx={styles}
      autoFocus={autoFocus}
      onClick={() => {
        !children && handleClick();
      }}
    >
      <>
        {children}
        {showButton && (
          <Button variant="primary" styles={styles} fullWidth={true}>
            {prefixIcon}
            <Typography
              variant={'lifiBodyMediumStrong'}
              component={'span'}
              ml={!!prefixIcon ? '9.5px' : 'inherit'}
              mr={!!prefixIcon ? '9.5px' : 'inherit'}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '208px',
                [theme.breakpoints.up('sm' as Breakpoint)]: {
                  maxWidth: '168px',
                },
              }}
            >
              {label}
            </Typography>
            {suffixIcon ?? null}
          </Button>
        )}
        {!showButton && (
          <>
            <MenuItemLabel
              variant={
                suffixIcon && showMoreIcon
                  ? 'xs'
                  : !suffixIcon && !showMoreIcon
                  ? 'lg'
                  : 'md'
              }
            >
              {prefixIcon ?? null}
              {label ? (
                <Typography
                  variant={'lifiBodyMedium'}
                  ml={'12px'}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    [theme.breakpoints.up('sm' as Breakpoint)]: {
                      maxWidth: prefixIcon ? '188px' : 'inherit',
                    },
                  }}
                >
                  {label}
                </Typography>
              ) : null}
            </MenuItemLabel>
            {suffixIcon ||
              (showMoreIcon && (
                <div
                  style={{
                    display: suffixIcon || showMoreIcon ? 'flex' : 'none',
                    alignItems: 'center',
                  }}
                >
                  {suffixIcon ?? null}
                  {showMoreIcon ? (
                    <ChevronRightIcon sx={{ ml: theme.spacing(1) }} />
                  ) : null}
                </div>
              ))}
          </>
        )}
      </>
    </MenuItem>
  ) : null;
};

export default MenuItemComponent;
