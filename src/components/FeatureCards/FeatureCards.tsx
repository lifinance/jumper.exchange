'use client';
import {
  STRAPI_FEATURE_CARDS,
  STRAPI_JUMPER_USERS,
} from '@/const/strapiContentKeys';
import { useAccounts } from '@/hooks/useAccounts';
import { useSettingsStore } from '@/stores/settings/SettingsStore';
import type { FeatureCardData } from '@/types/strapi';
import {
  createFeatureCardStrapiApi,
  createJumperUserStrapiApi,
  createPersonalizedFeatureOnLevel,
} from '@/utils/strapi/generateStrapiUrl';
import { WidgetEvent, useWidgetEvents } from '@lifi/widget';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLoyaltyPass } from 'src/hooks/useLoyaltyPass';
import { shallow } from 'zustand/shallow';
import { FeatureCard, FeatureCardsContainer } from '.';
import { getLevelBasedOnPoints } from '../ProfilePage/LevelBox/TierBox';

export const FeatureCards = () => {
  const [disabledFeatureCards] = useSettingsStore(
    (state) => [state.disabledFeatureCards, state.welcomeScreenClosed],
    shallow,
  );
  const { points } = useLoyaltyPass();
  const [cookie] = useCookies(['welcomeScreenClosed']);
  const [widgetExpanded, setWidgetExpanded] = useState(false);
  const widgetEvents = useWidgetEvents();
  const { account } = useAccounts();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  // fetch feature-cards
  const featureCardsUrl = createFeatureCardStrapiApi();
  const { data: cards, isSuccess } = useQuery({
    queryKey: [STRAPI_FEATURE_CARDS],
    queryFn: async () => {
      const response = await fetch(
        decodeURIComponent(featureCardsUrl.apiUrl.href),
        {
          headers: {
            Authorization: `Bearer ${featureCardsUrl.getApiAccessToken()}`,
          },
        },
      );
      const result = await response.json();
      return result;
    },
    refetchInterval: 1000 * 60 * 60,
  });

  // fetch personalized feature-cards
  const jumperUsersUrl =
    createJumperUserStrapiApi().addJumperUsersPersonalizedFCParams(account);
  const { data: jumperUser } = useQuery({
    queryKey: [STRAPI_JUMPER_USERS],
    queryFn: async () => {
      const response = await fetch(
        decodeURIComponent(jumperUsersUrl.apiUrl.href),
        {
          headers: {
            Authorization: `Bearer ${featureCardsUrl.getApiAccessToken()}`,
          },
        },
      );
      const result = await response.json();
      return result;
    },
    enabled: account?.isConnected,
    refetchInterval: 1000 * 60 * 60,
  });

  // fetch personalized feature-cards based on points
  const levelData = getLevelBasedOnPoints(points);
  const personalizedFeatureOnLevel = createPersonalizedFeatureOnLevel(
    levelData.level,
  );
  const { data: featureCardsLevel } = useQuery({
    queryKey: ['personalizedFeatureCardsOnLevel'],

    queryFn: async () => {
      const response = await fetch(
        decodeURIComponent(personalizedFeatureOnLevel.apiUrl.href),
        {
          headers: {
            Authorization: `Bearer ${personalizedFeatureOnLevel.getApiAccessToken()}`,
          },
        },
      );
      const result = await response.json();
      return result.data;
    },
    enabled:
      !!account?.address &&
      account.chainType === 'EVM' &&
      !!points &&
      (!jumperUser || jumperUser?.length === 0),
    refetchInterval: 1000 * 60 * 60,
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
    if (Array.isArray(cards?.data) && !!cards?.data.length) {
      return (cards.data as FeatureCardData[])
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
    // cookie.welcomeScreenClosed &&
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
