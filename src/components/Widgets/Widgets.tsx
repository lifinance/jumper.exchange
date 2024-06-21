'use client';
import { SolanaAlert } from '@/components/Alerts';
import { OnRamper } from '@/components/OnRamper';
import { LinkMap } from '@/const/linkMap';
import { TabsMap } from '@/const/tabsMap';
import { useSession } from '@/hooks/useSession';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useActiveTabStore } from '@/stores/activeTab';
import type { StarterVariantType, ThemeVariantType } from '@/types/internal';
import type { WidgetSubvariant } from '@lifi/widget';
import { usePathname } from 'next/navigation';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ThemesMap } from 'src/const/themesMap';
import { TrackingAction, TrackingCategory } from 'src/const/trackingKeys';
import { useUserTracking } from 'src/hooks/userTracking';
import type { ThemeModesSupported } from 'src/types/settings';
import { Widget } from './Widget';
import { WidgetEvents } from './WidgetEvents';
import { WidgetContainer } from './Widgets.style';

interface WidgetsProps {
  widgetVariant: StarterVariantType;
  activeTheme: ThemeModesSupported | undefined;
  closedWelcomeScreen: boolean;
}

export function Widgets({
  widgetVariant,
  activeTheme,
  closedWelcomeScreen,
}: WidgetsProps) {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { welcomeScreenClosed, setWelcomeScreenClosed } =
    useWelcomeScreen(closedWelcomeScreen);
  const pathname = usePathname();
  const { trackEvent } = useUserTracking();
  const [starterVariantUsed, setStarterVariantUsed] = useState(false);
  const [_starterVariant, setStarterVariant] = useState<
    WidgetSubvariant | 'buy'
  >(TabsMap.Exchange.variant);
  const [_themeVariant, setThemeVariant] = useState<
    ThemeVariantType | undefined
  >(undefined);

  const handleWelcomeScreenEnter = (widgetVariant: StarterVariantType) => {
    if (!welcomeScreenClosed) {
      setWelcomeScreenClosed(true);
      trackEvent({
        category: TrackingCategory.WelcomeScreen,
        action: TrackingAction.CloseWelcomeScreen,
        label: 'enter_welcome_screen_on_widget-click',
        data: { widgetVariant },
        enableAddressable: true,
      });
    }
  };
  // testing! todo: remove
  const sessionID = useSession();
  console.log('sessionId', sessionID);

  const starterVariant: StarterVariantType = useMemo(() => {
    if (widgetVariant) {
      return widgetVariant;
    } else {
      let url = window?.location.pathname.slice(1);
      if (Object.values(LinkMap).includes(url as LinkMap)) {
        if (!!TabsMap.Buy.destination.filter((el) => el === url).length) {
          return TabsMap.Buy.variant;
        } else if (
          !!TabsMap.Refuel.destination.filter((el) => el === url).length
        ) {
          return TabsMap.Refuel.variant;
        } else {
          return TabsMap.Exchange.variant;
        }
      } else {
        // default and fallback: Exchange-Tab
        return TabsMap.Exchange.variant;
      }
    }
  }, [widgetVariant]);

  const themeVariant: ThemeVariantType | undefined = useMemo(() => {
    if (pathname?.includes('memecoins')) {
      setWelcomeScreenClosed(true);
      //Todo: review the logic of the tab selection.
      setActiveTab(false);
      return ThemesMap.Memecoins;
    }
    // remove setWelcomeScreenClosed from array to prevent infinite re-rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, setActiveTab]);

  const getActiveWidget = useCallback(() => {
    setThemeVariant(themeVariant);
    if (!starterVariantUsed) {
      switch (starterVariant) {
        case TabsMap.Exchange.variant:
          setActiveTab(TabsMap.Exchange.index);
          break;
        case TabsMap.Refuel.variant:
          setActiveTab(TabsMap.Refuel.index);
          break;
        case TabsMap.Buy.variant:
          setActiveTab(TabsMap.Buy.index);
          break;
        default:
          setActiveTab(TabsMap.Exchange.index);
      }
      setStarterVariant(starterVariant);
      setStarterVariantUsed(true);
    } else {
      switch (activeTab) {
        case TabsMap.Exchange.index:
          setStarterVariant(TabsMap.Exchange.variant);
          break;
        case TabsMap.Refuel.index:
          setStarterVariant(TabsMap.Refuel.variant);
          break;
        case TabsMap.Buy.index:
          setStarterVariant(TabsMap.Buy.variant);
          break;
        default:
          setStarterVariant(TabsMap.Exchange.variant);
      }
    }
  }, [
    activeTab,
    setActiveTab,
    starterVariant,
    starterVariantUsed,
    themeVariant,
  ]);

  useLayoutEffect(() => {
    getActiveWidget();
  }, [getActiveWidget, starterVariant, activeTab, themeVariant]);

  return (
    <>
      <WidgetContainer
        onClick={() => handleWelcomeScreenEnter(TabsMap.Exchange.variant)}
        isActive={_starterVariant === TabsMap.Exchange.variant}
        welcomeScreenClosed={!!welcomeScreenClosed}
      >
        <Widget
          starterVariant={TabsMap.Exchange.variant as WidgetSubvariant}
          themeVariant={_themeVariant}
          activeTheme={activeTheme}
        />
      </WidgetContainer>
      <WidgetContainer
        onClick={() => handleWelcomeScreenEnter(TabsMap.Refuel.variant)}
        isActive={_starterVariant === TabsMap.Refuel.variant}
        welcomeScreenClosed={!!welcomeScreenClosed}
      >
        <Widget
          starterVariant={TabsMap.Refuel.variant as WidgetSubvariant}
          activeTheme={activeTheme}
        />
      </WidgetContainer>
      <SolanaAlert />
      {process.env.NEXT_PUBLIC_ONRAMPER_ENABLED ? (
        <WidgetContainer
          onClick={() => handleWelcomeScreenEnter(TabsMap.Buy.variant)}
          isActive={_starterVariant === TabsMap.Buy.variant}
          welcomeScreenClosed={!!welcomeScreenClosed}
        >
          <OnRamper />
        </WidgetContainer>
      ) : null}
      <WidgetEvents />
    </>
  );
}
