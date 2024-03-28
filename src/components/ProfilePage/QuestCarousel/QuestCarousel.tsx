import { CarouselContainer } from '@/components/Blog/BlogCarousel/CarouselContainer';
import { useOngoingQuests } from '@/hooks/useOngoingQuests';
import type { Quest } from '@/types/loyaltyPass';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BlogCarouselContainer } from '../../Blog/BlogCarousel/BlogCarousel.style';
import { QuestCard } from '../QuestCard/QuestCard';
import { QuestCardSkeleton } from '../QuestCard/QuestCardSkeleton';

interface QuestCarouselProps {
  quests?: Quest[];
}

export const QuestCarousel = ({ quests }: QuestCarouselProps) => {
  const { url } = useOngoingQuests();
  const { t } = useTranslation();

  return (
    <BlogCarouselContainer>
      <CarouselContainer title={t('missions.available')}>
        <Stack direction={'row'} spacing={4}>
          {quests ? (
            quests?.map((quest: Quest, index: number) => {
              return (
                <QuestCard
                  key={`ongoing-mission-${index}`}
                  active={true}
                  title={quest?.attributes.Title}
                  image={`
                    ${new URL(
                      quest.attributes.Image?.data?.attributes?.url,
                      url.origin,
                    )}`}
                  points={quest?.attributes.Points}
                  link={quest?.attributes.Link}
                  startDate={quest?.attributes.StartDate}
                  endDate={quest?.attributes.EndDate}
                  platformName={
                    quest?.attributes.quests_platform?.data?.attributes?.Name
                  }
                  platformImage={`
                    ${new URL(
                      quest.attributes.quests_platform?.data?.attributes?.Logo?.data?.attributes?.url,
                      url.origin,
                    )}
                  `}
                />
              );
            })
          ) : (
            <>
              {Array.from({ length: 3 }, () => 42).map((_, idx) => (
                <QuestCardSkeleton key={'mission-card-skeleton-' + idx} />
              ))}
            </>
          )}
        </Stack>
      </CarouselContainer>
    </BlogCarouselContainer>
  );
};
