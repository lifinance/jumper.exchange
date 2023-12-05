import { useMenuStore } from '../stores';

export const usePopperIsOpened = () => {
  const [
    openMainNavbarMenu,
    openNavbarWalletMenu,
    openNavbarSubMenu,
    openNavbarChainsMenu,
    openNavbarWalletSelectMenu,
  ] = useMenuStore((state) => [
    state.openMainNavbarMenu,
    state.openNavbarWalletMenu,
    state.openNavbarSubMenu,
    state.openNavbarChainsMenu,
    state.openNavbarWalletSelectMenu,
  ]);

  return (
    openMainNavbarMenu ||
    openNavbarWalletMenu ||
    openNavbarSubMenu !== 'None' ||
    openNavbarChainsMenu ||
    openNavbarWalletSelectMenu
  );
};
