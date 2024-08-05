import { getCookies } from '@/app/lib/getCookies';
import { WidgetContainer, Widgets } from '@/components/Widgets';
import { Widget } from '@/components/Widgets/Widget';
import App from '../../ui/app/App';

export default function Page() {
  const variant = 'default'; // exchange
  const { activeThemeMode, activeTheme, welcomeScreenClosed } = getCookies();
  const isWelcomeScreenClosed = welcomeScreenClosed === 'true';

  return (
    <App starterVariant={variant} isWelcomeScreenClosed={isWelcomeScreenClosed}>
      <WidgetContainer welcomeScreenClosed={true}>
        <Widgets
          closedWelcomeScreen={isWelcomeScreenClosed}
          widgetVariant={variant}
        />
        <Widget
          starterVariant={variant}
          activeTheme={activeTheme}
          activeThemeMode={activeThemeMode}
        />
      </WidgetContainer>
    </App>
  );
}
