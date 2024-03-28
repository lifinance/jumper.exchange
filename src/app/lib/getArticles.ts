import type { BlogArticleData, StrapiResponse } from '@/types/strapi';
import { ArticleStrapiApi } from '@/utils/strapi/StrapiApi';

export interface GetArticlesResponse extends StrapiResponse<BlogArticleData> {
  url: string; // Define the shape of the URL
}

export async function getArticles(
  excludeId?: number,
): Promise<GetArticlesResponse> {
  const urlParams = new ArticleStrapiApi()
    .sort('desc')
    .addPaginationParams({ page: 1, pageSize: 20, withCount: false });
  const apiBaseUrl = urlParams.getApiBaseUrl();
  const apiUrl = urlParams.getApiUrl();
  const accessToken = urlParams.getApiAccessToken();
  const res = await fetch(decodeURIComponent(apiUrl), {
    cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json().then((output) =>
    // filter out given excludeId
    {
      return {
        meta: output.meta,
        data: output.data.filter((el: BlogArticleData) => el.id !== excludeId),
      };
    },
  ); // Extract data from the response

  return { ...data, url: apiBaseUrl }; // Return a plain object
}
