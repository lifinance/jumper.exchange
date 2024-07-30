'use client';
import { useQuery } from '@tanstack/react-query';
import { type MerklApyRes } from './useMissionsAPY';

const ACTIVE_CHAINS = ['10', '8453', '252', '34443'];
const MERKL_API = 'https://api.merkl.xyz/v3';
const CREATOR_TAG = 'superfest';

interface useMissionsAPYRes {
  isLoading: boolean;
  isSuccess: boolean;
  apy: number;
}

export const useMissionsMaxAPY = (
  claimingIds: string[] | undefined,
): useMissionsAPYRes => {
  const MERKL_CAMPAIGN_API = `${MERKL_API}/campaigns?chainIds=${ACTIVE_CHAINS.join(',')}&creatorTag=${CREATOR_TAG}`;

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['accountCampaignInfo'],
    queryFn: async () => {
      try {
        const response = await fetch(MERKL_CAMPAIGN_API);
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: claimingIds && claimingIds.length > 0,
    refetchInterval: 1000 * 60 * 60,
  });

  let apy = 0;

  if (claimingIds) {
    for (const id of claimingIds) {
      const timestamp = Date.now() / 1000;

      for (const chainId of ACTIVE_CHAINS) {
        const chainCampaignData = data?.[chainId];
        if (chainCampaignData && chainCampaignData[id]) {
          for (const [, data] of Object.entries(chainCampaignData[id]) as [
            string,
            MerklApyRes,
          ][]) {
            if (data?.apr && data.endTimestamp > timestamp && data.apr > apy) {
              apy = data.apr;
            }
          }
        }
      }
    }
  }

  return {
    apy,
    isLoading,
    isSuccess,
  };
};
