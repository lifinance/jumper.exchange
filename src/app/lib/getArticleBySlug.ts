import { createArticleStrapiApi } from '@/utils/strapi/generateStrapiUrl';

export async function getArticleBySlug(slug: string) {
  const articleUrl = createArticleStrapiApi().filterBySlug(slug);
  const apiBaseUrl = articleUrl.getApiBaseUrl();
  const apiUrl = articleUrl.getApiUrl();
  const accessToken = articleUrl.getApiAccessToken();
  const res = await fetch(decodeURIComponent(apiUrl), {
    cache: 'force-cache',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json(); // Extract data from the response

  return { data, url: apiBaseUrl }; // Return a plain object
}
