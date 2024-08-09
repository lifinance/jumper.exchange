import type { Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { SuperfestDailyRewards } from 'src/components/illustrations/SuperfestDailyRewards';
import { SuperfestWeeklyRewards } from 'src/components/illustrations/SuperfestWeeklyRewards';
import { type Quest } from 'src/types/loyaltyPass';
import { checkInclusion } from '../../ActiveSuperfestMissionsCarousel/ActiveSuperfestMissionsCarousel';
import {
  BadgeMainBox,
  BadgeRelativeBox,
  BannerBottomBox,
  BannerImageBox,
  BannerMainBox,
  BannerTitleBox,
  BannerTitleTypography,
  RewardMainBox,
  RotatingBox,
} from './Banner.style';
import { RewardBox } from './Rewards/RewardBox';

interface SuperfestMissionPageVar {
  quest: Quest;
  baseUrl: string;
  pastCampaigns: string[];
}

export interface Chain {
  logo: string;
  name: string;
}

export const BannerBox = ({
  quest,
  baseUrl,
  pastCampaigns,
}: SuperfestMissionPageVar) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  const attributes = quest?.attributes;
  const rewardsIds = quest.attributes?.CustomInformation?.['rewardsIds'];
  const rewards = attributes?.CustomInformation?.['rewards'];
  const chains = attributes?.CustomInformation?.['chains'];
  const partners = attributes?.CustomInformation?.['partner'];
  const rewardType = attributes?.CustomInformation?.['rewardType'];
  const bannerImageURL = isMobile
    ? attributes.Image?.data?.attributes?.url
    : attributes?.BannerImage?.data[0]?.attributes?.url;
  const imgURL = new URL(bannerImageURL, baseUrl);

  let completed = false;
  if (rewardsIds && pastCampaigns) {
    completed = checkInclusion(pastCampaigns, rewardsIds);
  }

  return (
    <>
      {rewards && rewards.amount && (
        <BadgeMainBox>
          <BadgeRelativeBox>
            <RotatingBox>
              {rewardType === 'weekly' ? (
                <SuperfestWeeklyRewards />
              ) : (
                <SuperfestDailyRewards />
              )}
            </RotatingBox>
          </BadgeRelativeBox>
        </BadgeMainBox>
      )}
      <BannerMainBox>
        <BannerImageBox>
          <Image
            src={`${imgURL}`}
            fill
            objectFit="cover"
            alt="Banner Image"
            style={{
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          />
        </BannerImageBox>
        <BannerBottomBox>
          <BannerTitleBox>
            <BannerTitleTypography>{attributes?.Title}</BannerTitleTypography>
          </BannerTitleBox>
          <RewardMainBox>
            {/* chains  */}
            {chains && chains.length > 0 ? (
              <RewardBox
                logos={chains.map((chain: Chain) => chain.logo)}
                title={'Supported Chains'}
                value={chains.length > 0 ? chains[0].name : ''}
              />
            ) : undefined}
            {/* partner  */}
            {partners && partners.length > 0 ? (
              <RewardBox
                logos={partners.map((partner: Chain) => partner.logo)}
                title={'Applications'}
                value={partners.length > 0 ? partners[0].name : ''}
              />
            ) : undefined}
            {/* rewards  */}
            {rewards && rewards.amount ? (
              <RewardBox
                logos={[rewards.logo]}
                title={'Total Rewards'}
                value={`${rewards.amount} ${rewards.name}`}
              />
            ) : undefined}
            {/* Points  */}
            {attributes && attributes?.Points ? (
              <RewardBox
                logos={
                  completed
                    ? [
                        'https://strapi.li.finance/uploads/avatar_checkmark_circle_03172fb9d6.svg',
                      ]
                    : ['https://strapi.li.finance/uploads/xp_cfcff186e5.png']
                }
                title={'Jumper XP'}
                value={
                  true
                    ? `${String(attributes?.Points)}`
                    : String(attributes?.Points)
                }
              />
            ) : undefined}
          </RewardMainBox>
        </BannerBottomBox>
      </BannerMainBox>
    </>
  );
};
