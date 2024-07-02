import { useAccounts } from '@/hooks/useAccounts';
import { useLoyaltyPass } from '@/hooks/useLoyaltyPass';
import { Box, Stack } from '@mui/material';
import { SuperfestContainer, SuperfestMainBox } from './Superfest.style';
import { RewardsCarousel } from './Rewards/RewardsCarousel';
import { NFTClaimingBox } from './NFTClaimingBox/NFTClaimingBox';
import { HeroBox } from './HeroBox/HeroBox';
import { AvailableMissionsList } from './AvailableMissionsList/AvailableMissionsList';
import { ActiveSuperfestMissionsCarousel } from './ActiveSuperfestMissionsCarousel/ActiveSuperfestMissionsCarousel';
import { useOngoingFestMissions } from 'src/hooks/useOngoingFestMissions';
import { useMerklRewards } from 'src/hooks/useMerklRewardsOnSpecificToken';
import { useCheckFestNFTAvailability } from 'src/hooks/useCheckFestNFTAvailability';

export const Superfest = () => {
  //HOOKS
  const { account } = useAccounts();
  const { quests, isQuestLoading } = useOngoingFestMissions();
  const {
    availableRewards,
    activeCampaigns,
    isLoading: isRewardLoading,
    isSuccess: isRewardSuccess,
  } = useMerklRewards({
    rewardChainId: 10,
    userAddress: account?.address,
  });
  // HookToCheckNFT eligibility
  const { claimInfo, isLoading, isSuccess } = useCheckFestNFTAvailability({
    userAddress: account?.address,
  });

  return (
    <SuperfestContainer className="superfest">
      <RewardsCarousel
        showComponent={!account?.address || isRewardLoading || !isRewardSuccess}
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
        activeCampaigns.length === 0 ? undefined : (
          <ActiveSuperfestMissionsCarousel
            quests={quests}
            loading={isQuestLoading}
            activeCampaigns={activeCampaigns}
          />
        )}
        <AvailableMissionsList quests={quests} loading={isQuestLoading} />
        <NFTClaimingBox
          claimInfos={claimInfo}
          infoLoading={isLoading}
          infoSuccess={isSuccess}
        />
      </SuperfestMainBox>
    </SuperfestContainer>
  );
};
