import { SubMenu } from '@/components/Menu/SubMenu';
import { MenuKeysEnum } from '@/const/menuKeys';
import { useClientTranslation } from '@/i18n/useClientTranslation';
import { useMenuStore } from '@/stores/menu';
import { useLanguagesContent } from '.';

export const LanguagesSubmenu = () => {
  const { t } = useClientTranslation();
  const subMenuLanguages = useLanguagesContent();
  const openSubMenu = useMenuStore((state) => state.openSubMenu);

  return (
    <SubMenu
      label={t('language.key', { ns: 'language' })}
      triggerSubMenu={MenuKeysEnum.Language}
      open={openSubMenu === MenuKeysEnum.Language}
      prevMenu={MenuKeysEnum.None}
      subMenuList={subMenuLanguages}
    />
  );
};
