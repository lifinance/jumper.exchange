'use client';
import { MercleNFTABI } from '../const/abi/mercleNftABI';
import { base } from 'wagmi/chains';
import { useReadContract } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

export interface UseMerklRes {
  isSuccess: boolean;
  isLoading: boolean;
  userTVL: number;
  activeCampaigns: string[];
  activePosition: any[];
  availableRewards: any[];
}

export interface UseMerklRewardsProps {
  rewardChainId: number;
  userAddress?: string;
  rewardToken?: string;
}

const JUMPER_QUEST_ID = ['0x1C6A6Ee7D2e0aC0D2E3de4a69433553e0cb52777'];

const ACTIVE_CHAINS = ['10', '42161', '8453', '34443'];

const MERKL_API = 'https://api.merkl.xyz/v3';

export const useMerklRewards = ({
  userAddress,
  rewardChainId,
  rewardToken,
}: UseMerklRewardsProps): UseMerklRes => {
  // state
  let userTVL = 0;
  let rewardsToClaim = [];
  const activeCampaigns = [];
  // const addr = '0x55048E0d46f66FA00cae12905f125194CD961581';

  // Call to get the active positions
  // To do -> use the label to get only
  const MERKL_POSITIONS_API = `${MERKL_API}/positions?chainId=${ACTIVE_CHAINS.join(',')}&user=${userAddress}`;
  const {
    data: positionsData,
    isSuccess: positionsIsSuccess,
    isLoading: positionsIsLoading,
  } = useQuery({
    queryKey: ['MerklPositions'],

    queryFn: async () => {
      const response = await fetch(MERKL_POSITIONS_API, {});
      const result = await response.json();
      return result;
    },
    enabled: !!userAddress,
    refetchInterval: 1000 * 60 * 60,
  });

  // loop through the position and sum the TVL USD
  if (positionsData) {
    for (const [key, data] of Object.entries(positionsData)) {
      activeCampaigns.push(key);
      if (
        JUMPER_QUEST_ID.includes(key.split('_')[1]) &&
        (data as any)?.userTVL
      ) {
        userTVL += (data as any)?.userTVL;
      }
    }
  }

  // check the user positions for the interesting campaign

  // Call to get the available rewards
  const MERKL_REWARDS_API = `${MERKL_API}/rewards?chainIds=${rewardChainId}&user=${userAddress}`;
  const {
    data: rewardsData,
    isSuccess: rewardsIsSuccess,
    isLoading: rewardsIsLoading,
  } = useQuery({
    queryKey: ['MerklRewards'],

    queryFn: async () => {
      const response = await fetch(MERKL_REWARDS_API, {
        // headers: {
        //   Authorization: `Bearer ${apiAccesToken}`,
        // },
      });
      const result = await response.json();
      return result;
    },
    enabled: !!userAddress,
    refetchInterval: 1000 * 60 * 60,
  });
  // transform the rewards to get the total in the token that we want // OP
  // transform the result to know what is coming from Jumper campaigns
  // transform to know what is not coming from Jumper campaigns
  if (rewardsData) {
    const tokenData = rewardsData[rewardChainId]?.tokenData;
    if (tokenData) {
      rewardsToClaim = Object.entries(tokenData).map((elem): any => {
        const key = elem[0];
        const value = elem[1] as any;
        return {
          chainId: rewardChainId,
          address: key,
          symbol: value.symbol,
          accumulatedAmountForContractBN: value.accumulated,
          amountToClaim: value.unclaimed / 10 ** value.decimals,
          amountAccumulated: value.accumulated / 10 ** value.decimals,
          proof: value.proof,
        };
      });
    }
  }

  return {
    isLoading: positionsIsLoading && rewardsIsLoading,
    isSuccess: positionsIsSuccess && rewardsIsSuccess,
    userTVL: userTVL,
    activePosition: [],
    activeCampaigns: activeCampaigns,
    availableRewards: rewardsToClaim,
  };
};
