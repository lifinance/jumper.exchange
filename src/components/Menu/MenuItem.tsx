import { ButtonSecondary } from '@/components/Button/Button.style';
import type { MenuKeysEnum } from '@/const/menuKeys';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu/MenuStore';
import { EventTrackingTool } from '@/types/userTracking';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { Breakpoint, SxProps, Theme } from '@mui/material';
import { Typography, useTheme } from '@mui/material';
import type { JsxElement } from 'typescript';
import { MenuItemContainer, MenuLabel } from '.';

interface MenuItemProps {
  open: boolean;
  showButton: boolean | undefined;
  children?: Element | JsxElement | undefined;
  disableRipple?: boolean | undefined;
  autoFocus?: boolean;
  showMoreIcon?: boolean;
  styles?: SxProps<Theme>;
  label?: string;
  onClick?: any;
  triggerSubMenu?: MenuKeysEnum;
  prefixIcon?: JSX.Element | string;
  suffixIcon?: JSX.Element | string;
  checkIcon?: boolean;
}

export const MenuItem = ({
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
  const { setSubMenuState } = useMenuStore((state) => state);

  const handleClick = () => {
    triggerSubMenu && setSubMenuState(triggerSubMenu);
    triggerSubMenu &&
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
    onClick && onClick();
  };

  return open ? (
    <MenuItemContainer
      disableRipple={disableRipple || showButton}
      showButton={showButton || false}
      sx={styles}
      autoFocus={autoFocus}
      onClick={() => {
        !children && handleClick();
      }}
    >
      <>
        {children}
        {showButton && (
          <ButtonSecondary fullWidth>
            {prefixIcon}
            <Typography
              variant={'lifiBodyMediumStrong'}
              component={'span'}
              ml={!!prefixIcon ? '9.5px' : 'inherit'}
              mr={!!prefixIcon ? '9.5px' : 'inherit'}
              sx={{
                color:
                  theme.palette.mode === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.white.main,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 208,
                [theme.breakpoints.up('sm' as Breakpoint)]: {
                  maxWidth: 168,
                },
              }}
            >
              {label}
            </Typography>
            {suffixIcon ?? null}
          </ButtonSecondary>
        )}
        {!showButton && (
          <>
            <MenuLabel
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
                  ml={theme.spacing(1.5)}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    [theme.breakpoints.up('sm' as Breakpoint)]: {
                      maxWidth: prefixIcon ? 188 : 'inherit',
                    },
                  }}
                >
                  {label}
                </Typography>
              ) : null}
            </MenuLabel>
            {suffixIcon || showMoreIcon ? (
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
            ) : null}
          </>
        )}
      </>
    </MenuItemContainer>
  ) : null;
};
