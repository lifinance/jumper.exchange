import { getCookies } from '@/app/lib/getCookies';
import App from '@/app/ui/app/App';
import { OnRamper } from '@/components/OnRamper';
import { WidgetContainerBox, Widgets } from '@/components/Widgets';

const Page = () => {
  const variant = 'buy';
  const { activeTheme, welcomeScreenClosed } = getCookies();
  const isWelcomeScreenClosed = welcomeScreenClosed === 'true';

  return (
    <App starterVariant={variant} isWelcomeScreenClosed={isWelcomeScreenClosed}>
      <WidgetContainerBox welcomeScreenClosed={true}>
        <Widgets
          activeTheme={activeTheme}
          closedWelcomeScreen={!!welcomeScreenClosed}
          widgetVariant={variant}
        />

        <OnRamper />
      </WidgetContainerBox>
    </App>
  );
};

export default Page;
