'use client';
import { useAccountConnect } from '@/hooks/useAccounts';
import type { CombinedWallet } from '@/hooks/useCombinedWallets';
import { useCombinedWallets } from '@/hooks/useCombinedWallets';
import { useMenuStore } from '@/stores/menu';
import type { MenuListItem } from '@/types/internal';
import { getContrastAlphaColor } from '@/utils/colors';
import {
  getConnectorIcon,
  isWalletInstalled,
  isWalletInstalledAsync,
} from '@lifi/wallet-management';
import type { Theme } from '@mui/material';
import { Avatar, useMediaQuery, useTheme } from '@mui/material';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useCallback, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { TrackingAction, TrackingCategory } from 'src/const/trackingKeys';
import { useUserTracking } from 'src/hooks/userTracking';
import { EventTrackingTool } from 'src/types/userTracking';

export const useWalletSelectContent = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const { combinedInstalledWallets, combinedNotDetectedWallets } =
    useCombinedWallets();
  const isDesktopView = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm'),
  );
  const connect = useAccountConnect();
  const [, setCookie] = useCookies(['welcomeScreenClosed']);

  const { setSnackbarState, closeAllMenus, setEcosystemSelectMenuState } =
    useMenuStore((state) => state);

  const availableWallets = useMemo(() => {
    let allowedWallets = combinedInstalledWallets.slice(0, 7);

    if (isDesktopView) {
      allowedWallets = [
        ...combinedInstalledWallets,
        ...combinedNotDetectedWallets,
      ];
    }

    return allowedWallets;
  }, [combinedInstalledWallets, combinedNotDetectedWallets, isDesktopView]);

  const connectWallet = useCallback(
    async (combinedWallet: CombinedWallet) => {
      if (combinedWallet.evm && combinedWallet.svm) {
        setEcosystemSelectMenuState(true, combinedWallet);
        return;
      } else if (combinedWallet.evm || combinedWallet.svm) {
        await connect(combinedWallet);
      } else {
        setSnackbarState(
          true,
          t('navbar.walletSelectMenu.ecosystemSelectMenu.noEcosystemAdapter'),
          'error',
        );
      }
      closeAllMenus();
      setCookie('welcomeScreenClosed', true, { path: '/', sameSite: true });
    },
    [
      closeAllMenus,
      setCookie,
      setEcosystemSelectMenuState,
      connect,
      setSnackbarState,
      t,
    ],
  );

  const walletMenuItems = useMemo<MenuListItem[]>(() => {
    const handleWalletClick = async (combinedWallet: CombinedWallet) => {
      if (
        isWalletInstalled(combinedWallet.evm?.id || '') ||
        (await isWalletInstalledAsync(combinedWallet.evm?.id || '')) ||
        (combinedWallet.svm &&
          combinedWallet.svm.adapter.readyState === WalletReadyState.Installed)
      ) {
        connectWallet(combinedWallet);
      } else {
        closeAllMenus();
        setSnackbarState(
          true,
          t('navbar.walletMenu.walletNotInstalled', {
            wallet:
              (combinedWallet.evm?.id || combinedWallet.svm?.adapter.name) ??
              '',
          }),
          'error',
        );
      }
    };

    const output = availableWallets.map((combinedWallet) => {
      console.log('Metamask?', navigator.userAgent.includes('MetaMaskMobile'));
      console.log('Phantom?', navigator.userAgent.includes('Phantom'));

      return {
        label:
          (combinedWallet.evm?.name || combinedWallet.svm?.adapter.name) ?? '',
        prefixIcon: (
          <Avatar
            className="wallet-select-avatar"
            src={
              getConnectorIcon(combinedWallet.evm) ||
              combinedWallet.evm?.icon ||
              combinedWallet.svm?.adapter.icon
            }
            alt={`${
              combinedWallet.evm?.id || combinedWallet.svm?.adapter.name
            }-wallet-logo`}
            sx={{
              height: 40,
              width: 40,
              objectFit: 'contain',
            }}
          />
        ),
        showMoreIcon: false,
        onClick: () => {
          handleWalletClick(combinedWallet);
          trackEvent({
            category: TrackingCategory.WalletSelectMenu,
            action: TrackingAction.ConnectWallet,
            label: 'click_connect_wallet',
            data: {
              wallet:
                (combinedWallet.evm?.name ||
                  combinedWallet.svm?.adapter.name) ??
                '',
            },
            enableAddressable: true,
            disableTrackingTool: [
              EventTrackingTool.ARCx,
              EventTrackingTool.Cookie3,
            ],
          });
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
    connectWallet,
    closeAllMenus,
    setSnackbarState,
    t,
    theme,
    trackEvent,
  ]);

  return walletMenuItems;
};
