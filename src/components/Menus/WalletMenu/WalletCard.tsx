import type { Chain } from '@lifi/sdk';
import { getConnectorIcon } from '@lifi/wallet-management';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Skeleton, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button } from 'src/components';
import { TrackingAction, TrackingCategory } from 'src/const';
import { useChains, useMultisig, useUserTracking } from 'src/hooks';
import type { Account } from 'src/hooks/useAccounts';
import { useAccountDisconnect } from 'src/hooks/useAccounts';
import { useMenuStore } from 'src/stores';
import { EventTrackingTool } from 'src/types';
import { openInNewTab, walletDigest } from 'src/utils';
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
  const { trackPageload, trackEvent } = useUserTracking();
  const { chains } = useChains();
  const { checkMultisigEnvironment } = useMultisig();
  const [isMultisigEnvironment, setIsMultisigEnvironment] = useState(false);

  const activeChain = useMemo(
    () => chains?.find((chainEl: Chain) => chainEl.id === account.chainId),
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
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    if (account.blockChainExplorerUrl) {
      trackPageload({
        source: TrackingCategory.Wallet,
        destination: 'blokchain-explorer',
        url: account.blockChainExplorerUrl || '',
        pageload: true,
        disableTrackingTool: [EventTrackingTool.Cookie3],
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
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    closeAllMenus();
  };

  const handleDisconnect = () => {
    disconnectWallet(account);
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
