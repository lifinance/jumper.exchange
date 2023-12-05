import { supportedWallets, Wallet } from '@lifi/wallet-management';
import { Avatar, Theme, useMediaQuery, useTheme } from '@mui/material';
import { getContrastAlphaColor } from '@transferto/shared/src/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMultisig } from '../../hooks/useMultisig';
import { useWallet } from '../../providers/WalletProvider';
import { useMenuStore, useSettingsStore } from '../../stores';
import { MenuListItem } from '../../types';

export const useWalletSelectContent = () => {
  const isDesktopView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm'),
  );
  const theme = useTheme();
  const { t } = useTranslation();
  const [clientWallets, onClientWallets] = useSettingsStore((state) => [
    state.clientWallets,
    state.onClientWallets,
  ]);

  const [, setShowWalletIdentityPopover] = useState<Wallet>();
  const { connect, account } = useWallet();
  const [isCurrentMultisigEnvironment, setIsCurrentMultisigEnvironment] =
    useState(false);
  const onOpenSnackbar = useMenuStore((state) => state.onOpenSnackbar);

  const [availableWallets, setAvailableWallets] = useState<Wallet[]>([]);

  const { checkMultisigEnvironment } = useMultisig();

  const initializeWalletSelect = async () => {
    const isMultisig = await checkMultisigEnvironment();

    const walletsPromise = supportedWallets.map(
      async (wallet) => await wallet.installed(),
    );

    const walletsInstalled = await Promise.all(walletsPromise);

    // always remove Default Wallet from list
    const filteredWallets = supportedWallets.filter((wallet, index) => {
      walletsInstalled[index] && onClientWallets(wallet.name);
      return wallet.name !== 'Default Wallet';
    });

    let allowedWallets = filteredWallets.slice(0, 7);

    if (isDesktopView) {
      allowedWallets = filteredWallets;
    }

    setAvailableWallets(allowedWallets);

    if (isMultisig) {
      setIsCurrentMultisigEnvironment(true);
    } else {
      setIsCurrentMultisigEnvironment(false);
    }
  };

  const { onWalletConnect, onWelcomeScreenClosed } = useSettingsStore(
    (state) => ({
      onWalletConnect: state.onWalletConnect,
      onWelcomeScreenClosed: state.onWelcomeScreenClosed,
    }),
  );

  const onCloseAllNavbarMenus = useMenuStore(
    (state) => state.onCloseAllNavbarMenus,
  );

  const login = useCallback(
    async (wallet: Wallet) => {
      if (!wallet.installed()) {
        setShowWalletIdentityPopover(wallet);
        return;
      }
      await connect(wallet as Wallet | undefined);
      onWalletConnect(wallet.name);
      try {
      } catch (e) {}
    },
    [connect, onWalletConnect],
  );

  useEffect(() => {
    initializeWalletSelect();
    // fix: remove 'initializeWalletSelect' from dep´s to fix infinite loop / freeze
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.address]);

  const walletMenuItems = useMemo<MenuListItem[]>(() => {
    const walletsOptions: Wallet[] = availableWallets.filter((wallet) => {
      if (!isCurrentMultisigEnvironment) {
        return wallet.name !== 'Safe';
      }
      return true;
    });

    const handleClick = async (wallet: Wallet) => {
      if (clientWallets.includes(wallet.name)) {
        login(wallet);
        onCloseAllNavbarMenus();
        onWelcomeScreenClosed(true);
      } else {
        onCloseAllNavbarMenus();
        onOpenSnackbar(
          true,
          t('navbar.walletMenu.walletNotInstalled', { wallet: wallet.name }),
          'error',
        );

        console.error(`Wallet '${wallet.name}' is not installed`);
      }
    };

    const output = walletsOptions.map((wallet) => {
      return {
        label: wallet.name,
        prefixIcon: (
          <Avatar
            className="wallet-select-avatar"
            src={wallet.icon}
            alt={`${wallet.name}-wallet-logo`}
            sx={{
              height: '40px',
              width: '40px',
              objectFit: 'contain',
            }}
          />
        ),
        showMoreIcon: false,
        onClick: () => {
          handleClick(wallet);
        },
        styles: {
          '&:hover': {
            backgroundColor: getContrastAlphaColor(theme, '16%'),
          },
        },
      };
    });
    return output;
  }, [
    availableWallets,
    clientWallets,
    isCurrentMultisigEnvironment,
    login,
    onCloseAllNavbarMenus,
    onOpenSnackbar,
    onWelcomeScreenClosed,
    t,
    theme,
  ]);

  return walletMenuItems;
};
