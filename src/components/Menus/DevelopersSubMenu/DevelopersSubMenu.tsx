import { SubMenu } from '@/components/Menu/SubMenu';
import { MenuKeysEnum } from '@/const/menuKeys';
import { useClientTranslation } from '@/i18n/useClientTranslation';
import { useMenuStore } from '@/stores/menu';
import { useDevelopersContent } from '.';

export const DevelopersSubmenu = () => {
  const { t } = useClientTranslation();
  const subMenuDevelopers = useDevelopersContent();
  const openSubMenu = useMenuStore((state) => state.openSubMenu);
  return (
    <SubMenu
      label={t('navbar.navbarMenu.developers')}
      triggerSubMenu={MenuKeysEnum.Devs}
      open={openSubMenu === MenuKeysEnum.Devs}
      prevMenu={MenuKeysEnum.None}
      subMenuList={subMenuDevelopers}
    />
  );
};
