import { useQuery } from '@tanstack/react-query';
import { FeatureCardsResponseType } from '../types';

export interface UseFeatureCardsProps {
  featureCards: FeatureCardsResponseType | undefined;
  isSuccess: boolean;
}

const CONTENTFUL_CONTENT_TYPE = 'featureCard';

// Query Content-Type "featureCards" from Contentful
export const useFeatureCards = (): UseFeatureCardsProps => {
  const { data, isSuccess } = useQuery({
    queryKey: ['featureCard'],

    queryFn: async () => {
      const apiUrl =
        import.meta.env.MODE === 'production'
          ? import.meta.env.VITE_CONTENTFUL_API_URL
          : import.meta.env.VITE_CONTENTFUL_PREVIEW_API_URL;
      const apiSpaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
      const apiAccesToken =
        import.meta.env.MODE === 'production'
          ? import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
          : import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN;
      const response = await fetch(
        `${apiUrl}/spaces/${apiSpaceId}/environments/master/entries?access_token=${apiAccesToken}&content_type=${CONTENTFUL_CONTENT_TYPE}&limit=20`,
      );
      const result = await response.json();
      return result;
    },
    enabled: true,
    refetchInterval: 1000 * 60 * 60,
  });
  return {
    featureCards: data ?? undefined,
    isSuccess,
  };
};
