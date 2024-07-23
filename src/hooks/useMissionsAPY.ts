'use client';
import { useQuery } from '@tanstack/react-query';
import { CTALinkInt } from 'src/components/Superfest/SuperfestPage/CTA/MissionCTA';

const ACTIVE_CHAINS = ['10', '252', '8453', '34443'];
const MERKL_API = 'https://api.merkl.xyz/v3';
const CREATOR_TAG = 'superfest';

export const useMissionsAPY = (CTAs: CTALinkInt[]): CTALinkInt[] => {
  const MERKL_CAMPAIGN_API = `${MERKL_API}/campaigns?chainIds=${ACTIVE_CHAINS.join(',')}&creatorTag=${CREATOR_TAG}`;

  console.log('hereeeee');
  console.log(CTAs);
  console.log(CTAs.length > 0);
  console.log('wtf');

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['campaignInfo'],
    queryFn: async () => {
      try {
        console.log('in ittt');
        const response = await fetch(MERKL_CAMPAIGN_API);
        console.log(response);
        const result = await response.json();
        console.log(result);
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    enabled: true,
    refetchInterval: 1000 * 60, //1000 * 60 * 60,
  });

  console.log('after');

  console.log(data);

  // for (const chain of ACTIVE_CHAINS) {
  //   const campaignData = data[chain];
  //   if (campaignData) {
  //     for (const [key, _] of Object.entries(campaignData)) {
  //       pastCampaigns.push(key);
  //     }
  //   }
  // }

  return [];
};
