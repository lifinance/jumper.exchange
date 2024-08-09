import { CarouselContainer } from '@/components/Blog/BlogCarousel/CarouselContainer';
import { useOngoingQuests } from '@/hooks/useOngoingQuests';
import type { Quest } from '@/types/loyaltyPass';
import { useTranslation } from 'react-i18next';
import { QuestCard } from '../QuestCard/QuestCard';
import { QuestCardSkeleton } from '../QuestCard/QuestCardSkeleton';
import { QuestCarouselContainer } from './QuestCarousel.style';

interface QuestCarouselProps {
  quests?: Quest[];
  loading: boolean;
}

export const QuestCarousel = ({ quests, loading }: QuestCarouselProps) => {
  const { url } = useOngoingQuests();
  const { t } = useTranslation();

  const isNotLive = !loading && (!quests || quests.length === 0);

  return (
    <>
      {!isNotLive ? (
        <QuestCarouselContainer>
          <CarouselContainer title={t('missions.available')}>
            {!loading
              ? quests?.map((quest: Quest, index: number) => {
                  return (
                    <QuestCard
                      key={`ongoing-mission-${index}`}
                      active={true}
                      title={quest?.attributes.Title}
                      image={
                        quest.attributes.Image?.data?.attributes?.url &&
                        new URL(
                          quest.attributes.Image?.data?.attributes?.url,
                          url,
                        ).toString()
                      }
                      points={quest?.attributes.Points}
                      link={quest?.attributes.Link}
                      startDate={quest?.attributes.StartDate}
                      endDate={quest?.attributes.EndDate}
                      platformName={
                        quest?.attributes.quests_platform?.data?.attributes
                          ?.Name
                      }
                      platformImage={new URL(
                        quest.attributes.quests_platform?.data?.attributes?.Logo?.data?.attributes?.url,
                        url,
                      ).toString()}
                    />
                  );
                })
              : Array.from({ length: 3 }, () => 42).map((_, idx) => (
                  <QuestCardSkeleton key={'mission-card-skeleton-' + idx} />
                ))}
          </CarouselContainer>
        </QuestCarouselContainer>
      ) : null}
    </>
  );
};
