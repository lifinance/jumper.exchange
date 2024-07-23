import { SuperfestContainer } from '../Superfest.style';
import { SuperfestPageMainBox } from './SuperfestMissionPage.style';
import generateKey from 'src/app/lib/generateKey';
import { CTALinkInt, MissionCTA } from './CTA/MissionCTA';
import { type Quest } from 'src/types/loyaltyPass';
import { BackButton } from './BackButton/BackButton';
import { BannerBox } from './Banner/Banner';
import { DescriptionBox } from './DescriptionBox/DescriptionBox';
import { StepsBox } from './StepsBox/StepsBox';
import { InformationAlertBox } from './InformationBox/InformationAlertBox';
import { useMerklRewards } from '@/hooks/useMerklRewardsOnSpecificToken';
import { useAccounts } from '@/hooks/useAccounts';
import { useMissionsAPY } from '@/hooks/useMissionsAPY';

interface SuperfestMissionPageVar {
  quest: Quest;
  baseUrl: string;
}

export const SuperfestMissionPage = ({
  quest,
  baseUrl,
}: SuperfestMissionPageVar) => {
  const attributes = quest?.attributes;
  const CTAs = quest?.attributes?.CustomInformation?.['CTA'] as CTALinkInt[];

  const { account } = useAccounts();
  const { pastCampaigns } = useMerklRewards({
    rewardChainId: 10,
    userAddress: account?.address,
  });
  const res = useMissionsAPY(CTAs);

  return (
    <SuperfestContainer className="superfest">
      <SuperfestPageMainBox>
        {/* button to go back */}
        <BackButton />
        {/* big component with the main information */}
        <BannerBox
          quest={quest}
          baseUrl={baseUrl}
          pastCampaigns={pastCampaigns}
        />
        {/* Big CTA */}
        <MissionCTA
          title={attributes?.Title}
          url={attributes?.Link}
          key={generateKey('cta')}
          CTAs={CTAs}
        />
        {/* Subtitle and description */}
        <DescriptionBox
          longTitle={attributes?.Subtitle}
          description={attributes?.Description}
        />
        {/* Steps */}
        {/* Todo: remove the check for steps */}
        {attributes?.Steps && attributes?.Steps?.length > 1 ? (
          <StepsBox steps={attributes?.Steps} baseUrl={baseUrl} />
        ) : undefined}
        {/* Additional Info */}
        <InformationAlertBox information={attributes?.Information} />
      </SuperfestPageMainBox>
    </SuperfestContainer>
  );
};
