import { Menu } from '@/components/Menu/Menu';
import { MenuItem } from '@/components/Menu/MenuItem';
import { MenuKeysEnum } from '@/const/menuKeys';
import { useMenuStore } from '@/stores/menu';
import type { JsxElement } from 'typescript';
import { DevelopersSubmenu, LanguagesSubmenu, useMainMenuContent } from '..';

interface MenuProps {
  anchorEl: any;
}

export const MainMenu = ({ anchorEl }: MenuProps) => {
  const mainMenuItems = useMainMenuContent();
  const { openMainMenu, setMainMenuState, openSubMenu } = useMenuStore(
    (state) => state,
  );

  return (
    <Menu
      open={openMainMenu}
      setOpen={setMainMenuState}
      isOpenSubMenu={openSubMenu !== MenuKeysEnum.None}
      anchorEl={anchorEl}
    >
      {openSubMenu === MenuKeysEnum.None &&
        mainMenuItems.map((el, index) => (
          <MenuItem
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

      <LanguagesSubmenu />
      <DevelopersSubmenu />
    </Menu>
  );
};
