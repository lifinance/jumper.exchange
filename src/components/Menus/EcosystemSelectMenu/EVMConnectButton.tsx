import { useAccountConnect } from '@/hooks/useAccounts';
import { useChains } from '@/hooks/useChains';
import { useMenuStore } from '@/stores/menu';
import { ChainId } from '@lifi/types';
import { Avatar, Typography, useTheme } from '@mui/material';
import { type Connector } from 'wagmi';
import {
  ConnectButton,
  EcoSystemSelectBadge,
} from './EcosystemSelectMenu.style';

interface EvmConnectButton {
  walletIcon?: string;
  evm: Connector;
}

export const EVMConnectButton = ({ walletIcon, evm }: EvmConnectButton) => {
  const theme = useTheme();
  const connect = useAccountConnect();
  const { chains } = useChains();
  const ethereumChain = chains.find((chain) => chain.id === ChainId.ETH);

  const { closeAllMenus } = useMenuStore((state) => state);

  const connectHandler = async () => {
    connect({ evm });
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
          src={ethereumChain?.logoURI}
          sx={{ width: '88px', height: '88px' }}
        />
      </EcoSystemSelectBadge>
      <Typography
        variant={'lifiBodySmallStrong'}
        sx={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.white.main
              : theme.palette.black.main,
          marginTop: 1.5,
        }}
      >
        EVM
      </Typography>
    </ConnectButton>
  );
};
