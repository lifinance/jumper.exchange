import { MenuState, SnackbarProps } from '@transferto/shared/src/types';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { MenuKeys } from '../../const';

interface DefaultMenuType {
  openMainNavbarMenu: boolean;
  openNavbarWalletMenu: boolean;
  openNavbarChainsMenu: boolean;
  openNavbarWalletSelectMenu: boolean;
  openNavbarSubMenu: keyof typeof MenuKeys;
  openSupportModal: boolean;
  openSnackbar: SnackbarProps;
  anchorRef: null | JSX.Element;
}

export const defaultMenu: DefaultMenuType = {
  openMainNavbarMenu: false,
  openNavbarWalletMenu: false,
  openNavbarChainsMenu: false,
  openNavbarWalletSelectMenu: false,
  openNavbarSubMenu: 'None',
  openSupportModal: false,
  openSnackbar: { open: false, label: undefined, severity: undefined },
  anchorRef: null,
};

export const useMenuStore = createWithEqualityFn<MenuState>(
  (set, get) => ({
    ...defaultMenu,
    setValue: (key: keyof MenuState, value: any) =>
      set(() => ({
        [key]: value,
      })),
    setValues: (values: { [x: string]: any }) =>
      set((state: MenuState) => {
        const updatedState: { [key: string]: any } = { ...state };
        for (const key in values) {
          if (Object.hasOwnProperty.call(values, key)) {
            updatedState[key] = values[key];
          }
        }
        return updatedState;
      }),

    // Close ALL Navbar Menus
    onCloseAllNavbarMenus: () => {
      set({
        openMainNavbarMenu: false,
        openNavbarWalletSelectMenu: false,
        openNavbarWalletMenu: false,
        openNavbarChainsMenu: false,
        openNavbarSubMenu: MenuKeys.None,
        openSupportModal: false,
        anchorRef: null,
      });
    },

    // Toggle Navbar Main Menu
    onOpenNavbarMainMenu: (open, anchorRef) => {
      set({
        openMainNavbarMenu: open,
        openNavbarSubMenu: MenuKeys.None,
        anchorRef: open ? anchorRef : null,
      });
    },

    // Toggle Navbar Wallet Menu
    onOpenNavbarWalletSelectMenu: (open, anchorRef) => {
      set({
        openNavbarWalletSelectMenu: open,
        openNavbarSubMenu: MenuKeys.None,
        anchorRef: open ? anchorRef : null,
      });
    },

    // Toggle Navbar Connected Menu
    onOpenNavbarWalletMenu: (open, anchorRef) => {
      set({
        openNavbarWalletMenu: open,
        openNavbarSubMenu: MenuKeys.None,
        anchorRef: open ? anchorRef : null,
      });
    },

    // Toggle Navbar Chains Menu
    onOpenNavbarChainsMenu: (open, anchorRef) => {
      set({
        openNavbarChainsMenu: open,
        openNavbarSubMenu: MenuKeys.None,
        anchorRef: open ? anchorRef : null,
      });
    },

    // Toggle Navbar Sub Menu
    onOpenNavbarSubMenu: (subMenu) => {
      set({
        openNavbarSubMenu: subMenu,
      });
    },

    // Open Snackbar and set label
    onOpenSnackbar: (open, label, severity) => {
      set((state) => ({
        ...state,
        openSnackbar: {
          open: open,
          label: label || state.openSnackbar.label,
          severity: severity || state.openSnackbar.severity,
        },
      }));
    },

    // Toggle support modal
    onOpenSupportModal: (open) => {
      set({
        openMainNavbarMenu: false,
        openNavbarChainsMenu: false,
        openNavbarWalletSelectMenu: false,
        openNavbarWalletMenu: false,
        openSupportModal: open,
        openNavbarSubMenu: MenuKeys.None,
      });
    },
  }),
  shallow,
);
