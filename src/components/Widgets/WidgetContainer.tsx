'use client';
import { LinkMap } from '@/const/linkMap';
import { TabsMap } from '@/const/tabsMap';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useActiveTabStore } from '@/stores/activeTab';
import type { StarterVariantType } from '@/types/internal';
import { ChainId } from '@lifi/sdk';
import { usePathname } from 'next/navigation';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ThemesMap } from 'src/const/themesMap';
import { useChainTokenSelectionStore } from 'src/stores/chainTokenSelection';
import { PartnerThemeFooterImage } from '../PartnerThemeFooterImage';
import { WidgetContainerBox } from './WidgetsContainer.style';

interface WidgetContainerProps {
  widgetVariant: StarterVariantType;
  welcomeScreenClosed: boolean;
  children: React.ReactNode;
}

export function WidgetContainer({
  widgetVariant,
  welcomeScreenClosed,
  children,
}: WidgetContainerProps) {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { setWelcomeScreenClosed } = useWelcomeScreen(welcomeScreenClosed);
  const pathname = usePathname();
  const [starterVariantUsed, setStarterVariantUsed] = useState(false);
  const welcomeScreen = useWelcomeScreen(welcomeScreenClosed);

  const { sourceChainToken, destinationChainToken } =
    useChainTokenSelectionStore();

  const activeChainAlert =
    sourceChainToken?.chainId === ChainId.SEI ||
    destinationChainToken?.chainId === ChainId.SEI ||
    sourceChainToken?.chainId === ChainId.SOL ||
    destinationChainToken?.chainId === ChainId.SOL;

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

  const themeVariant = useMemo(() => {
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
  }, [getActiveWidget, starterVariant, activeTab, themeVariant]);

  return (
    <WidgetContainerBox
      welcomeScreenClosed={welcomeScreen.welcomeScreenClosed || false}
    >
      {children}
      {activeChainAlert && <PartnerThemeFooterImage />}
    </WidgetContainerBox>
  );
}
