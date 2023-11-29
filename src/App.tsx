import { useEffect } from 'react';
import { useCookie3, useInitUserTracking } from 'src/hooks';
import { AppProvider } from './AppProvider';
import {
  FeatureCards,
  Menus,
  Navbar,
  PoweredBy,
  WelcomeScreen,
  Widgets,
} from './components';

export function App() {
  const { initTracking } = useInitUserTracking();
  const cookie3 = useCookie3();

  useEffect(() => {
    initTracking({});
    cookie3?.trackPageView();
  }, [cookie3, initTracking]);

  return (
    <AppProvider>
      <Navbar />
      <Menus />
      <Widgets />
      <WelcomeScreen />
      <PoweredBy />
      <FeatureCards />
    </AppProvider>
  );
}
