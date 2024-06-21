'use client';
import { EcosystemSelectMenu } from '@/components/Menus/EcosystemSelectMenu';
import { WalletMenu } from '@/components/Menus/WalletMenu';
import { WalletSelectMenu } from '@/components/Menus/WalletSelectMenu';
import { Box, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TrackingAction, TrackingCategory } from 'src/const/trackingKeys';
import { JUMPER_LEARN_PATH } from 'src/const/urls';
import { useUserTracking } from 'src/hooks/userTracking';
import { WallettButtons } from '../WalletButton';
import { ConnectButton } from './WalletManagementButtons.style';

export const WalletManagementButtons = () => {
  const walletManagementButtonsRef = useRef<HTMLAnchorElement>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { trackEvent } = useUserTracking();

  const pathname = usePathname();
  const redirectToApp = pathname?.includes(JUMPER_LEARN_PATH);

  const handleLearnButton = () => {
    router.push('/');
    trackEvent({
      category: TrackingCategory.WalletSelectMenu,
      action: TrackingAction.ClickConnectToWidget,
      label: 'click_connect_wallet_on_jumper_learn',
    });
  };

  return (
    <>
      <Box ref={walletManagementButtonsRef}>
        {redirectToApp ? (
          <ConnectButton
            // Used in the widget
            onClick={handleLearnButton}
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
              {t('blog.openApp')}
            </Typography>
          </ConnectButton>
        ) : (
          <WallettButtons />
        )}
      </Box>
      <WalletMenu anchorEl={walletManagementButtonsRef.current ?? undefined} />
      <WalletSelectMenu
        anchorEl={walletManagementButtonsRef.current || undefined}
      />
      <EcosystemSelectMenu
        anchorEl={walletManagementButtonsRef?.current || undefined}
      />
    </>
  );
};
