import { useAccounts } from '@/hooks/useAccounts';
import type { Quest } from '@/types/loyaltyPass';
import { useTranslation } from 'react-i18next';
import { QuestCard } from '../QuestCard/QuestCard';
import { QuestCardSkeleton } from '../QuestCard/QuestCardSkeleton';
import {
  AvailableMissionsContainer,
  AvailableMissionsHeader,
  AvailableMissionsStack,
  AvailableMissionsTitle,
} from './AvailableMissionsList.style';
import { useOngoingFestMissions } from 'src/hooks/useOngoingFestMissions';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

interface QuestCompletedListProps {
  quests?: Quest[];
  loading: boolean;
}

export const AvailableMissionsList = ({
  quests,
  loading,
}: QuestCompletedListProps) => {
  const [chainsFilter, setChainsFilter] = useState<string[]>([]);
  const [rewardsFilter, setRewardsFilter] = useState<boolean | undefined>(
    undefined,
  );
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [filteredQuests, setFilteredQuests] = useState<Quest[]>([]);
  const [filterLoading, setFiltedLoading] = useState<boolean>(false);
  const { url } = useOngoingFestMissions();

  useEffect(() => {
    // setFiltedLoading(true);
    // let _filterQuests = quests.maps()
    // setFiltedLoading(false);
  }, [chainsFilter, rewardsFilter, categoryFilter]);

  return (
    <AvailableMissionsContainer>
      <AvailableMissionsHeader>
        <AvailableMissionsTitle>{'Available Missions'}</AvailableMissionsTitle>
        <Box>Filters</Box>
      </AvailableMissionsHeader>
      <AvailableMissionsStack
        direction={'row'}
        spacing={{ xs: 2, sm: 4 }}
        useFlexGap
        flexWrap="wrap"
      >
        {!loading && !filterLoading && quests
          ? quests?.map((quest: Quest, index: number) => {
              const baseURL = quest.attributes.Image?.data?.attributes?.url;
              const imgURL = new URL(baseURL, url.origin);
              const rewards = quest.attributes.CustomInformation?.['rewards'];
              const chains = quest.attributes.CustomInformation?.['chains'];
              const rewardsAmount = rewards?.amount;

              //todo: exclude in a dedicated helper function
              if (rewardsFilter && (!rewardsAmount || rewardsAmount === 0)) {
                return undefined;
              }
              if (
                rewardsFilter === false &&
                rewardsAmount &&
                rewardsAmount > 0
              ) {
                return undefined;
              }
              if (chainsFilter && chainsFilter.length > 0) {
                let included = false;
                for (const chain of chains) {
                  if (chainsFilter.includes(chain.name)) {
                    included = true;
                    break;
                  }
                }
                if (!included) {
                  return undefined;
                }
              }
              if (
                categoryFilter &&
                categoryFilter.length > 0 &&
                quest.attributes.Category &&
                !categoryFilter.includes(quest.attributes.Category)
              ) {
                return undefined;
              }

              return (
                <QuestCard
                  key={`available-mission-${index}`}
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
                  platformImage={`${imgURL}`}
                  slug={quest?.attributes.Slug}
                  chains={chains}
                  rewards={rewards}
                />
              );
            })
          : null}
        {loading || filterLoading
          ? Array.from({ length: 12 }, () => 42).map((_, idx) => (
              <QuestCardSkeleton key={'skeleton-' + idx} />
            ))
          : null}
      </AvailableMissionsStack>
    </AvailableMissionsContainer>
  );
};
