import { CarouselContainer } from '@/components/Blog/BlogCarousel/CarouselContainer';
import type { Quest } from '@/types/loyaltyPass';
import { useTranslation } from 'react-i18next';
import { useOngoingFestMissions } from 'src/hooks/useOngoingFestMissions';
import { QuestCard } from '../QuestCard/QuestCard';
import { QuestCardSkeleton } from '../QuestCard/QuestCardSkeleton';
import { SuperfestCarouselContainer } from './ActiveSuperfestMissionsCarousel.style';

function checkInclusion(
  activeCampaigns: string[],
  claimingIds: string[],
): boolean {
  const lowerActiveCampaigns = activeCampaigns.map((cId) => cId.toLowerCase());
  for (const id of claimingIds) {
    if (lowerActiveCampaigns.includes(id.toLowerCase())) {
      return true;
    }
  }
  return false;
}

interface QuestCarouselProps {
  quests?: Quest[];
  loading: boolean;
  activeCampaigns: string[];
}

export const ActiveSuperfestMissionsCarousel = ({
  quests,
  loading,
  activeCampaigns,
}: QuestCarouselProps) => {
  const { url } = useOngoingFestMissions();
  const { t } = useTranslation();

  const isNotLive = !loading && (!quests || quests.length === 0);
  return (
    <>
      {!isNotLive ? (
        <SuperfestCarouselContainer>
          <CarouselContainer
            title={'Active Missions'}
            styles={{ paddingLeft: '32px' }}
          >
            {!loading ? (
              quests?.map((quest: Quest, index: number) => {
                const claimingIds =
                  quest.attributes?.CustomInformation?.['claimingIds'];
                let included = false;
                if (claimingIds && activeCampaigns) {
                  included = checkInclusion(activeCampaigns, claimingIds);
                }

                const baseURL = quest.attributes.Image?.data?.attributes?.url;
                const imgURL = new URL(baseURL, url.origin);

                if (included) {
                  return (
                    <QuestCard
                      key={`active-superfest-mission-${index}`}
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
                        quest?.attributes.quests_platform?.data?.attributes
                          ?.Name
                      }
                      platformImage={`${imgURL}`}
                      slug={quest?.attributes.Slug}
                      chains={quest.attributes.CustomInformation?.['chains']}
                    />
                  );
                }
              })
            ) : (
              <>
                {Array.from({ length: 3 }, () => 42).map((_, idx) => (
                  <QuestCardSkeleton key={'mission-card-skeleton-' + idx} />
                ))}
              </>
            )}
          </CarouselContainer>
        </SuperfestCarouselContainer>
      ) : null}
    </>
  );
};
