import type { PartnerThemesData, StrapiResponse } from '@/types/strapi';
import { createPartnerThemeStrapiApi } from '@/utils/strapi/generateStrapiUrl';

export interface GetPartnerThemeResponse
  extends StrapiResponse<PartnerThemesData> {
  url: string;
}

export async function getPartnerThemes(): Promise<GetPartnerThemeResponse> {
  const urlParams = createPartnerThemeStrapiApi();
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

  const data = await res.json().then((output) => {
    return {
      meta: output.meta,
      data: output.data,
    };
  });

  return { ...data, url: apiBaseUrl };
}
