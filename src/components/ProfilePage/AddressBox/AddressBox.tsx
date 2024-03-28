import { Box, Typography, alpha, useTheme } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useMenuStore } from 'src/stores';
import { useTranslation } from 'react-i18next';
import {
  AddressDisplayBox,
  BackgroundBox,
  PassImageBox,
  ProfileIconButton,
} from './AddressBox.style';
import { ProfilePageTypography } from '../ProfilePage.style';
import { useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import type { Address } from 'viem';

interface AddressBoxProps {
  address?: string;
  isEVM?: boolean;
}

export const AddressBox = ({ address, isEVM }: AddressBoxProps) => {
  const { t } = useTranslation();
  const { setSnackbarState } = useMenuStore((state) => state);
  const { data: ensName, isSuccess } = useEnsName({
    address: address as Address | undefined,
    chainId: mainnet.id,
  });

  const handleCopyButton = () => {
    address && navigator.clipboard.writeText(address);
    setSnackbarState(true, t('navbar.walletMenu.copiedMsg'), 'success');
  };

  const getAddressOrENSString = (): string => {
    if (isSuccess && ensName) {
      return String(ensName).length > 20
        ? `${ensName.slice(0, 13)}...eth`
        : ensName;
    }
    return address && isEVM
      ? address?.slice(0, 6) +
          '...' +
          address?.slice(address.length - 4, address.length)
      : '0x0000...0000';
  };

  return (
    <Box sx={{ height: '100%' }}>
      <BackgroundBox />
      <AddressDisplayBox>
        <ProfilePageTypography fontSize={'24px'} lineHeight={'32px'}>
          {getAddressOrENSString()}
        </ProfilePageTypography>
        <ProfileIconButton onClick={() => handleCopyButton()}>
          <ContentCopyIcon sx={{ height: '16px' }} />
        </ProfileIconButton>
        <a
          href={`https://etherscan.io/address/${address}`}
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
          rel="noreferrer"
        >
          <ProfileIconButton>
            <OpenInNewIcon sx={{ height: '16px' }} />
          </ProfileIconButton>
        </a>
      </AddressDisplayBox>
      <PassImageBox>
        <img
          src={
            address && isEVM
              ? `https://effigy.im/a/${address}.png`
              : `https://effigy.im/a/${'jumper.eth'}.png`
          }
          width={'128px'}
          height={'128px'}
          style={{
            borderRadius: '100%',
            borderStyle: 'solid',
            borderWidth: '5px',
            borderColor: '#FFFFFF',
          }}
        />
      </PassImageBox>
    </Box>
  );
};
