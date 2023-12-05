import type { Chain } from '@lifi/types';
import { supportedWallets } from '@lifi/wallet-management';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {
  Breakpoint,
  Grid,
  Typography,
  darken,
  lighten,
  useTheme,
} from '@mui/material';
import {
  MenuKeys,
  TrackingAction,
  TrackingCategory,
} from '@transferto/dapp/src/const';
import {
  useBlockchainExplorerURL,
  useChains,
  useMultisig,
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
import { NavbarMenu } from '../../index';
import { AvatarContainer, ChainAvatar, WalletAvatar } from './';

interface NavbarMenuProps {
  handleClose: (event: MouseEvent | TouchEvent) => void;
}
export const WalletMenu = ({ handleClose }: NavbarMenuProps) => {
  const { checkMultisigEnvironment } = useMultisig();
  const { t } = useTranslation();
  const theme = useTheme();
  const blockchainExplorerURL = useBlockchainExplorerURL();
  const { account, usedWallet, disconnect } = useWallet();
  const { trackPageload, trackEvent } = useUserTracking();
  const [isMultisigEnvironment, setIsMultisigEnvironment] = useState(false);
  const walletSource = supportedWallets;
  const { chains } = useChains();
  const activeChain = useMemo(
    () => chains?.find((chainEl: Chain) => chainEl.id === account.chainId),
    [chains, account.chainId],
  );

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
        disableTrackingTool: [EventTrackingTool.Cookie3],
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
    const response = await checkMultisigEnvironment();

    setIsMultisigEnvironment(response);
    // Check MultisigEnvironment only on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    openNavbarWalletMenu! && onOpenSnackbar(false);
  }, [onOpenSnackbar, openNavbarWalletMenu]);

  useEffect(() => {
    handleMultisigEnvironmentCheck();
  }, [account, handleMultisigEnvironmentCheck]);

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
        <Grid item xs={12} textAlign={'center'} mb={theme.spacing(2.5)}>
          {activeChain && (
            <AvatarContainer>
              <WalletAvatar src={walletIcon} />
              <ChainAvatar
                src={activeChain.logoURI || 'empty'}
                alt={`${activeChain.name}chain-logo`}
              />
            </AvatarContainer>
          )}
          <Typography variant="lifiBodyLargeStrong" mt={theme.spacing(1.5)}>
            {_walletDigest}
          </Typography>
        </Grid>
        {!isMultisigEnvironment && (
          <Grid item xs={4} sx={{ paddingLeft: '20px' }}>
            <SpotButton
              name={t('navbar.walletMenu.copy')}
              onClick={handleCopyButton}
              typography="lifiBodyXSmall"
              styles={{
                p: {
                  color: lighten(theme.palette.black.main, 0.48),
                },
              }}
            >
              <ContentCopyIcon />
            </SpotButton>
          </Grid>
        )}
        <Grid item xs={!isMultisigEnvironment ? 4 : 6}>
          <SpotButton
            name={t('navbar.walletMenu.explore')}
            onClick={handleExploreButton}
            typography="lifiBodyXSmall"
            styles={{
              p: {
                color: lighten(theme.palette.black.main, 0.48),
              },
            }}
          >
            <LaunchIcon />
          </SpotButton>
        </Grid>
        <Grid
          item
          xs={!isMultisigEnvironment ? 4 : 6}
          sx={{ paddingRight: '20px' }}
        >
          <SpotButton
            name={t('navbar.walletMenu.disconnect')}
            onClick={handleDisconnectButton}
            typography="lifiBodyXSmall"
            styles={{
              button: {
                background: theme.palette.secondary.main,
              },
              'button:hover': {
                background:
                  theme.palette.mode === 'light'
                    ? darken(theme.palette.secondary.main, 0.04)
                    : lighten(theme.palette.secondary.main, 0.04),
              },
              p: {
                color:
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.black.main, 0.48)
                    : darken(theme.palette.white.main, 0.48),
              },
            }}
          >
            <PowerSettingsNewIcon
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.accent1Alt.main
                    : theme.palette.accent1.main,
              }}
            />
          </SpotButton>
        </Grid>
      </Grid>
    </NavbarMenu>
  ) : null;
};
