import type { BlogArticleData } from '@/types/strapi';
import { ArticleStrapiApi } from '@/utils/strapi/StrapiApi';

export async function getArticlesByTag(
  excludeId: number,
  tag: number | number[],
) {
  const urlParams = new ArticleStrapiApi().filterByTag(tag);
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
    // exclude current article id
    output.data.filter((el: BlogArticleData) => el.id !== excludeId),
  ); // Extract data from the response

  return { data, url: apiBaseUrl }; // Return a plain object
}
