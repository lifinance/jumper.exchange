import { useMenuStore } from '@/stores/menu';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import type { Address } from 'viem';
import { useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { ProfilePageTypography } from '../ProfilePage.style';
import {
  AddressDisplayBox,
  BackgroundBox,
  PassImageBox,
  ProfileIconButton,
} from './AddressBox.style';

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
        <Image
          alt="Effigy Wallet Icon"
          src={
            address && isEVM
              ? `https://effigy.im/a/${address}.png`
              : `https://effigy.im/a/${'jumper.eth'}.png`
          }
          width={128}
          height={128}
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
