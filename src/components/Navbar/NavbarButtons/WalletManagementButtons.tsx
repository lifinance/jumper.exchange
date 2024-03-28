'use client';
import { EcosystemSelectMenu } from '@/components/Menus/EcosystemSelectMenu';
import { WalletMenu } from '@/components/Menus/WalletMenu';
import { WalletSelectMenu } from '@/components/Menus/WalletSelectMenu';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useAccounts } from '@/hooks/useAccounts';
import { useChains } from '@/hooks/useChains';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu';
import { EventTrackingTool } from '@/types/userTracking';
import { walletDigest } from '@/utils/walletDigest';
import type { Chain } from '@lifi/types';
import { getConnectorIcon } from '@lifi/wallet-management';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { ReactElement } from 'react';
import React, { useMemo, useRef } from 'react';
import {
  ConnectButton,
  WalletMenuButton,
  WalletMgmtBadge,
  WalletMgmtChainAvatar,
  WalletMgmtWalletAvatar,
} from '.';

interface WalletManagementButtonsProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
  walletConnected?: boolean;
  redirectToLearn?: boolean;
  connectButtonLabel?: ReactElement<any, any>;
  isSuccess: boolean;
}

export const WalletManagementButtons: React.FC<
  WalletManagementButtonsProps
> = ({ connectButtonLabel, redirectToLearn, isSuccess }) => {
  const { chains } = useChains();
  const { trackEvent } = useUserTracking();
  const router = useRouter();
  const { account } = useAccounts();
  const walletManagementButtonsRef = useRef<any>();

  const {
    openWalletSelectMenu,
    setWalletSelectMenuState,
    openWalletMenu,
    setWalletMenuState,
  } = useMenuStore((state) => state);

  const _walletDigest = useMemo(() => {
    return walletDigest(account?.address);
  }, [account?.address]);

  const activeChain = useMemo(
    () => chains?.find((chainEl: Chain) => chainEl.id === account?.chainId),
    [chains, account?.chainId],
  );

  const handleWalletSelectClick = () => {
    if (redirectToLearn) {
      router.push('/');
      trackEvent({
        category: TrackingCategory.WalletSelectMenu,
        action: TrackingAction.ClickConnectToWidget,
        label: 'click_connect_wallet_on_jumper_learn',
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    } else {
      !openWalletSelectMenu &&
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
      setWalletSelectMenuState(!openWalletSelectMenu);
    }
  };

  const handleWalletMenuClick = () => {
    openWalletMenu &&
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
    setWalletMenuState(!openWalletMenu);
  };

  return (
    <>
      <div ref={walletManagementButtonsRef}>
        {!account?.address || redirectToLearn ? (
          <ConnectButton
            // Used in the widget
            id="connect-wallet-button"
            onClick={handleWalletSelectClick}
          >
            {connectButtonLabel}
          </ConnectButton>
        ) : (
          <WalletMenuButton
            id="wallet-digest-button"
            onClick={handleWalletMenuClick}
          >
            {isSuccess && activeChain ? (
              <WalletMgmtBadge
                overlap="circular"
                className="badge"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <WalletMgmtChainAvatar
                    src={activeChain?.logoURI || ''}
                    alt={'wallet-avatar'}
                  >
                    {activeChain.name[0]}
                  </WalletMgmtChainAvatar>
                }
              >
                <WalletMgmtWalletAvatar
                  src={getConnectorIcon(account.connector)}
                />
              </WalletMgmtBadge>
            ) : null}
            <Typography
              variant={'lifiBodyMediumStrong'}
              width={'auto'}
              marginRight={0.25}
              marginLeft={0.75}
            >
              {_walletDigest}
            </Typography>
          </WalletMenuButton>
        )}
      </div>
      <WalletMenu anchorEl={walletManagementButtonsRef.current} />
      <WalletSelectMenu anchorEl={walletManagementButtonsRef.current} />
      <EcosystemSelectMenu anchorEl={walletManagementButtonsRef.current} />
    </>
  );
};
