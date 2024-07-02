import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '../../Button';
import { SuperfestXPIcon } from '../../illustrations/XPIcon';
import {
  CenteredBox,
  FlexSpaceBetweenBox,
  SoraTypography,
} from '../Superfest.style';
import type { Chain } from '../SuperfestPage/Banner/Banner';
import { FlexCenterRowBox } from '../SuperfestPage/SuperfestMissionPage.style';
import {
  QuestCardBottomBox,
  QuestCardInfoBox,
  QuestCardMainBox,
  QuestCardTitleBox,
  XPDisplayBox,
} from './QuestCard.style';
import { OPBadge } from 'src/components/illustrations/OPBadge';
import { Box } from '@mui/material';

export interface RewardsInterface {
  logo: string;
  name: string;
  amount: number;
}

interface QuestCardProps {
  active?: boolean;
  title?: string;
  image?: string;
  points?: number;
  link?: string;
  startDate?: string;
  endDate?: string;
  platformName?: string;
  platformImage?: string;
  slug?: string;
  chains?: Chain[];
  rewards?: RewardsInterface;
}

export const QuestCard = ({
  active,
  title,
  image,
  points,
  link,
  startDate,
  endDate,
  slug,
  chains,
  rewards,
}: QuestCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <QuestCardMainBox>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {image && (
          <Image
            src={image}
            alt="Quest Card Image"
            width={256}
            height={256}
            style={{
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          />
        )}
        <Box
          sx={{
            position: 'relative',
            marginLeft: '-32px',
          }}
        >
          {rewards?.amount && <OPBadge />}
        </Box>
      </Box>
      <QuestCardBottomBox>
        <QuestCardTitleBox>
          <SoraTypography fontSize="18px" lineHeight="24px" fontWeight={700}>
            {title}
          </SoraTypography>
        </QuestCardTitleBox>

        <FlexSpaceBetweenBox marginBottom={'8px'} marginTop={'8px'}>
          <FlexCenterRowBox>
            {chains?.map((elem: Chain, i: number) => {
              return (
                <Image
                  key={elem.name + '-' + i}
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
          </FlexCenterRowBox>
          {points ? (
            <FlexCenterRowBox>
              <XPDisplayBox active={active}>
                <SoraTypography
                  fontSize="14px"
                  fontWeight={700}
                  lineHeight="18px"
                  color={'#ffffff'}
                >
                  {`+${points}`}
                </SoraTypography>
                <CenteredBox sx={{ marginLeft: '4px' }}>
                  <SuperfestXPIcon size={16} />
                </CenteredBox>
              </XPDisplayBox>
            </FlexCenterRowBox>
          ) : undefined}
        </FlexSpaceBetweenBox>
        <QuestCardInfoBox points={points}>
          {active && slug ? (
            <Button
              disabled={false}
              variant="secondary"
              size="medium"
              styles={{
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'transparent',
                border: '2px dotted',
                padding: '16px',
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: '#ff0420',
                },
              }}
              onClick={() => router.push(slug)}
            >
              <SoraTypography
                fontSize="16px"
                lineHeight="18px"
                fontWeight={600}
              >
                {String(t('questCard.join')).toUpperCase()}
              </SoraTypography>
            </Button>
          ) : null}
        </QuestCardInfoBox>
      </QuestCardBottomBox>
    </QuestCardMainBox>
  );
};
