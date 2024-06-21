import { Avatar } from '@/components/Avatar/Avatar';
import { Button } from '@/components/Button/Button';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import type { Account } from '@/hooks/useAccounts';
import { useAccountDisconnect } from '@/hooks/useAccounts';
import { useChains } from '@/hooks/useChains';
import { useMultisig } from '@/hooks/useMultisig';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu';
import { openInNewTab } from '@/utils/openInNewTab';
import { walletDigest } from '@/utils/walletDigest';
import { getConnectorIcon } from '@lifi/wallet-management';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Skeleton, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  WalletAvatar,
  WalletCardBadge,
  WalletCardButtonContainer,
  WalletCardContainer,
} from './WalletMenu.style';

interface WalletCardProps {
  account: Account;
}

export const WalletCard = ({ account }: WalletCardProps) => {
  const { t } = useTranslation();
  const disconnectWallet = useAccountDisconnect();
  const { trackEvent } = useUserTracking();
  const { chains } = useChains();
  const { checkMultisigEnvironment } = useMultisig();
  const [isMultisigEnvironment, setIsMultisigEnvironment] = useState(false);

  const activeChain = useMemo(
    () => chains?.find((chainEl) => chainEl.id === account.chainId),
    [chains, account.chainId],
  );
  const { closeAllMenus, setSnackbarState } = useMenuStore((state) => state);

  const handleMultisigEnvironmentCheck = useCallback(async () => {
    const response = await checkMultisigEnvironment();

    setIsMultisigEnvironment(response);
    // Check MultisigEnvironment only on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleMultisigEnvironmentCheck();
  }, [account, handleMultisigEnvironmentCheck]);

  const handleExploreButton = () => {
    account.chainId && closeAllMenus();

    trackEvent({
      category: TrackingCategory.WalletMenu,
      action: TrackingAction.OpenBlockchainExplorer,
      label: 'open-blockchain-explorer-wallet',
    });
    if (account.blockChainExplorerUrl) {
      trackEvent({
        category: TrackingCategory.Pageload,
        action: TrackingAction.PageLoad,
        label: 'pageload-explorer',
        data: {
          [TrackingEventParameter.PageloadSource]: TrackingCategory.Wallet,
          [TrackingEventParameter.PageloadDestination]: 'blokchain-explorer',
          [TrackingEventParameter.PageloadURL]:
            account.blockChainExplorerUrl || '',
          [TrackingEventParameter.PageloadExternal]: true,
        },
      });
      openInNewTab(account.blockChainExplorerUrl);
    }
  };

  const handleCopyButton = () => {
    if (isMultisigEnvironment) {
      return;
    }
    account.address && navigator.clipboard.writeText(account.address);
    setSnackbarState(true, t('navbar.walletMenu.copiedMsg'), 'success');
    trackEvent({
      category: TrackingCategory.WalletMenu,
      action: TrackingAction.CopyAddressToClipboard,
      label: 'copy_addr_to_clipboard',
    });
    closeAllMenus();
  };

  const handleDisconnect = () => {
    disconnectWallet(account);
    trackEvent({
      category: TrackingCategory.WalletMenu,
      action: TrackingAction.DisconnectWallet,
      label: 'disconnect_wallet',
    });
  };

  return (
    <WalletCardContainer>
      <Stack direction={'row'} spacing={4} sx={{ margin: 'auto' }}>
        <WalletCardBadge
          overlap="circular"
          className="badge"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            activeChain?.logoURI ? (
              <Avatar
                size="large"
                src={activeChain?.logoURI || ''}
                alt={'wallet-avatar'}
              >
                {/* {activeChain.name[0]} */}
              </Avatar>
            ) : (
              <Skeleton variant="circular" />
            )
          }
        >
          <WalletAvatar src={getConnectorIcon(account.connector)} />
        </WalletCardBadge>
        <WalletCardButtonContainer>
          <Button
            variant="transparent"
            size="medium"
            disabled={isMultisigEnvironment}
            styles={{ width: '100%', gridColumn: '1/3', gridRow: '1/2' }}
            onClick={() => handleCopyButton()}
          >
            <Typography variant="lifiBodySmallStrong">
              {walletDigest(account.address)}
            </Typography>
          </Button>
          <Button
            variant="transparent"
            size="medium"
            onClick={() => handleExploreButton()}
            styles={{
              gridColumn: '1/2',
              gridRow: '2/3',
            }}
          >
            <OpenInNewIcon sx={{ height: '20px' }} />
          </Button>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => handleDisconnect()}
          >
            <PowerSettingsNewIcon sx={{ height: '20px' }} />
          </Button>
        </WalletCardButtonContainer>
      </Stack>
    </WalletCardContainer>
  );
};
