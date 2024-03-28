import type { CombinedWallet } from './../hooks/useCombinedWallets';
// ----------------------------------------------------------------------

import type { MenuKeys, MenuKeysEnum } from '@/const/menuKeys';

type SnackbarSeverityType = 'error' | 'warning' | 'info' | 'success';

export interface SnackbarProps {
  open: boolean;
  label?: string;
  severity?: SnackbarSeverityType | undefined;
}

export interface EcosystemSelectMenuProps {
  open: boolean;
  combinedWallet?: CombinedWallet;
}

export type MenuProps = {
  openMainMenu: boolean;
  openWalletSelectMenu: boolean;
  openWalletMenu: boolean;
  openSubMenu: keyof typeof MenuKeysEnum;
  openSnackbar: SnackbarProps;
  openSupportModal: boolean;
  openEcosystemSelect: EcosystemSelectMenuProps;
};
export interface MenuState extends MenuProps {
  // Close ALL Navbar Menus
  closeAllMenus: () => void;

  // Toggle Main Menu
  setMainMenuState: (open: boolean) => void;
  // Toggle Wallet Menu
  setWalletMenuState: (open: boolean) => void;
  // Toggle Wallet Selection Menu
  setWalletSelectMenuState: (open: boolean) => void;
  // Toggle Ecosystem Select Menu
  setEcosystemSelectMenuState: (
    open: boolean,
    combinedWallet?: CombinedWallet,
  ) => void;

  // Toggle Sub Menu
  setSubMenuState: (subMenu: keyof typeof MenuKeys) => void;

  // Open Snackbar and set label
  setSnackbarState: (
    open: boolean,
    label?: string,
    severity?: SnackbarSeverityType,
  ) => void;

  // Toggle support modal
  setSupportModalState: (open: boolean) => void;
}
