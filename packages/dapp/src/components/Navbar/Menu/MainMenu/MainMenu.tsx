import {
  MenuKeys,
  useDevelopersContent,
  useLanguagesContent,
  useMainMenuContent,
} from '@transferto/dapp/src/const';
import { useMenuStore } from '@transferto/dapp/src/stores';
import { useTranslation } from 'react-i18next';
import { JsxElement } from 'typescript';
import { MenuItemComponent, NavbarMenu, SubMenuComponent } from '../../index';
interface MainMenuProps {
  handleClose: (event: MouseEvent | TouchEvent) => void;
}

export const MainMenu = ({ handleClose }: MainMenuProps) => {
  const { t } = useTranslation();
  const mainMenuItems = useMainMenuContent();
  const subMenuDevelopers = useDevelopersContent();
  const subMenuLanguage = useLanguagesContent();
  const [openMainNavbarMenu, onOpenNavbarMainMenu, openNavbarSubMenu] =
    useMenuStore((state) => [
      state.openMainNavbarMenu,
      state.onOpenNavbarMainMenu,
      state.openNavbarSubMenu,
    ]);

  return openMainNavbarMenu ? (
    <NavbarMenu
      handleClose={handleClose}
      open
      transformOrigin={'top right'}
      setOpen={onOpenNavbarMainMenu}
      isOpenSubMenu={openNavbarSubMenu !== MenuKeys.None}
    >
      {openNavbarSubMenu === MenuKeys.None &&
        mainMenuItems.map((el, index) => (
          <MenuItemComponent
            key={`${el.label}-${index}`}
            autoFocus={index > 0 ? true : false}
            label={el.label}
            prefixIcon={el.prefixIcon}
            styles={el.styles}
            children={el.children as unknown as JsxElement}
            triggerSubMenu={el.triggerSubMenu}
            showButton={el.showButton}
            disableRipple={el.disableRipple}
            showMoreIcon={el.showMoreIcon}
            suffixIcon={el.suffixIcon}
            onClick={el.onClick}
            open
          />
        ))}

      <SubMenuComponent
        label={t('language.key', { ns: 'language' })}
        triggerSubMenu={MenuKeys.Language}
        open={openNavbarSubMenu === MenuKeys.Language}
        prevMenu={MenuKeys.None}
        subMenuList={subMenuLanguage}
      />

      <SubMenuComponent
        label={t('navbar.navbarMenu.developers')}
        triggerSubMenu={MenuKeys.Devs}
        open={openNavbarSubMenu === MenuKeys.Devs}
        prevMenu={MenuKeys.None}
        subMenuList={subMenuDevelopers}
      />
    </NavbarMenu>
  ) : null;
};
