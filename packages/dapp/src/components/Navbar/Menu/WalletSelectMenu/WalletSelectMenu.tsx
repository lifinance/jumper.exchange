import { Breakpoint, CSSObject, Typography, darken } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MenuKeys, useWalletSelectContent } from '@transferto/dapp/src/const';
import { useMenuStore } from '@transferto/dapp/src/stores';
import { getContrastAlphaColor } from '@transferto/shared/src/utils';
import { useTranslation } from 'react-i18next';
import { MenuHeaderAppBar, MenuHeaderAppWrapper } from '../../Navbar.style';
import { MenuItemComponent, NavbarMenu, SubMenuComponent } from '../../index';

interface NavbarMenuProps {
  handleClose: (event: MouseEvent | TouchEvent) => void;
  open?: boolean;
}

const NUMBER_OF_WALLETS_DISPLAYED = 9;

export const WalletSelectMenu = ({ handleClose, open }: NavbarMenuProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const walletSelectMenuItems = useWalletSelectContent();
  const subMenuWalletSelectMore = useWalletSelectContent();
  const isDarkMode = theme.palette.mode === 'dark';
  const filteredWalletSelectMenuItems = walletSelectMenuItems.slice(
    0,
    NUMBER_OF_WALLETS_DISPLAYED,
  );
  const [
    openNavbarWalletSelectMenu,
    onOpenNavbarWalletSelectMenu,
    openNavbarSubMenu,
    onOpenNavbarSubMenu,
  ] = useMenuStore((state) => [
    state.openNavbarWalletSelectMenu,
    state.onOpenNavbarWalletSelectMenu,
    state.openNavbarSubMenu,
    state.onOpenNavbarSubMenu,
  ]);

  const handleClickSelectMore = () => {
    onOpenNavbarSubMenu(MenuKeys.WalletSelectMore);
  };

  const menuItemStyles: CSSObject = {
    margin: 0,
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '72px',
    width: '72px',
    placeContent: 'center',

    [theme.breakpoints.up('sm' as Breakpoint)]: {
      height: '72px',
    },
  };

  return (
    openNavbarWalletSelectMenu && (
      <NavbarMenu
        handleClose={handleClose}
        open={openNavbarWalletSelectMenu}
        cardsLayout={
          openNavbarSubMenu === MenuKeys.WalletSelectMore ? false : true
        }
        styles={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          justifyItems: 'center',
          ul: {
            gridColumnStart: 1,
            gridColumnEnd: 4,
          },
        }}
        transformOrigin={'top'}
        setOpen={onOpenNavbarWalletSelectMenu}
        isOpenSubMenu={openNavbarSubMenu === MenuKeys.WalletSelectMore}
      >
        {openNavbarSubMenu === MenuKeys.None && (
          <MenuHeaderAppWrapper
            sx={{
              gridColumn: 'span 3',
              marginBottom: '-12px',
            }}
          >
            <MenuHeaderAppBar component="div" elevation={0}>
              <Typography
                sx={{
                  color: isDarkMode
                    ? theme.palette.white.main
                    : theme.palette.black.main,
                }}
                variant={'lifiBodyMediumStrong'}
                width={'100%'}
                align={'center'}
                flex={1}
                noWrap
              >
                {t('navbar.walletSelectMenu.connectWallet')}
              </Typography>
            </MenuHeaderAppBar>
          </MenuHeaderAppWrapper>
        )}
        {openNavbarSubMenu === MenuKeys.None &&
          filteredWalletSelectMenuItems.map((el, index) => (
            <MenuItemComponent
              key={`${el.label}-${index}`}
              triggerSubMenu={MenuKeys.WalletSelect}
              showButton={false}
              styles={{
                borderRadius: '72px',
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? getContrastAlphaColor(theme, '12%')
                    : getContrastAlphaColor(theme, '4%'),

                '&:hover': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.alphaLight300.main
                      : darken(theme.palette.white.main, 0.08),
                },
                ...menuItemStyles,
                ...el.styles,
              }}
              showMoreIcon={false}
              prefixIcon={el.prefixIcon}
              onClick={el.onClick}
              open={open || openNavbarWalletSelectMenu}
            />
          ))}
        {walletSelectMenuItems.length - NUMBER_OF_WALLETS_DISPLAYED > 0 &&
          openNavbarSubMenu === MenuKeys.None && (
            <MenuItemComponent
              key={`select-more-wallets`}
              triggerSubMenu={MenuKeys.WalletSelectMore}
              showButton={true}
              showMoreIcon={false}
              open={true}
              styles={{
                ...menuItemStyles,
                gridColumn: 'span 3',
                padding: '0px',
                width: '100%',
                height: '48px !important',
                borderRadius: '24px',
                '> button': {
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? getContrastAlphaColor(theme, '12%')
                      : getContrastAlphaColor(theme, '4%'),
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                },

                '&:hover button': {
                  backgroundColor: getContrastAlphaColor(theme, '16%'),
                },
              }}
              prefixIcon={
                <Typography
                  variant={'lifiBodyMediumStrong'}
                  sx={{
                    color: isDarkMode
                      ? theme.palette.white.main
                      : theme.palette.black.main,
                  }}
                >
                  {t('navbar.seeAllWallets')}
                </Typography>
              }
              onClick={handleClickSelectMore}
            />
          )}

        <SubMenuComponent
          label={t('navbar.walletSelectMenu.wallets')}
          triggerSubMenu={MenuKeys.WalletSelectMore}
          open={openNavbarSubMenu === MenuKeys.WalletSelectMore}
          prevMenu={MenuKeys.None}
          subMenuList={subMenuWalletSelectMore}
        />
      </NavbarMenu>
    )
  );
};
