import { getCookies } from '@/app/lib/getCookies';
import { Widgets } from '@/components/Widgets';
import { Widget } from '@/components/Widgets/Widget';
import { WidgetContainer } from '@/components/Widgets/WidgetContainer';
import App from '../../ui/app/App';

export default function Page() {
  const variant = 'default'; // exchange
  const { activeTheme, welcomeScreenClosed } = getCookies();
  const isWelcomeScreenClosed = welcomeScreenClosed === 'true';

  return (
    <App starterVariant={variant} isWelcomeScreenClosed={isWelcomeScreenClosed}>
      <WidgetContainer welcomeScreenClosed={true} widgetVariant={'default'}>
        <Widgets
          activeTheme={activeTheme}
          closedWelcomeScreen={isWelcomeScreenClosed}
          widgetVariant={variant}
        />
        <Widget starterVariant={variant} activeTheme={activeTheme} />
      </WidgetContainer>
    </App>
  );
}
