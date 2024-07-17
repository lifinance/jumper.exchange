'use client';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { availableNFT } from './querries/superfestNFT';
import { useAccount } from 'wagmi';

export interface NFTInfo {
  isClaimable: boolean;
  isClaimed: boolean;
  claimingAddress: string;
  quantityToMint: any;
  allowListEntry: any;
}

export interface UseCheckFestNFTAvailabilityRes {
  claimInfo: {
    [key: string]: NFTInfo;
  };
  isLoading: boolean;
  isSuccess: boolean;
}

export interface UseCheckFestNFTAvailabilityProps {
  userAddress?: string;
}

const ROOTS: { [key: string]: string } = {
  optimism: '',
  fraxtal: '',
  base: '',
  mode: '',
};

const ADDRESSES: { [key: string]: string } = {
  optimism: '',
  fraxtal: '',
  base: '',
  mode: '',
};

const CHAINS = ['optimism', 'fraxtal', 'base', 'mode'];

export const useCheckFestNFTAvailability = ({
  userAddress,
}: UseCheckFestNFTAvailabilityProps): UseCheckFestNFTAvailabilityRes => {
  const { address } = useAccount();

  // state
  let claimInfo = {
    mode: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      signature: '',
    },
    optimism: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      signature: '',
    },
    base: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      signature: '',
      cap: 0,
      verifyIds: 0,
      NFTAddress: `0x1`,
    },
    fraxtal: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      signature: '',
      cap: 0,
      verifyIds: 0,
      NFTAddress: `0x1`,
    },
  };

  for (const chain of CHAINS) {
    const tokenId = 1n;
    const NFT_ADDRESS = ADDRESSES[chain];

    // check if already minted
    const balance = await publicClient.readContract({
      abi: zoraCreator1155ImplABI,
      functionName: 'balanceOf',
      address: NFT_ADDRESS,
      args: [userAddress, tokenId],
    });

    console.log(balance);

    // if not already minted, check if can mint
    const merkl = ROOTS[chain];
  }

  // Call to get the available rewards
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['festNFT'],
    queryFn: async () => {
      const res = await request(
        GALXE_ENDPOINT,
        availableNFT,
        {
          campaignID: CID,
          address: address,
        },
        {},
      );
      return res;
    },
    enabled: !!address,
    refetchInterval: 1000 * 60 * 60,
  });

  return {
    claimInfo: claimInfo,
    isLoading: isLoading,
    isSuccess: isSuccess,
  };
};
