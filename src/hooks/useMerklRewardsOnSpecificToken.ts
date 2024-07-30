'use client';
import { useQuery } from '@tanstack/react-query';

interface TokenData {
  accumulated: string;
  decimals: number;
  proof: string[];
  symbol: string;
  unclaimed: string;
}
interface UserPosition {
  balance: number;
  token: string;
  origin: string;
  totalSupply: number;
  tvl: number;
}

interface TokenDataPosition {
  userPositions: UserPosition[];
  symbol?: string;
  decimals: number;
  token: string;
  userTVL: number;
  totalSupply?: number;
  tvl?: number;
}

interface MerklPositionData {
  [key: string]: {
    [key: string]: TokenDataPosition;
  };
}

interface AvailableRewards {
  chainId: number;
  address: string;
  symbol: string;
  accumulatedAmountForContractBN: string;
  amountToClaim: number;
  amountAccumulated: number;
  proof: string[];
}

export interface UseMerklRes {
  isSuccess: boolean;
  isLoading: boolean;
  userTVL: number;
  activeCampaigns: string[];
  availableRewards: AvailableRewards[];
  pastCampaigns: string[];
  // activePosition?: {}[];
}

export interface UseMerklRewardsProps {
  rewardChainId: number;
  userAddress?: string;
  rewardToken?: string;
}

const ACTIVE_CHAINS = ['10', '252', '8453', '34443'];

const MERKL_API = 'https://api.merkl.xyz/v3';

const CREATOR_TAG = 'superfest';

const TOKEN = '0x4200000000000000000000000000000000000042';
// TESTING
// const TOKEN = '0x41A65AAE5d1C8437288d5a29B4D049897572758E';

export const useMerklRewards = ({
  userAddress,
  rewardChainId,
  rewardToken,
}: UseMerklRewardsProps): UseMerklRes => {
  // state
  let userTVL = 0;
  let rewardsToClaim: AvailableRewards[] = [];
  const activeCampaigns = [] as string[];
  const pastCampaigns = [] as string[];

  // Call to get the active positions
  // To do -> use the label to get only
  const MERKL_POSITIONS_API = `${MERKL_API}/multiChainPositions?chainIds=${ACTIVE_CHAINS.join(',')}&user=${userAddress}&creatorTag=${CREATOR_TAG}`;
  const {
    data: positionsData,
    isSuccess: positionsIsSuccess,
    isLoading: positionsIsLoading,
  } = useQuery({
    queryKey: ['MerklPositions'],

    queryFn: async () => {
      const response = await fetch(MERKL_POSITIONS_API, {});
      const result = await response.json();
      return result as MerklPositionData;
    },
    enabled: !!userAddress,
    refetchInterval: 1000 * 60 * 60,
  });

  // loop through the chains and positions
  if (positionsData) {
    for (const chain of ACTIVE_CHAINS) {
      if (positionsData[chain]) {
        for (const [key] of Object.entries(positionsData[chain])) {
          activeCampaigns.push(key);
        }
      }
    }
  }

  // check the user positions for the interesting campaign
  const MERKL_REWARDS_API = `${MERKL_API}/rewards?chainIds=${rewardChainId}&user=${userAddress}`;
  const {
    data: rewardsData,
    isSuccess: rewardsIsSuccess,
    isLoading: rewardsIsLoading,
  } = useQuery({
    queryKey: ['MerklRewards'],

    queryFn: async () => {
      const response = await fetch(MERKL_REWARDS_API, {});
      const result = await response.json();
      return result;
    },
    enabled: !!userAddress,
    refetchInterval: 1000 * 60 * 60,
  });

  // transform to know what is not coming from Jumper campaigns
  if (rewardsData) {
    const tokenData = rewardsData[rewardChainId]?.tokenData;
    if (tokenData) {
      rewardsToClaim = Object.entries(tokenData)
        .map((elem): AvailableRewards => {
          const key = elem[0];
          const value = elem[1] as TokenData;
          return {
            chainId: rewardChainId,
            address: key,
            symbol: value.symbol,
            accumulatedAmountForContractBN: value.accumulated,
            amountToClaim: (value.unclaimed as any) / 10 ** value.decimals, //todo: need to be typed with big int
            amountAccumulated: (value.unclaimed as any) / 10 ** value.decimals, //todo: need to be typed with big int
            proof: value.proof,
          };
        })
        .filter(
          (elem) => elem.address.toLowerCase() === String(TOKEN).toLowerCase(),
        );
    }

    for (const chain of ACTIVE_CHAINS) {
      const campaignData = rewardsData[chain]?.campaignData;
      if (campaignData) {
        for (const [key] of Object.entries(campaignData)) {
          pastCampaigns.push(key);
        }
      }
    }
  }

  return {
    isLoading: positionsIsLoading && rewardsIsLoading,
    isSuccess: positionsIsSuccess && rewardsIsSuccess,
    userTVL: userTVL,
    activeCampaigns: activeCampaigns,
    availableRewards: rewardsToClaim,
    pastCampaigns: pastCampaigns,
    // activePosition: [],
  };
};
