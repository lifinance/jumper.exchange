import type { Chain } from '@lifi/types';
import { supportedWallets } from '@lifi/wallet-management';
import type { Breakpoint } from '@mui/material';
import { Typography, useTheme } from '@mui/material';
import { Button } from '@transferto/dapp/src/components';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@transferto/dapp/src/const';
import { useUserTracking } from '@transferto/dapp/src/hooks';
import { useChains } from '@transferto/dapp/src/hooks/useChains';
import { useMenuStore } from '@transferto/dapp/src/stores';
import { EventTrackingTool } from '@transferto/dapp/src/types';
import type { ReactElement } from 'react';
import React, { useMemo } from 'react';
import {
  WalletMgmtAvatarContainer,
  WalletMgmtChainAvatar,
  WalletMgmtWalletAvatar,
} from '.';
import { walletDigest } from '../../utils/walletDigest';

interface WalletManagementButtonsProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  walletConnected?: boolean;
  connectButtonLabel?: ReactElement<any, any>;
  isSuccess: boolean;
  walletManagement: any;
}

export const WalletManagementButtons: React.FC<
  WalletManagementButtonsProps
> = ({ walletManagement, connectButtonLabel, isSuccess }) => {
  const theme = useTheme();
  const { chains } = useChains();
  const { trackEvent } = useUserTracking();
  const { account, usedWallet } = walletManagement;
  const _walletDigest = useMemo(() => {
    return walletDigest(account);
  }, [account]);
  const activeChain = useMemo(
    () => chains?.find((chainEl: Chain) => chainEl.id === account.chainId),
    [chains, account.chainId],
  );
  const [
    openNavbarWalletSelectMenu,
    onOpenNavbarWalletSelectMenu,
    openNavbarWalletMenu,
    onOpenNavbarWalletMenu,
  ] = useMenuStore((state) => [
    state.openNavbarWalletSelectMenu,
    state.onOpenNavbarWalletSelectMenu,
    state.openNavbarWalletMenu,
    state.onOpenNavbarWalletMenu,
  ]);

  const walletSource = supportedWallets;
  const walletIcon: string = useMemo(() => {
    if (!!usedWallet) {
      return usedWallet.icon;
    } else {
      for (const key in Object.keys(walletSource)) {
        if (walletSource.hasOwnProperty(key)) {
          let value = walletSource[key];
          if (value.name === localStorage.activeWalletName) {
            return value.icon;
          }
        }
      }
    }
  }, [usedWallet, walletSource]);

  const handleWalletSelectClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    !openNavbarWalletSelectMenu &&
      trackEvent({
        category: TrackingCategory.WalletSelectMenu,
        action: TrackingAction.OpenMenu,
        label: 'open_wallet_select_menu',
        data: { [TrackingEventParameter.Menu]: 'wallet_select_menu' },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    onOpenNavbarWalletSelectMenu(
      !openNavbarWalletSelectMenu,
      event.currentTarget,
    );
  };

  const handleWalletMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    openNavbarWalletMenu &&
      trackEvent({
        category: TrackingCategory.WalletMenu,
        action: TrackingAction.OpenMenu,
        label: 'open_wallet_menu',
        data: { [TrackingEventParameter.Menu]: 'wallet_menu' },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    onOpenNavbarWalletMenu(!openNavbarWalletMenu, event.currentTarget);
  };

  return !account.address ? (
    // Connect/WalletSelect-Button -->
    <Button
      // Used in the widget
      variant="primary"
      id="connect-wallet-button"
      onClick={handleWalletSelectClick}
      styles={{
        display: 'none',
        [theme.breakpoints.up('sm' as Breakpoint)]: {
          padding: theme.spacing(3),
          display: 'inline-flex !important',
        },
      }}
    >
      {connectButtonLabel}
    </Button>
  ) : (
    // Wallet-Menu-Button -->
    <Button
      variant="secondary"
      styles={{
        display: 'flex',
        placeContent: 'space-between',
        justifyContent: 'center',
        margin: 'auto',
        position: 'relative',
        p: '6px',
        pr: theme.spacing(2),
        width: 'auto',
      }}
      onClick={handleWalletMenuClick}
    >
      {isSuccess && activeChain ? (
        <WalletMgmtAvatarContainer>
          <WalletMgmtWalletAvatar src={walletIcon} />
          <WalletMgmtChainAvatar
            src={activeChain.logoURI || 'empty'}
            alt={`${activeChain.name}chain-logo`}
          />
        </WalletMgmtAvatarContainer>
      ) : null}
      <Typography variant={'lifiBodyMediumStrong'} width={'auto'}>
        {_walletDigest}
      </Typography>
    </Button>
  );
};
