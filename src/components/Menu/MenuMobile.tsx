import { MenuKeysEnum } from '@/const/menuKeys';
import { useMenuStore } from '@/stores/menu';
import type { SxProps, Theme } from '@mui/material';
import { Typography } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {
  MenuHeaderAppBar,
  MenuHeaderAppWrapper,
  MenuList,
  MenuPaper,
  MobileDrawer,
} from '.';

const paperProps = {
  sx: (theme: Theme) => ({
    position: 'absolute',
    backgroundImage: 'none',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  }),
};

interface MenuProps {
  isOpenSubMenu: boolean;
  setOpen: (open: boolean, anchorRef: any) => void;
  cardsLayout?: boolean;
  styles?: SxProps<Theme>;
  label?: string;
  open: boolean;
  children: any;
}

export const MenuMobile = ({
  open,
  cardsLayout,
  label,
  styles,
  isOpenSubMenu,
  children,
}: MenuProps) => {
  const { openSubMenu, closeAllMenus } = useMenuStore((state) => state);

  return (
    <MobileDrawer anchor="bottom" open={open} PaperProps={paperProps}>
      <MenuPaper>
        <ClickAwayListener
          onClickAway={(event) => {
            event.preventDefault();
            closeAllMenus();
          }}
        >
          <MenuList
            autoFocusItem={open}
            id="main-burger-menu"
            autoFocus={open}
            isOpenSubMenu={openSubMenu !== MenuKeysEnum.None}
            aria-labelledby="main-burger-menu"
            cardsLayout={cardsLayout}
            hasLabel={!!label}
            sx={styles}
            component={
              isOpenSubMenu && openSubMenu !== MenuKeysEnum.WalletSelect
                ? 'div'
                : 'ul'
            }
          >
            {!!label ? (
              <MenuHeaderAppWrapper>
                <MenuHeaderAppBar component="div" elevation={0}>
                  <Typography
                    variant={'lifiBodyMediumStrong'}
                    width={'100%'}
                    align={'center'}
                    flex={1}
                    noWrap
                  >
                    {label}
                  </Typography>
                </MenuHeaderAppBar>
              </MenuHeaderAppWrapper>
            ) : null}
            {children}
          </MenuList>
        </ClickAwayListener>
      </MenuPaper>
    </MobileDrawer>
  );
};
