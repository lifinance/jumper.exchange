'use client';
import {
  STRAPI_FEATURE_CARDS,
  STRAPI_JUMPER_USERS,
} from '@/const/strapiContentKeys';
import { useAccounts } from '@/hooks/useAccounts';
import { useStrapi } from '@/hooks/useStrapi';
import { useSettingsStore } from '@/stores/settings/SettingsStore';
import type { FeatureCardData, JumperUserData } from '@/types/strapi';
import { WidgetEvent, useWidgetEvents } from '@lifi/widget';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { shallow } from 'zustand/shallow';
import { FeatureCard, FeatureCardsContainer } from '.';
import { usePersonalizedFeatureOnLevel } from 'src/hooks/usePersonalizedFeatureOnLevel';
import { useLoyaltyPass } from 'src/hooks/useLoyaltyPass';

export const FeatureCards = () => {
  const [disabledFeatureCards] = useSettingsStore(
    (state) => [state.disabledFeatureCards, state.welcomeScreenClosed],
    shallow,
  );
  const { isLoading, points, tier, pdas } = useLoyaltyPass();
  const [cookie] = useCookies(['welcomeScreenClosed']);
  const [widgetExpanded, setWidgetExpanded] = useState(false);
  const widgetEvents = useWidgetEvents();
  const { account } = useAccounts();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const { data: cards, isSuccess } = useStrapi<FeatureCardData>({
    contentType: STRAPI_FEATURE_CARDS,
    queryKey: ['feature-cards'],
  });

  const { data: jumperUser, isSuccess: isJumperUsersSuccess } =
    useStrapi<JumperUserData>({
      contentType: STRAPI_JUMPER_USERS,
      filterPersonalFeatureCards: {
        enabled: true,
        account: account,
      },
      queryKey: ['personalized-feature-cards'],
    });

  const { featureCards: featureCardsLevel } = usePersonalizedFeatureOnLevel({
    points: points,
    enabled: !!points && (!jumperUser || jumperUser?.length === 0),
  });

  useEffect(() => {
    const handleWidgetExpanded = async (expanded: boolean) => {
      setWidgetExpanded(expanded);
    };
    widgetEvents.on(WidgetEvent.WidgetExpanded, handleWidgetExpanded);

    return () =>
      widgetEvents.off(WidgetEvent.WidgetExpanded, handleWidgetExpanded);
  }, [widgetEvents, widgetExpanded]);

  function excludedFeatureCardsFilter(el: FeatureCardData) {
    if (
      !el.attributes.featureCardsExclusions ||
      !Array.isArray(el.attributes.featureCardsExclusions?.data)
    ) {
      return true;
    }

    const exclusions = el.attributes.featureCardsExclusions.data.map(
      (item) => item.attributes.uid,
    );

    return !exclusions.some((uid) => disabledFeatureCards.includes(uid));
  }

  const slicedFeatureCards = useMemo(() => {
    if (Array.isArray(cards) && !!cards.length) {
      return cards
        ?.filter(excludedFeatureCardsFilter)
        ?.filter(
          (el, index) =>
            isSuccess &&
            el.attributes.DisplayConditions &&
            !disabledFeatureCards.includes(el.attributes.uid),
        )
        .slice(0, 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, isSuccess]);

  const slicedPersonalizedFeatureCards = useMemo(() => {
    const personalizedFeatureCards =
      jumperUser && jumperUser[0]?.attributes?.feature_cards.data.length > 0
        ? jumperUser && jumperUser[0]?.attributes?.feature_cards.data
        : featureCardsLevel && featureCardsLevel.length > 0
          ? [featureCardsLevel[0]]
          : undefined;

    if (
      Array.isArray(personalizedFeatureCards) &&
      !!personalizedFeatureCards.length
    ) {
      return personalizedFeatureCards
        ?.filter(excludedFeatureCardsFilter)
        ?.filter(
          (el, index) =>
            el.attributes.DisplayConditions &&
            !disabledFeatureCards.includes(el.attributes.uid),
        )
        .slice(0, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jumperUser, featureCardsLevel]);

  return (
    isDesktop &&
    cookie.welcomeScreenClosed &&
    !widgetExpanded && (
      <FeatureCardsContainer>
        {slicedPersonalizedFeatureCards?.map((cardData, index) => {
          return (
            <FeatureCard
              isSuccess={isSuccess}
              data={cardData}
              key={`feature-card-p-${index}`}
            />
          );
        })}
        {slicedFeatureCards?.map((cardData, index) => {
          return (
            <FeatureCard
              isSuccess={isSuccess}
              data={cardData}
              key={`feature-card-${index}`}
            />
          );
        })}
      </FeatureCardsContainer>
    )
  );
};
