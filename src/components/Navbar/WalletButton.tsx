'use client';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useAccounts } from '@/hooks/useAccounts';
import { useChains } from '@/hooks/useChains';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu';
import { walletDigest } from '@/utils/walletDigest';
import type { Chain } from '@lifi/types';
import { getConnectorIcon } from '@lifi/wallet-management';
import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ConnectButton,
  WalletMenuButton,
  WalletMgmtBadge,
  WalletMgmtChainAvatar,
  WalletMgmtWalletAvatar,
} from '.';

export const WallettButtons = () => {
  const { chains } = useChains();
  const { trackEvent } = useUserTracking();
  const { account } = useAccounts();
  const { t } = useTranslation();
  const { isSuccess } = useChains();

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
    !openWalletSelectMenu &&
      trackEvent({
        category: TrackingCategory.WalletSelectMenu,
        action: TrackingAction.OpenMenu,
        label: 'open_wallet_select_menu',
        data: { [TrackingEventParameter.Menu]: 'wallet_select_menu' },
        enableAddressable: true,
      });
    setWalletSelectMenuState(!openWalletSelectMenu);
  };

  const handleWalletMenuClick = () => {
    openWalletMenu &&
      trackEvent({
        category: TrackingCategory.WalletMenu,
        action: TrackingAction.OpenMenu,
        label: 'open_wallet_menu',
        data: { [TrackingEventParameter.Menu]: 'wallet_menu' },
      });
    setWalletMenuState(!openWalletMenu);
  };

  return (
    <>
      {!account?.address ? (
        <ConnectButton
          // Used in the widget
          id="connect-wallet-button"
          onClick={(event) => {
            event.stopPropagation();
            handleWalletSelectClick();
          }}
        >
          <Typography
            variant={'lifiBodyMediumStrong'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {t('navbar.connect')}
          </Typography>
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
    </>
  );
};
