import type { Breakpoint } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { FeatureCard } from 'src/components';
import { useFeatureCards } from 'src/hooks';
import { useSettingsStore } from 'src/stores';
import type { FeatureCardData } from 'src/types';
import { deepMerge, removeEmpty } from 'src/utils';
import { shallow } from 'zustand/shallow';
import { FeatureCardsContainer } from '.';

export const FeatureCards = () => {
  const [disabledFeatureCards, welcomeScreenClosed] = useSettingsStore(
    (state) => [state.disabledFeatureCards, state.welcomeScreenClosed],
    shallow,
  );
  // get english response
  const { featureCards: defaultFeatureCards, isSuccess } = useFeatureCards();
  // get translated response
  const { featureCards: translatedFeatureCards } = useFeatureCards({
    translation: true,
  });

  // remove null´s (missing entries) from translated object
  const featureCards: FeatureCardData[] | undefined = useMemo(() => {
    const cleanedTranslation = translatedFeatureCards?.map((el) =>
      removeEmpty(el),
    );
    // merge
    const filteredResponse = defaultFeatureCards?.map((el) => {
      const translatedItem = cleanedTranslation?.find(
        (foundItem) =>
          foundItem?.attributes?.DisplayConditions.id ===
          el.attributes?.DisplayConditions.id,
      );
      if (translatedItem) {
        return deepMerge(el, translatedItem);
      }
      return el;
    });

    if (filteredResponse?.length) {
      const featureCards = filteredResponse
        .filter(
          (el, index) =>
            isSuccess &&
            el.attributes.DisplayConditions &&
            !disabledFeatureCards.includes(el.attributes.DisplayConditions?.id),
        )
        .slice(0, 4);
      return featureCards;
    }
  }, [
    defaultFeatureCards,
    disabledFeatureCards,
    isSuccess,
    translatedFeatureCards,
  ]);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg' as Breakpoint));
  return (
    isDesktop &&
    welcomeScreenClosed && (
      <FeatureCardsContainer>
        {featureCards?.map((cardData, index) => {
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
