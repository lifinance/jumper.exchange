import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { STRAPI_PARTNER_THEMES } from 'src/const/strapiContentKeys';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from 'src/const/trackingKeys';
import { useStrapi } from 'src/hooks/useStrapi';
import type { PartnerThemesData } from 'src/types/strapi';
import { useTheme } from 'next-themes';

export const useThemeMenuContent = () => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const { resolvedTheme, setTheme } = useTheme();

  const { data: partnerThemes, isSuccess } = useStrapi<PartnerThemesData>({
    contentType: STRAPI_PARTNER_THEMES,
    queryKey: ['partner-themes'],
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

  partnerThemes?.map(
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

  return { themes: themes, isSuccess };
};
