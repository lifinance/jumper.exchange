import { getCookies } from '@/app/lib/getCookies';
import App from '@/app/ui/app/App';
import { Widgets } from '@/components/Widgets';
import { Widget } from '@/components/Widgets/Widget';
import { WidgetContainer } from '@/components/Widgets/WidgetContainer';

const Page = () => {
  const variant = 'refuel';
  const { activeTheme, welcomeScreenClosed } = getCookies();
  const isWelcomeScreenClosed = welcomeScreenClosed === 'true';

  return (
    <App starterVariant={variant} isWelcomeScreenClosed={isWelcomeScreenClosed}>
      <WidgetContainer welcomeScreenClosed={true} widgetVariant={'refuel'}>
        <Widgets
          activeTheme={activeTheme}
          closedWelcomeScreen={!!welcomeScreenClosed}
          widgetVariant={variant}
        />
        <Widget starterVariant={variant} activeTheme={activeTheme} />
      </WidgetContainer>
    </App>
  );
};

export default Page;
