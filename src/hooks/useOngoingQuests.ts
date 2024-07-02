import type { Quest } from '@/types/loyaltyPass';
import { useQuery } from '@tanstack/react-query';

export interface UseQuestsProps {
  quests: Quest[] | undefined;
  url: URL;
  isSuccess: boolean;
  isQuestLoading: boolean;
}

const STRAPI_CONTENT_TYPE = 'quests';
export const useOngoingQuests = (): UseQuestsProps => {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_STRAPI_DEVELOP === 'true'
      ? process.env.NEXT_PUBLIC_LOCAL_STRAPI_URL
      : process.env.NEXT_PUBLIC_STRAPI_URL;
  const apiUrl = new URL(`${apiBaseUrl}/${STRAPI_CONTENT_TYPE}`);

  //selected needed field
  apiUrl.searchParams.set('fields[0]', 'Title'); // title
  apiUrl.searchParams.set('fields[1]', 'Points'); // points
  apiUrl.searchParams.set('fields[2]', 'Link'); // link
  apiUrl.searchParams.set('fields[3]', 'StartDate'); // startDate
  apiUrl.searchParams.set('fields[4]', 'EndDate'); // endDate
  //populate url
  apiUrl.searchParams.set('populate[0]', 'Image');
  apiUrl.searchParams.set('populate[1]', 'quests_platform');
  apiUrl.searchParams.set('populate[2]', 'quests_platform.Logo');
  //sort url
  apiUrl.searchParams.set('sort[0]', 'id:desc');
  //filter url
  const currentDate = new Date(Date.now()).toISOString().split('T')[0];
  apiUrl.searchParams.set('filters[StartDate][$lte]', currentDate);
  apiUrl.searchParams.set('filters[EndDate][$gte]', currentDate);
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' &&
    apiUrl.searchParams.set('publicationState', 'preview');
  const apiAccesToken =
    process.env.NEXT_PUBLIC_STRAPI_DEVELOP === 'true'
      ? process.env.NEXT_PUBLIC_LOCAL_STRAPI_API_TOKEN
      : process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['ongoingQuests'],

    queryFn: async () => {
      const response = await fetch(decodeURIComponent(apiUrl.href), {
        headers: {
          Authorization: `Bearer ${apiAccesToken}`,
        },
      });
      const result = await response.json();
      return result.data;
    },
    refetchInterval: 1000 * 60 * 60,
  });

  return {
    quests: data,
    isQuestLoading: isLoading,
    url: apiUrl,
    isSuccess,
  };
};
