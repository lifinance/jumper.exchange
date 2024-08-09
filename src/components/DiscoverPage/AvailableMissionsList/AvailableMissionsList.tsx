import type { Quest } from '@/types/loyaltyPass';
import { QuestCard } from '../QuestCard/QuestCard';
import { QuestCardSkeleton } from '../QuestCard/QuestCardSkeleton';
import {
  AvailableMissionsContainer,
  AvailableMissionsHeader,
  AvailableMissionsStack,
  AvailableMissionsTitle,
} from './AvailableMissionsList.style';
import { useOngoingFestMissions } from 'src/hooks/useOngoingFestMissions';
import {
  Box,
  type SelectChangeEvent,
  type Theme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { MissionsFilter } from '../MissionsFilter/MissionsFilter';
import { checkInclusion } from '../ActiveSuperfestMissionsCarousel/ActiveSuperfestMissionsCarousel';

const chains = ['Optimism', 'Base', 'Mode', 'Fraxtal'];

const category = [
  'AMM',
  'Money Market',
  'Liquid Staking',
  'Derivatives',
  'Yield',
];

interface AvailableMissionsListProps {
  quests?: Quest[];
  pastCampaigns?: string[];
  loading: boolean;
}

export const AvailableMissionsList = ({
  quests,
  pastCampaigns,
  loading,
}: AvailableMissionsListProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  const [chainsFilter, setChainsFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const { url } = useOngoingFestMissions();

  const handleChainChange = (event: SelectChangeEvent<typeof chainsFilter>) => {
    const {
      target: { value },
    } = event;
    setChainsFilter(typeof value === 'string' ? value.split(',') : value);
  };

  const handleCategoryChange = (
    event: SelectChangeEvent<typeof categoryFilter>,
  ) => {
    const {
      target: { value },
    } = event;
    setCategoryFilter(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <AvailableMissionsContainer>
      <AvailableMissionsHeader>
        <AvailableMissionsTitle>{'Available Missions'}</AvailableMissionsTitle>
        <Box display="flex">
          {isMobile ? (
            <MissionsFilter
              title="Category"
              options={category}
              activeChoices={categoryFilter}
              handleChange={handleCategoryChange}
            />
          ) : (
            <>
              <MissionsFilter
                title="Chains"
                options={chains}
                activeChoices={chainsFilter}
                handleChange={handleChainChange}
              />
              <Box marginLeft={'4px'}>
                <MissionsFilter
                  title="Category"
                  options={category}
                  activeChoices={categoryFilter}
                  handleChange={handleCategoryChange}
                />
              </Box>
            </>
          )}
        </Box>
      </AvailableMissionsHeader>
      <AvailableMissionsStack
        direction={'row'}
        spacing={{ xs: 2, sm: '48px' }}
        useFlexGap
        flexWrap="wrap"
      >
        {!loading && quests
          ? quests?.map((quest: Quest, index: number) => {
              const baseURL = quest.attributes.Image?.data?.attributes?.url;
              const imgURL = new URL(baseURL, url.origin);
              const rewards = quest.attributes.CustomInformation?.['rewards'];
              const rewardType =
                quest.attributes?.CustomInformation?.['rewardType'];
              const chains = quest.attributes.CustomInformation?.['chains'];
              const claimingIds =
                quest.attributes?.CustomInformation?.['claimingIds'];
              const rewardsIds =
                quest.attributes?.CustomInformation?.['rewardsIds'];

              //todo: exclude in a dedicated helper function
              if (chainsFilter && chainsFilter.length > 0) {
                let included = false;
                for (const chain of chains) {
                  if (
                    chainsFilter
                      .map((elemChain) => elemChain.toLowerCase())
                      .includes(chain.name.toLowerCase())
                  ) {
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
                (!quest.attributes.Category ||
                  (quest.attributes.Category &&
                    !categoryFilter.includes(quest.attributes.Category)))
              ) {
                return undefined;
              }

              let completed = false;
              if (rewardsIds && pastCampaigns) {
                completed = checkInclusion(pastCampaigns, rewardsIds);
              }

              return (
                <QuestCard
                  key={`available-mission-${index}`}
                  active={true}
                  title={quest?.attributes.Title}
                  image={String(imgURL)}
                  points={quest?.attributes.Points}
                  link={quest?.attributes.Link}
                  startDate={quest?.attributes.StartDate}
                  endDate={quest?.attributes.EndDate}
                  platformName={
                    quest?.attributes.quests_platform?.data?.attributes?.Name
                  }
                  slug={quest?.attributes.Slug}
                  chains={chains}
                  rewards={rewards}
                  completed={completed}
                  claimingIds={claimingIds}
                  variableWeeklyAPY={
                    quest?.attributes.Points > 0 && rewardType === 'weekly'
                  }
                />
              );
            })
          : null}
        {loading
          ? Array.from({ length: 12 }, () => 42).map((_, idx) => (
              <QuestCardSkeleton key={'skeleton-' + idx} />
            ))
          : null}
      </AvailableMissionsStack>
    </AvailableMissionsContainer>
  );
};
