import { createArticleStrapiApi } from '@/utils/strapi/generateStrapiUrl';

export async function getFeaturedArticle() {
  const featureCardUrl = createArticleStrapiApi()
    .filterByFeatured()
    .sort('desc');
  const apiBaseUrl = featureCardUrl.getApiBaseUrl();
  const apiUrl = featureCardUrl.getApiUrl();
  const accessToken = featureCardUrl.getApiAccessToken();
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
