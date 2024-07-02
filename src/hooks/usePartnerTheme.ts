'use client';

import { useIsDapp } from '@/hooks/useIsDapp';
import { useStrapi } from '@/hooks/useStrapi';
import { useTheme } from '@mui/material';
import { useCookies } from 'react-cookie';
import { STRAPI_PARTNER_THEMES } from 'src/const/strapiContentKeys';
import { useSettingsStore } from 'src/stores/settings';
import type {
  MediaAttributes,
  PartnerTheme,
  PartnerThemesData,
} from 'src/types/strapi';
import { usePartnerFilter } from './usePartnerFilter';

interface usePartnerThemeProps {
  partnerTheme?: PartnerThemesData;
  backgroundColor?: string;
  currentCustomizedTheme?: any;
  footerImageUrl?: URL;
  footerUrl?: URL;
  availableWidgetTheme?: string;
  currentWidgetTheme?: PartnerTheme;
  logoUrl?: URL;
  logo?: MediaAttributes;
  activeUid?: string;
  imgUrl?: URL;
  isSuccess?: boolean;
}

export const usePartnerTheme = (): usePartnerThemeProps => {
  const theme = useTheme();
  const isDapp = useIsDapp();
  const [cookie] = useCookies(['theme', 'partnerThemeUid']);
  const { partnerName } = usePartnerFilter();
  const setThemeMode = useSettingsStore((state) => state.setThemeMode);

  const {
    data: partnerThemes,
    isSuccess,
    url,
  } = useStrapi<PartnerThemesData>({
    contentType: STRAPI_PARTNER_THEMES,
    queryKey: [
      'partner-themes-filter',
      partnerName ? partnerName : cookie.partnerThemeUid,
    ],
    filterUid: partnerName ? partnerName : cookie.partnerThemeUid,
  });

  let imageUrl: URL | undefined = undefined;
  if (
    cookie.partnerThemeUid &&
    partnerThemes?.length > 0 &&
    isSuccess &&
    (partnerThemes[0].attributes.BackgroundImageLight.data?.attributes.url ||
      partnerThemes[0].attributes.BackgroundImageDark.data?.attributes.url)
  ) {
    if (theme.palette.mode === 'light') {
      imageUrl = new URL(
        partnerThemes[0].attributes.BackgroundImageLight.data?.attributes.url,
        url.origin,
      );
    } else {
      imageUrl = new URL(
        partnerThemes[0].attributes.BackgroundImageDark.data?.attributes.url,
        url.origin,
      );
    }
  } else {
    imageUrl = undefined;
  }

  let footerImageUrl;
  if (
    cookie.partnerThemeUid &&
    partnerThemes?.length > 0 &&
    isSuccess &&
    (partnerThemes[0].attributes.FooterImageLight.data?.attributes.url ||
      partnerThemes[0].attributes.FooterImageDark.data?.attributes.url)
  ) {
    if (theme.palette.mode === 'light') {
      footerImageUrl = new URL(
        partnerThemes[0].attributes.FooterImageLight.data?.attributes.url,
        url.origin,
      );
    } else {
      footerImageUrl = new URL(
        partnerThemes[0].attributes.FooterImageDark.data?.attributes.url,
        url.origin,
      );
    }
  } else {
    footerImageUrl = undefined;
  }

  let footerUrl;
  if (
    cookie.partnerThemeUid &&
    partnerThemes?.length > 0 &&
    isSuccess &&
    partnerThemes[0].attributes.PartnerURL
  ) {
    footerUrl = new URL(partnerThemes[0].attributes.PartnerURL, url.origin);
  } else {
    footerImageUrl = undefined;
  }

  let logoUrl;
  let logo;
  if (
    cookie.partnerThemeUid &&
    partnerThemes?.length > 0 &&
    isSuccess &&
    (partnerThemes[0].attributes.LogoLight.data?.attributes.url ||
      partnerThemes[0].attributes.LogoDark.data?.attributes.url)
  ) {
    if (theme.palette.mode === 'light') {
      logoUrl = new URL(
        partnerThemes[0].attributes.LogoLight.data?.attributes.url,
        url.origin,
      );
      logo = partnerThemes[0].attributes.LogoLight.data?.attributes;
    } else {
      logoUrl = new URL(
        partnerThemes[0].attributes.LogoDark.data?.attributes.url,
        url.origin,
      );
      logo = partnerThemes[0].attributes.LogoDark.data?.attributes;
    }
  } else {
    logoUrl = undefined;
  }

  let backgroundColor;
  if (cookie.partnerThemeUid && partnerThemes?.length > 0 && isSuccess) {
    if (theme.palette.mode === 'light') {
      backgroundColor = partnerThemes[0].attributes.BackgroundColorLight;
    } else {
      backgroundColor = partnerThemes[0].attributes.BackgroundColorDark;
    }
  } else {
    backgroundColor = undefined;
  }

  let availableWidgetTheme;
  if (cookie.partnerThemeUid && partnerThemes?.length > 0 && isSuccess) {
    if (
      partnerThemes[0].attributes.lightConfig &&
      partnerThemes[0].attributes.darkConfig
    ) {
      availableWidgetTheme = 'system';
    } else if (partnerThemes[0].attributes.darkConfig) {
      setThemeMode('dark');
      availableWidgetTheme = 'dark';
    } else {
      setThemeMode('light');
      availableWidgetTheme = 'light';
    }
  }

  let currentWidgetTheme;
  if (availableWidgetTheme === 'system') {
    if (theme.palette.mode === 'light') {
      currentWidgetTheme = partnerThemes[0].attributes.lightConfig;
    } else {
      currentWidgetTheme = partnerThemes[0].attributes.darkConfig;
    }
  } else if (availableWidgetTheme === 'dark') {
    currentWidgetTheme = partnerThemes[0].attributes.darkConfig;
  } else if (availableWidgetTheme === 'light') {
    currentWidgetTheme = partnerThemes[0].attributes.lightConfig;
  } else {
    currentWidgetTheme = undefined;
  }

  let currentCustomizedTheme;
  if (availableWidgetTheme === 'system') {
    if (theme.palette.mode === 'light') {
      currentCustomizedTheme =
        partnerThemes[0].attributes.lightConfig?.customization;
    } else {
      currentCustomizedTheme =
        partnerThemes[0].attributes.darkConfig?.customization;
    }
  } else if (availableWidgetTheme === 'dark') {
    currentCustomizedTheme =
      partnerThemes[0].attributes.darkConfig?.customization;
  } else if (availableWidgetTheme === 'light') {
    currentCustomizedTheme =
      partnerThemes[0].attributes.lightConfig?.customization;
  } else {
    currentCustomizedTheme = undefined;
  }

  return {
    partnerTheme:
      isDapp && partnerThemes?.length > 0 ? partnerThemes[0] : undefined,
    backgroundColor: isDapp && backgroundColor ? backgroundColor : undefined,
    currentCustomizedTheme:
      isDapp && currentCustomizedTheme ? currentCustomizedTheme : undefined,
    footerImageUrl: isDapp && footerImageUrl ? footerImageUrl : undefined,
    footerUrl: isDapp && !!footerUrl ? new URL(footerUrl) : undefined,
    availableWidgetTheme:
      isDapp && availableWidgetTheme ? availableWidgetTheme : undefined,
    currentWidgetTheme:
      isDapp && currentWidgetTheme ? currentWidgetTheme : undefined,
    logoUrl: isDapp && logoUrl ? logoUrl : undefined,
    logo: isDapp && logo ? logo : undefined,
    activeUid: isDapp ? partnerName ?? cookie.partnerThemeUid : undefined,
    imgUrl: isDapp && imageUrl ? imageUrl : undefined,
    isSuccess: isDapp && isSuccess,
  };
};
