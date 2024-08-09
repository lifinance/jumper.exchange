import type { FeatureCardData } from '@/types/strapi';
import { createJumperUserStrapiApi } from '@/utils/strapi/generateStrapiUrl';
import { useQuery } from '@tanstack/react-query';
import { useAccounts } from './useAccounts';

export interface UsePersonalizedFeatureCardsProps {
  featureCards: FeatureCardData[] | undefined;
  isSuccess: boolean;
  isConnected: boolean;
}

export const usePersonalizedFeatureCards =
  (): UsePersonalizedFeatureCardsProps => {
    const { account } = useAccounts();
    const personalizedFeatureCard = createJumperUserStrapiApi(account);
    const apiUrl = personalizedFeatureCard.getApiUrl();
    const apiAccesToken = personalizedFeatureCard.getApiAccessToken();
    const { data, isSuccess } = useQuery({
      queryKey: ['jumperUser'],

      queryFn: async () => {
        const response = await fetch(decodeURIComponent(apiUrl), {
          headers: {
            Authorization: `Bearer ${apiAccesToken}`,
          },
        });
        const result = await response.json();
        return result.data;
      },
      enabled: !!account?.address && account.chainType === 'EVM',
      refetchInterval: 1000 * 60 * 60,
    });
    const featureCards = data?.[0]?.attributes?.feature_cards.data;

    return {
      featureCards,
      isSuccess,
      isConnected: !!account?.address && account.chainType === 'EVM',
    };
  };
