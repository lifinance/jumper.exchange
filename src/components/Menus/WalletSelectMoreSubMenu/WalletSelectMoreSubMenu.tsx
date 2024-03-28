import { SubMenu } from '@/components/Menu/SubMenu';
import { MenuKeysEnum } from '@/const/menuKeys';
import { useClientTranslation } from '@/i18n/useClientTranslation';
import { useMenuStore } from '@/stores/menu';
import { useWalletSelectContent } from '..';

export const WalletSelectMoreSubMenu = () => {
  const { t } = useClientTranslation();
  const walletSelectMenuItems = useWalletSelectContent();
  const openSubMenu = useMenuStore((state) => state.openSubMenu);

  return (
    <SubMenu
      label={t('navbar.walletSelectMenu.wallets')}
      triggerSubMenu={MenuKeysEnum.WalletSelectMore}
      open={openSubMenu === MenuKeysEnum.WalletSelectMore}
      prevMenu={MenuKeysEnum.None}
      subMenuList={walletSelectMenuItems}
    />
  );
};
