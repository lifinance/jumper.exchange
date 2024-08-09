import { useAccounts } from '@/hooks/useAccounts';
import { SuperfestContainer, SuperfestMainBox } from './LandingPage.style';
import { RewardsCarousel } from '../Rewards/RewardsCarousel';
import { NFTClaimingBox } from '../NFTClaimingBox/NFTClaimingBox';
import { HeroBox } from '../HeroBox/HeroBox';
import { AvailableMissionsList } from '../AvailableMissionsList/AvailableMissionsList';
import { ActiveSuperfestMissionsCarousel } from '../ActiveSuperfestMissionsCarousel/ActiveSuperfestMissionsCarousel';
import { useOngoingFestMissions } from 'src/hooks/useOngoingFestMissions';
import { useMerklRewards } from 'src/hooks/useMerklRewardsOnSpecificToken';

export const DiscoverLanding = () => {
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
};
