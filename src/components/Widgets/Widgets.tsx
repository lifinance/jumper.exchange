'use client';
import { ChainAlert } from '@/components/Alerts';
import { LinkMap } from '@/const/linkMap';
import { TabsMap } from '@/const/tabsMap';
import { useActiveTabStore } from '@/stores/activeTab';
import type { StarterVariantType } from '@/types/internal';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useMetaMask } from 'src/hooks/useMetaMask';
import { PartnerThemeFooterImage } from '../PartnerThemeFooterImage';
import { WidgetEvents } from './WidgetEvents';

interface WidgetsProps {
  widgetVariant: StarterVariantType;
  closedWelcomeScreen: boolean;
}

export function Widgets({ widgetVariant, closedWelcomeScreen }: WidgetsProps) {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const [starterVariantUsed, setStarterVariantUsed] = useState(false);
  const { isMetaMaskConnector } = useMetaMask();

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

  const getActiveWidget = useCallback(() => {
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
      setStarterVariantUsed(true);
    }
  }, [setActiveTab, starterVariant, starterVariantUsed]);

  useLayoutEffect(() => {
    getActiveWidget();
  }, [getActiveWidget, starterVariant, activeTab]);

  return (
    <>
      <ChainAlert />
      <WidgetEvents />
      <PartnerThemeFooterImage />
    </>
  );
}
