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
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';
import { useStrapi } from 'src/hooks/useStrapi';
import type { PartnerThemesData } from 'src/types/strapi';

export const useThemeMenuContent = () => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const segment = useSelectedLayoutSegment();
  const { updateTheme } = usePartnerTheme();

  const [cookie] = useCookies(['partnerThemeUid']);
  const { data: partnerThemes, isSuccess } = useStrapi<PartnerThemesData>({
    contentType: STRAPI_PARTNER_THEMES,
    queryKey: ['partner-themes'],
  });

  const handleThemeSwitch = (theme: PartnerThemesData | undefined) => {
    trackEvent({
      category: TrackingCategory.ThemesMenu,
      action: TrackingAction.SwitchThemeTemplate,
      label: `theme_${theme ?? 'default'}`,
      data: {
        [TrackingEventParameter.SwitchedTemplate]:
          theme?.attributes.PartnerName.replace(' ', '') ?? 'default',
      },
    });
    console.log('CHECK HANDLE THEME SWITCH', theme);
    updateTheme(theme?.attributes.uid);
  };

  const themes: any = [
    {
      label: t('navbar.themes.default'),
      onClick: () => {
        handleThemeSwitch(undefined);
      },
      checkIcon:
        !cookie.partnerThemeUid || cookie.partnerThemeUid === 'undefined',
    },
  ];

  partnerThemes?.map(
    (el) =>
      el.attributes.SelectableInMenu &&
      themes.push({
        label: el.attributes.PartnerName,
        onClick: () => {
          handleThemeSwitch(el);
        },
        checkIcon: cookie.partnerThemeUid === el.attributes.uid,
      }),
  );

  return { themes: themes, isSuccess };
};
