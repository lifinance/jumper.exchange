'use client';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { availableNFT } from './querries/superfestNFT';
import { useAccount } from 'wagmi';

export interface NFTInfo {
  isClaimable: boolean;
  isClaimed: boolean;
  claimingAddress: string;
  cid: string;
  signature?: string;
  cap?: number;
  verifyIds?: number;
  NFTAddress?: string;
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

const GALXE_ENDPOINT = 'https://graphigo.prd.galaxy.eco/query';

const ROOTS = {
  optimism: '',
  fraxtal: '',
  base: '',
  mode: '',
};

const ADDRESSES = {
  optimism: '',
  fraxtal: '',
  base: '',
  mode: '',
};

export const useCheckFestNFTAvailability = ({
  userAddress,
}: UseCheckFestNFTAvailabilityProps): UseCheckFestNFTAvailabilityRes => {
  const { address } = useAccount();
  const CID = 'GC2MEtgCz4';

  // state
  let claimInfo = {
    mode: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      cid: CID,
      signature: '',
      cap: 0,
      verifyIds: 0,
      NFTAddress: `0x1`,
    },
    optimism: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      cid: CID,
      signature: '',
      cap: 0,
      verifyIds: 0,
      NFTAddress: `0x1`,
    },
    base: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      cid: CID,
      signature: '',
      cap: 0,
      verifyIds: 0,
      NFTAddress: `0x1`,
    },
    fraxtal: {
      isClaimable: false,
      isClaimed: false,
      claimingAddress: `0x1`,
      cid: CID,
      signature: '',
      cap: 0,
      verifyIds: 0,
      NFTAddress: `0x1`,
    },
  };

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
