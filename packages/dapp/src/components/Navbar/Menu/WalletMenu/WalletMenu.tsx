import { supportedWallets } from '@lifi/wallet-management';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Breakpoint, Grid, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {
  MenuKeys,
  TrackingAction,
  TrackingCategory,
} from '@transferto/dapp/src/const';
import {
  useBlockchainExplorerURL,
  useUserTracking,
} from '@transferto/dapp/src/hooks';
import { useWallet } from '@transferto/dapp/src/providers/WalletProvider';
import { useSettingsStore } from '@transferto/dapp/src/stores';
import { useMenuStore } from '@transferto/dapp/src/stores/menu';
import { EventTrackingTool } from '@transferto/dapp/src/types';
import { SpotButton } from '@transferto/shared/src/atoms';
import { openInNewTab, walletDigest } from '@transferto/shared/src/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMultisig } from '../../../../hooks/useMultisig';
import { NavbarMenu } from '../../index';
import { useIsCyberConnectEnvironment } from '../../../../hooks/useCyberConnectWallet';

interface NavbarMenuProps {
  handleClose: (event: MouseEvent | TouchEvent) => void;
}
export const WalletMenu = ({ handleClose }: NavbarMenuProps) => {
  const { checkMultisigEnvironment } = useMultisig();
  const isCyberConnectEnvironment = useIsCyberConnectEnvironment();
  const { t } = useTranslation();
  const theme = useTheme();
  const blockchainExplorerURL = useBlockchainExplorerURL();
  const { account, usedWallet, disconnect } = useWallet();
  const { trackPageload, trackEvent } = useUserTracking();
  const [isMultisigEnvironment, setIsMultisigEnvironment] = useState(false);

  const walletSource = supportedWallets;

  const [
    openNavbarWalletMenu,
    onOpenNavbarWalletMenu,
    onOpenSnackbar,
    openNavbarSubMenu,
    onCloseAllNavbarMenus,
  ] = useMenuStore((state) => [
    state.openNavbarWalletMenu,
    state.onOpenNavbarWalletMenu,
    state.onOpenSnackbar,
    state.openNavbarSubMenu,
    state.onCloseAllNavbarMenus,
  ]);

  const onWalletDisconnect = useSettingsStore(
    (state) => state.onWalletDisconnect,
  );

  const walletIcon: string = useMemo(() => {
    if (!!usedWallet) {
      return usedWallet.icon;
    } else {
      const walletKey: any = Object.keys(walletSource).filter(
        (el: string, index: number) =>
          walletSource[index].name === localStorage.activeWalletName,
      );
      return walletSource[walletKey]?.icon || '';
    }
  }, [usedWallet, walletSource]);

  const _walletDigest = useMemo(() => {
    return walletDigest(account);
  }, [account]);

  const handleExploreButton = () => {
    account.chainId && onCloseAllNavbarMenus();

    trackEvent({
      category: TrackingCategory.WalletMenu,
      action: TrackingAction.OpenBlockchainExplorer,
      label: 'open-blockchain-explorer-wallet',
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    if (blockchainExplorerURL) {
      trackPageload({
        source: TrackingCategory.Wallet,
        destination: 'blokchain-explorer',
        url: blockchainExplorerURL || '',
        pageload: true,
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
      openInNewTab(blockchainExplorerURL);
    }
  };

  const handleCopyButton = () => {
    account.address && navigator.clipboard.writeText(account.address);
    onOpenSnackbar(true, t('navbar.walletMenu.copiedMsg'), 'success');
    trackEvent({
      category: TrackingCategory.WalletMenu,
      action: TrackingAction.CopyAddressToClipboard,
      label: 'copy_addr_to_clipboard',
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    onCloseAllNavbarMenus();
  };

  const handleDisconnectButton = () => {
    disconnect();
    onCloseAllNavbarMenus();
    onWalletDisconnect();
  };

  const handleMultisigEnvironmentCheck = useCallback(async () => {
    const isMultiSig = await checkMultisigEnvironment();

    // Check MultisigEnvironment only on first render
    setIsMultisigEnvironment(isMultiSig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    openNavbarWalletMenu! && onOpenSnackbar(false);
  }, [onOpenSnackbar, openNavbarWalletMenu]);

  useEffect(() => {
    handleMultisigEnvironmentCheck();
  }, [account, handleMultisigEnvironmentCheck]);

  const isSmartContractWalletEnv =
    isMultisigEnvironment || isCyberConnectEnvironment;

  return openNavbarWalletMenu ? (
    <NavbarMenu
      open
      transformOrigin={'top left'}
      setOpen={onOpenNavbarWalletMenu}
      handleClose={handleClose}
      isOpenSubMenu={openNavbarSubMenu !== MenuKeys.None}
    >
      <Grid
        container
        m={`${theme.spacing(3)} auto !important`}
        sx={{
          maxWidth: '360px',
          [theme.breakpoints.up('sm' as Breakpoint)]: {
            maxWidth: 'auto',
          },
        }}
      >
        <Grid item xs={12} textAlign={'center'} mb={theme.spacing(3)}>
          <Avatar
            src={walletIcon}
            sx={{
              padding: theme.spacing(2.25),
              background:
                theme.palette.mode === 'light'
                  ? theme.palette.black.main
                  : theme.palette.white.main,
              margin: 'auto',
              height: '96px',
              width: '96px',
            }}
          />
          <Typography variant="lifiBodyLargeStrong" mt={theme.spacing(2)}>
            {_walletDigest}
          </Typography>
        </Grid>
        {!isSmartContractWalletEnv && (
          <Grid item xs={4}>
            <SpotButton name="Copy" onClick={handleCopyButton}>
              <ContentCopyIcon />
            </SpotButton>
          </Grid>
        )}
        <Grid item xs={!isSmartContractWalletEnv ? 4 : 6}>
          <SpotButton name="Explore" onClick={handleExploreButton}>
            <LaunchIcon />
          </SpotButton>
        </Grid>
        <Grid item xs={!isSmartContractWalletEnv ? 4 : 6}>
          <SpotButton
            name={t('navbar.walletMenu.disconnect')}
            variant={'primary'}
            onClick={handleDisconnectButton}
          >
            <PowerSettingsNewIcon />
          </SpotButton>
        </Grid>
      </Grid>
    </NavbarMenu>
  ) : null;
};
