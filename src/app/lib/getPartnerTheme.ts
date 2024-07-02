import type {
  PartnerTheme,
  PartnerThemesData,
  StrapiResponse,
} from '@/types/strapi';
import { PartnerThemeStrapiApi } from '@/utils/strapi/StrapiApi';
import type { PaletteColorOptions } from '@mui/material';

export interface GetPartnerThemesResponse
  extends StrapiResponse<PartnerThemesData> {
  url: string;
}

function transformToPaletteColorOptions(a: any): PaletteColorOptions {
  if (!a) {
    return a;
  }

  return { main: a };
}

function transformCustomization(theme: PartnerTheme) {
  if (!theme.customization) {
    return theme;
  }

  return {
    ...theme,
    customization: {
      ...theme.customization,
      palette: Object.keys(theme.customization.palette).reduce(
        (acc, key) => {
          acc[key] = transformToPaletteColorOptions(
            theme.customization?.palette[key],
          );
          return acc;
        },
        {} as Record<string, PaletteColorOptions>,
      ),
    },
  };
}

export async function getPartnerThemes(
  uid?: string,
): Promise<GetPartnerThemesResponse | void> {
  if (!uid) {
    return;
  }
  const urlParams = new PartnerThemeStrapiApi().filterUid(uid);
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

  if (
    data.data[0].attributes.lightConfig &&
    data.data[0].attributes.lightConfig.customization
  ) {
    data.data[0].attributes.lightConfig.customization = transformCustomization(
      data.data[0].attributes.lightConfig.customization,
    );
  }
  if (
    data.data[0].attributes.darkConfig &&
    data.data[0].attributes.darkConfig.customization
  ) {
    data.data[0].attributes.darkConfig.customization = transformCustomization(
      data.data[0].attributes.darkConfig.customization,
    );
  }
  return { ...data, url: apiBaseUrl };
}

// //transforming from
// { palette: { primary: '#ff0000' } }

// // to
// { palette: { primary: { main: '#ff0000' } } }
