import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
import {
  ConnectedMenuItems,
  ConnectedSubMenuChains,
  SubMenuKeys,
} from '../../../../const';
import { useMenuStore } from '../../../../stores/menu';
import { MenuItemComponent, NavbarMenu, SubMenuComponent } from '../../index';
interface NavbarMenuProps {
  handleClose: (event: MouseEvent | TouchEvent) => void;
}
export const ConnectedMenu = ({ handleClose }: NavbarMenuProps) => {
  const i18Path = 'navbar.walletMenu.';
  const { t: translate } = useTranslation();

  const [
    openNavbarConnectedMenu,
    onOpenNavbarConnectedMenu,
    openNavbarSubMenu,
    onOpenNavbarSubMenu,
  ] = useMenuStore(
    (state) => [
      state.openNavbarConnectedMenu,
      state.onOpenNavbarConnectedMenu,
      state.openNavbarSubMenu,
      state.onOpenNavbarSubMenu,
    ],
    shallow,
  );

  const _connectedMenuItems = ConnectedMenuItems();
  const _connectedSubMenuChains = ConnectedSubMenuChains();

  return !!openNavbarConnectedMenu ? ( //todo, ON ???
    <NavbarMenu
      handleClose={handleClose}
      open={openNavbarConnectedMenu}
      isScrollable={openNavbarSubMenu === SubMenuKeys.chains}
      setOpen={onOpenNavbarConnectedMenu}
      isOpenSubMenu={openNavbarSubMenu !== SubMenuKeys.none}
    >
      {_connectedMenuItems.map((el, index) => (
        <MenuItemComponent
          key={`${el.label}-${index}`}
          label={el.label}
          prefixIcon={el.prefixIcon}
          showMoreIcon={el.showMoreIcon}
          triggerSubMenu={el.triggerSubMenu}
          showButton={el.showButton}
          suffixIcon={el.suffixIcon}
          onClick={el.onClick}
          open={openNavbarConnectedMenu}
          isOpenSubMenu={openNavbarSubMenu !== SubMenuKeys.none}
          setOpenSubMenu={onOpenNavbarSubMenu}
        />
      ))}

      <SubMenuComponent
        label={`${translate(`${i18Path}chains`)}`}
        isSubMenu={true}
        isScrollable={true}
        triggerSubMenu={SubMenuKeys.chains}
        open={openNavbarConnectedMenu}
        isOpenSubMenu={openNavbarSubMenu !== SubMenuKeys.none}
        setOpenSubMenu={onOpenNavbarSubMenu}
        subMenuList={_connectedSubMenuChains}
      />
    </NavbarMenu>
  ) : null;
};
