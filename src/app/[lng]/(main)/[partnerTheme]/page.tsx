import { getCookies } from '@/app/lib/getCookies';
import { WidgetContainerBox, Widgets } from '@/components/Widgets';
import { Widget } from '@/components/Widgets/Widget';
import App from '../../../ui/app/App';

export const dynamicParams = false;

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_LIFI_API_URL;
  const response = await fetch(`${apiUrl}/tools`);
  const result = await response.json();
  const bridges = result?.bridges;
  const exchanges = result?.exchanges;
  let filteredBridges = [];
  let filteredDexes = [];
  if (bridges) {
    filteredBridges = Object.values(bridges).map((elem: any) => elem.key);
  }
  if (exchanges) {
    filteredDexes = Object.values(exchanges).map((elem: any) => elem.key);
  }
  const res = filteredBridges.concat(filteredDexes);
  const path = res.map((partnerTheme) => ({ partnerTheme }));
  const customPath = [{ partnerTheme: 'memecoins' }];
  return [...path, ...customPath];
}

export default function Page() {
  const variant = 'default'; // exchange
  const { activeTheme, welcomeScreenClosed } = getCookies();
  const isWelcomeScreenClosed = welcomeScreenClosed === 'true';

  return (
    <App starterVariant={variant} isWelcomeScreenClosed={isWelcomeScreenClosed}>
      <WidgetContainerBox welcomeScreenClosed={true}>
        <Widgets
          activeTheme={activeTheme}
          closedWelcomeScreen={isWelcomeScreenClosed}
          widgetVariant={variant}
        />
        <Widget starterVariant={variant} activeTheme={activeTheme} />
      </WidgetContainerBox>
    </App>
  );
}
