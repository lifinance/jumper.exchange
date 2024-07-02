import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import Image from 'next/image';
import { Quest } from 'src/types/loyaltyPass';
import {
  BannerImageBox,
  DateChainBox,
  SupportedChainsBox,
  BannerBottomBox,
  BannerMainBox,
  QuestDatesBox,
  BannerTitleBox,
  RewardMainBox,
  BannerTitleTypography,
} from './Banner.style';
import {
  FlexCenterRowBox,
  FlexCenterSpaceRowBox,
} from '../SuperfestMissionPage.style';
import {
  CenteredBox,
  Sequel85Typography,
  SoraTypography,
} from '../../Superfest.style';
import { RewardBox } from './Rewards/RewardBox';

interface SuperfestMissionPageVar {
  quest: Quest;
  baseUrl: string;
}

export interface Chain {
  logo: string;
  name: string;
}

export const BannerBox = ({ quest, baseUrl }: SuperfestMissionPageVar) => {
  const attributes = quest?.attributes;
  const rewards = attributes?.CustomInformation?.['rewards'];
  const chains = attributes?.CustomInformation?.['chains'];
  const partner = attributes?.CustomInformation?.['partner'];

  return (
    <BannerMainBox>
      <BannerImageBox>
        <Image
          src={`${new URL(
            attributes.BannerImage?.data[0]?.attributes?.url,
            baseUrl,
          )}`}
          fill
          alt="Banner Image"
          style={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        />
      </BannerImageBox>
      <BannerBottomBox>
        {/* date + chains */}
        <DateChainBox>
          <QuestDatesBox>
            <CenteredBox>
              <DateRangeRoundedIcon sx={{ height: '16px' }} />
            </CenteredBox>
            <SoraTypography fontSize={'12px'} lineHeight={'16px'}>
              July-Aug
            </SoraTypography>
            {/* {getStringDateFormatted(startDate, endDate)} */}
          </QuestDatesBox>
          <FlexCenterRowBox>
            <SoraTypography
              fontSize={'16px'}
              fontWeight={700}
              lineHeight={'20px'}
            >
              Supported chains
            </SoraTypography>
            <SupportedChainsBox>
              {chains.map((elem: Chain, i: number) => {
                return (
                  <Image
                    key={`chain-logo-${i}`}
                    src={elem.logo}
                    style={{
                      marginLeft: i === 0 ? '' : '-8px',
                      zIndex: 100 - i,
                    }}
                    alt={elem.name}
                    width="32"
                    height="32"
                  />
                );
              })}
            </SupportedChainsBox>
          </FlexCenterRowBox>
        </DateChainBox>
        <BannerTitleBox>
          <BannerTitleTypography>{attributes.Title}</BannerTitleTypography>
        </BannerTitleBox>
        <RewardMainBox>
          {/* rewards  */}
          {rewards && rewards.amount ? (
            <RewardBox
              logo={rewards.logo}
              title={'Rewards'}
              value={`${rewards.amount} ${rewards.name}`}
            />
          ) : undefined}
          {/* Points  */}
          {attributes && attributes.Points ? (
            <RewardBox
              logo={'https://strapi.li.finance/uploads/xp_cfcff186e5.png'}
              title={'Points'}
              value={String(attributes.Points)}
            />
          ) : undefined}
          {/* partner  */}
          {partner && partner.logo ? (
            <RewardBox
              logo={partner.logo}
              title={'Sponsored by'}
              value={partner.name}
            />
          ) : undefined}
        </RewardMainBox>
      </BannerBottomBox>
    </BannerMainBox>
  );
};
