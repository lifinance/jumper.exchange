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
import { EventTrackingTool } from '@/types/userTracking';
import { walletDigest } from '@/utils/walletDigest';
import type { Chain } from '@lifi/types';
import { getConnectorIcon } from '@lifi/wallet-management';
import { Skeleton, Stack, Typography, alpha, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import {
  ConnectButton,
  WalletMenuButton,
  WalletMgmtBadge,
  WalletMgmtChainAvatar,
  WalletMgmtWalletAvatar,
} from '.';
import { XPIcon } from '../illustrations/XPIcon';
import { useLoyaltyPass } from 'src/hooks/useLoyaltyPass';
import { JUMPER_LOYALTY_PATH } from 'src/const/urls';
import { useRouter } from 'next/navigation';

export const WallettButtons = () => {
  const { chains } = useChains();
  const { trackEvent } = useUserTracking();
  const { account } = useAccounts();
  const { t } = useTranslation();
  const { isSuccess } = useChains();
  const theme = useTheme();
  const { points } = useLoyaltyPass();
  const router = useRouter();

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
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
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
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
      });
    setWalletMenuState(!openWalletMenu);
  };

  const handleXPClick = () => {
    trackEvent({
      category: TrackingCategory.Menu,
      label: 'click-jumper-pass-link',
      action: TrackingAction.ClickJumperProfileLink,
      data: { [TrackingEventParameter.Menu]: 'pass' },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    router.push(JUMPER_LOYALTY_PATH);
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
        <Stack direction="row" spacing={2}>
          <WalletMenuButton id="wallet-digest-button" onClick={handleXPClick}>
            <Image
              src={`https://effigy.im/a/${account?.address ?? 'jumper.eth'}.png`}
              alt="Effigy Wallet Icon"
              width={28}
              height={28}
              priority={false}
              unoptimized={true}
              style={{
                borderRadius: '100%',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor:
                  theme.palette.mode === 'light'
                    ? theme.palette.white.main
                    : alpha(theme.palette.white.main, 0.08),
              }}
            />
            {points === undefined ? (
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: 24, sm: 24 },
                  minWidth: 25,
                  marginRight: 1.1,
                  marginLeft: 1.1,
                }}
              />
            ) : (
              <Typography
                variant={'lifiBodyMediumStrong'}
                width={'auto'}
                marginRight={1.1}
                marginLeft={1}
              >
                {points}
              </Typography>
            )}
            <XPIcon size={28} />
          </WalletMenuButton>
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
        </Stack>
      )}
    </>
  );
};
