'use client';
import {
  STRAPI_FEATURE_CARDS,
  STRAPI_JUMPER_USERS,
} from '@/const/strapiContentKeys';
import { useAccounts } from '@/hooks/useAccounts';
import { useStrapi } from '@/hooks/useStrapi';
import { useSettingsStore } from '@/stores/settings/SettingsStore';
import type { FeatureCardData, JumperUserData } from '@/types/strapi';
import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useLoyaltyPass } from 'src/hooks/useLoyaltyPass';
import { usePersonalizedFeatureOnLevel } from 'src/hooks/usePersonalizedFeatureOnLevel';
import { useWidgetExpanded } from 'src/hooks/useWidgetExpanded';
import { shallow } from 'zustand/shallow';
import { FeatureCard, FeatureCardsContainer } from '.';

export const FeatureCards = () => {
  const [disabledFeatureCards] = useSettingsStore(
    (state) => [state.disabledFeatureCards, state.welcomeScreenClosed],
    shallow,
  );
  const { points } = useLoyaltyPass();
  const [cookie] = useCookies(['welcomeScreenClosed']);
  const widgetExpanded = useWidgetExpanded();
  const { account } = useAccounts();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const { data: cards, isSuccess } = useStrapi<FeatureCardData>({
    contentType: STRAPI_FEATURE_CARDS,
    queryKey: ['feature-cards'],
  });

  const { data: jumperUser } = useStrapi<JumperUserData>({
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
