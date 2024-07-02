import { Box, Typography, Divider } from '@mui/material';
import {
  NFTClaimingContainer,
  NFTClaimingDescription,
  NFTClaimingHeader,
  NFTClaimingTitle,
  NFTDisplayBox,
} from './NFTClaimingBox.style';
import { NFTCard } from './NFTCard/NFTCard';
import { NFTInfo } from 'src/hooks/useCheckFestNFTAvailability';

const NFT_ARRAY = [
  {
    chain: 'mode',
    image: 'https://strapi.li.finance/uploads/mode_a66678926d.png',
    contractAddress: '',
    bgColor: '#dffe00',
    typoColor: '#000000',
  },
  {
    chain: 'base',
    image: 'https://strapi.li.finance/uploads/nft_f4eee6bf7b.png',
    contractAddress: '',
    bgColor: '#2151f5',
    typoColor: '#ffffff',
  },
  {
    chain: 'optimism',
    image: 'https://strapi.li.finance/uploads/nft_632580b867.png',
    contractAddress: '',
    bgColor: '#ff0000',
    typoColor: '#ffffff',
  },
  {
    chain: 'fraxtal',
    image: 'https://strapi.li.finance/uploads/nft_c1c8975aa4.png',
    contractAddress: '',
    bgColor: '#000000',
    typoColor: '#ffffff',
  },
];

interface NFTClaimBoxProps {
  claimInfos: {
    [key: string]: NFTInfo;
  };
  infoLoading: boolean;
  infoSuccess: boolean;
}

export const NFTClaimingBox = ({
  claimInfos,
  infoLoading,
  infoSuccess,
}: NFTClaimBoxProps) => {
  return (
    <NFTClaimingContainer>
      <NFTClaimingHeader>
        <NFTClaimingTitle>
          {String('Enter the liquidity festival').toUpperCase()}
        </NFTClaimingTitle>
        <Box marginTop="32px" marginBottom="32px">
          <NFTClaimingDescription>
            {
              'Explore the Superchain Festival and vibe at the sound of 1.5M OP rewards. Feel the music, complete the tasksand get ready to experience rewards like never before.'
            }
          </NFTClaimingDescription>
        </Box>
      </NFTClaimingHeader>
      <NFTDisplayBox>
        {NFT_ARRAY.map((elem, i: number) => {
          return (
            <NFTCard
              key={`nft-card-${i}`}
              image={elem.image}
              chain={elem.chain}
              bgColor={elem.bgColor}
              typoColor={elem.typoColor}
              claimInfo={claimInfos[elem.chain]}
              isLoading={infoLoading}
              isSuccess={infoSuccess}
            />
          );
        })}
      </NFTDisplayBox>
    </NFTClaimingContainer>
  );
};
