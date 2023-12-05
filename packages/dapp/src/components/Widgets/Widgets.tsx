import { WidgetSubvariant } from '@lifi/widget';
import { Grid, useTheme } from '@mui/material';
import { TestnetAlert } from '@transferto/shared/src';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { LinkMap } from '../../const';
import { TabsMap } from '../../const/tabsMap';
import { useActiveTabStore, useSettingsStore } from '../../stores';
import { StarterVariantType } from '../../types';
import { OnRamper } from '../OnRamper';
import { Widget } from '../Widget';
import { WidgetEvents } from './WidgetEvents';
import { WidgetContainer } from './Widgets.style';

export function Widgets() {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const [welcomeScreenClosed, onWelcomeScreenClosed] = useSettingsStore(
    (state) => [state.welcomeScreenClosed, state.onWelcomeScreenClosed],
  );
  const theme = useTheme();
  const [starterVariantUsed, setStarterVariantUsed] = useState(false);
  const [_starterVariant, setStarterVariant] = useState<
    WidgetSubvariant | 'buy'
  >(TabsMap.Exchange.variant);

  const starterVariant: StarterVariantType = useMemo(() => {
    let url = window.location.pathname.slice(1);
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
  }, []);

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
  }, [activeTab, setActiveTab, starterVariant, starterVariantUsed]);

  const handleCloseWelcomeScreen = () => {
    onWelcomeScreenClosed(true);
  };

  useLayoutEffect(() => {
    getActiveWidget();
  }, [getActiveWidget, starterVariant, activeTab]);

  return (
    <>
      {import.meta.env.MODE === 'testnet' && (
        <Grid item xs={12} mt={theme.spacing(3)}>
          <TestnetAlert />
        </Grid>
      )}
      <WidgetContainer
        onClick={handleCloseWelcomeScreen}
        isActive={_starterVariant === TabsMap.Exchange.variant}
        welcomeScreenClosed={welcomeScreenClosed}
      >
        <Widget starterVariant={TabsMap.Exchange.variant as WidgetSubvariant} />
      </WidgetContainer>
      <WidgetContainer
        onClick={handleCloseWelcomeScreen}
        isActive={_starterVariant === TabsMap.Refuel.variant}
        welcomeScreenClosed={welcomeScreenClosed}
      >
        <Widget starterVariant={TabsMap.Refuel.variant as WidgetSubvariant} />
      </WidgetContainer>
      {import.meta.env.VITE_ONRAMPER_ENABLED ? (
        <WidgetContainer
          onClick={handleCloseWelcomeScreen}
          isActive={_starterVariant === TabsMap.Buy.variant}
          welcomeScreenClosed={welcomeScreenClosed}
        >
          <OnRamper handleCloseWelcomeScreen={handleCloseWelcomeScreen} />
        </WidgetContainer>
      ) : null}
      <WidgetEvents />
    </>
  );
}
