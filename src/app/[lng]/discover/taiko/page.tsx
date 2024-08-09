import Superfest from 'src/app/ui/superfest/Superfest';
import { type Metadata } from 'next';
import Landing from 'src/app/ui/discover/landing';
import {
  SuperfestContainer,
  SuperfestMainBox,
} from 'src/components/DiscoverPage/LandingPage/LandingPage.style';
import { RewardsCarousel } from 'src/components/DiscoverPage/Rewards/RewardsCarousel';
import { HeroBox } from 'src/components/DiscoverPage/HeroBox/HeroBox';
import { ActiveSuperfestMissionsCarousel } from 'src/components/DiscoverPage/ActiveSuperfestMissionsCarousel/ActiveSuperfestMissionsCarousel';
import { AvailableMissionsList } from 'src/components/DiscoverPage/AvailableMissionsList/AvailableMissionsList';
import { useAccounts } from 'src/hooks/useAccounts';
import { useOngoingFestMissions } from 'src/hooks/useOngoingFestMissions';
import { useMerklRewards } from 'src/hooks/useMerklRewardsOnSpecificToken';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jumper | Superfest',
    description: 'Dive into the Superchain DeFi Festival!',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/superfest/`,
    },
  };
}

export default async function Page() {
  //HOOKS
  const { account } = useAccounts();
  const { quests, isQuestLoading } = useOngoingFestMissions();
  const {
    availableRewards,
    activeCampaigns,
    pastCampaigns,
    isLoading: isRewardLoading,
    isSuccess: isRewardSuccess,
  } = useMerklRewards({
    rewardChainId: 10,
    userAddress: account?.address,
  });

  return (
    <SuperfestContainer className="superfest">
      <RewardsCarousel
        hideComponent={!account?.address || isRewardLoading || !isRewardSuccess}
        rewardAmount={availableRewards?.[0]?.amountToClaim as number}
        accumulatedAmountForContractBN={
          availableRewards?.[0]?.accumulatedAmountForContractBN
        }
        proof={availableRewards?.[0]?.proof}
        isMerklSuccess={isRewardSuccess}
      />
      <HeroBox />
      <SuperfestMainBox>
        {!account?.address ||
        isQuestLoading ||
        !activeCampaigns ||
        activeCampaigns.length === 0 ? undefined : (
          <ActiveSuperfestMissionsCarousel
            quests={quests}
            loading={isQuestLoading}
            activeCampaigns={activeCampaigns}
            pastCampaigns={pastCampaigns}
          />
        )}
        <AvailableMissionsList
          quests={quests}
          loading={isQuestLoading}
          pastCampaigns={pastCampaigns}
        />
      </SuperfestMainBox>
    </SuperfestContainer>
  );
}
