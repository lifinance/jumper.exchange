import { useAccountConnect } from '@/hooks/useAccounts';
import { useChains } from '@/hooks/useChains';
import { useMenuStore } from '@/stores/menu';
import { ChainId } from '@lifi/types';
import { Avatar, Typography, useTheme } from '@mui/material';
import type { Wallet } from '@solana/wallet-adapter-react';
import {
  ConnectButton,
  EcoSystemSelectBadge,
} from './EcosystemSelectMenu.style';

interface SVMConnectButtonProps {
  walletIcon?: string;
  svm: Wallet;
}

export const SVMConnectButton = ({
  walletIcon,
  svm,
}: SVMConnectButtonProps) => {
  const theme = useTheme();
  const { closeAllMenus } = useMenuStore((state) => state);
  const connect = useAccountConnect();
  const { chains } = useChains();
  const solanaChain = chains.find((chain) => chain.id === ChainId.SOL);

  const connectHandler = async () => {
    connect({ svm });
    closeAllMenus();
  };
  return (
    <ConnectButton onClick={() => connectHandler()}>
      <EcoSystemSelectBadge
        overlap="circular"
        className="badge"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Avatar
            src={walletIcon}
            alt={'wallet-avatar'}
            sx={{ width: '36px', height: '36px' }}
          />
        }
      >
        <Avatar
          src={solanaChain?.logoURI}
          sx={{ width: '88px', height: '88px' }}
        />
      </EcoSystemSelectBadge>
      <Typography
        sx={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.white.main
              : theme.palette.black.main,
          marginTop: 1.5,
        }}
        variant={'lifiBodySmallStrong'}
      >
        Solana
      </Typography>
    </ConnectButton>
  );
};
