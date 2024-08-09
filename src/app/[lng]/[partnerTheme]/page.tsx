import { getCookies } from '@/app/lib/getCookies';
import { getPartnerThemes } from '@/app/lib/getPartnerThemes';
import { WidgetContainer, Widgets } from '@/components/Widgets';
import { Widget } from '@/components/Widgets/Widget';
import App from '../../ui/app/App';

export const dynamicParams = false;

export async function generateStaticParams() {
  const partnerThemes = await getPartnerThemes();

  let customPath = [
    { partnerTheme: 'memecoins' },
    ...partnerThemes.data.map((d) => ({ partnerTheme: d.attributes.uid })),
  ];

  return customPath;
}

export default function Page() {
  const variant = 'default'; // exchange
  const { activeThemeMode, welcomeScreenClosed } = getCookies();
  const isWelcomeScreenClosed = welcomeScreenClosed === 'true';

  return (
    <App starterVariant={variant} isWelcomeScreenClosed={isWelcomeScreenClosed}>
      <WidgetContainer welcomeScreenClosed={true}>
        <Widgets
          closedWelcomeScreen={isWelcomeScreenClosed}
          widgetVariant={variant}
        />
        <Widget starterVariant={variant} activeThemeMode={activeThemeMode} />
      </WidgetContainer>
    </App>
  );
}
