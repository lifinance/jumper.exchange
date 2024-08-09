import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { createPartnerThemeStrapiApi } from '@/utils/strapi/generateStrapiUrl';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { STRAPI_PARTNER_THEMES } from 'src/const/strapiContentKeys';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from 'src/const/trackingKeys';
import type { PartnerThemesData } from 'src/types/strapi';

export const useThemeMenuContent = () => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const { resolvedTheme, setTheme } = useTheme();

  const partnerThemes = createPartnerThemeStrapiApi();
  const { data: partnerThemesData } = useQuery({
    queryKey: [STRAPI_PARTNER_THEMES],
    queryFn: async () => {
      const response = await fetch(
        decodeURIComponent(partnerThemes.apiUrl.href),
        {
          headers: {
            Authorization: `Bearer ${partnerThemes.getApiAccessToken()}`,
          },
        },
      );
      const result = await response.json();
      return result;
    },
    refetchInterval: 1000 * 60 * 60,
  });

  const handleThemeSwitch = (theme: string) => {
    trackEvent({
      category: TrackingCategory.ThemesMenu,
      action: TrackingAction.SwitchThemeTemplate,
      label: `theme_${theme ?? 'default'}`,
      data: {
        [TrackingEventParameter.SwitchedTemplate]: theme,
      },
    });
    setTheme(theme);
  };

  const themes: any = [
    {
      label: t('navbar.themes.default'),
      onClick: () => {
        handleThemeSwitch('system');
      },
      checkIcon:
        resolvedTheme === 'dark' ||
        resolvedTheme === 'light' ||
        resolvedTheme === undefined,
    },
  ];

  (partnerThemesData?.data as PartnerThemesData[])?.map(
    (el) =>
      el.attributes.SelectableInMenu &&
      themes.push({
        label: el.attributes.PartnerName,
        onClick: () => {
          handleThemeSwitch(el?.attributes.uid);
        },
        checkIcon: resolvedTheme === el.attributes.uid,
      }),
  );

  return { themes: themes };
};
