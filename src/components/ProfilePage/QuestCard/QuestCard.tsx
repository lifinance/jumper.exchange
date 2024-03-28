import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import DoneIcon from '@mui/icons-material/Done';
import { useTheme } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Button } from '../../Button';
import { XPIcon } from '../../illustrations/XPIcon';
import { CenteredBox, ProfilePageTypography } from '../ProfilePage.style';
import {
  CompletedBox,
  QuestCardBottomBox,
  QuestCardInfoBox,
  QuestCardMainBox,
  QuestCardTitleBox,
  QuestDatesBox,
  QuestPlatformMainBox,
  XPDisplayBox,
} from './QuestCard.style';

interface QuestCardProps {
  active?: boolean;
  title?: string;
  image?: string;
  points?: number;
  link?: string;
  startDate?: string | null;
  endDate?: string | null;
  platformName?: string;
  platformImage?: string;
}

function getStringDateFormatted(startDate: string, endDate: string): string {
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);
  const startMonth = sDate.toLocaleString('default', { month: 'short' });
  const endMonth = eDate.toLocaleString('default', { month: 'short' });
  return `${startMonth} ${sDate.getDate()} - ${startMonth === endMonth ? '' : endMonth} ${eDate.getDate()}`;
}

export const QuestCard = ({
  active,
  title,
  image,
  points,
  link,
  startDate,
  endDate,
  platformName,
  platformImage,
}: QuestCardProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <QuestCardMainBox>
      {image && (
        <Image
          src={image}
          alt="Quest Card Image"
          width={240}
          height={240}
          style={{
            borderRadius: '24px',
            marginTop: 16,
          }}
        />
      )}
      <QuestCardBottomBox>
        {active ? (
          <QuestPlatformMainBox
            sx={{
              display: 'flex',
              justifyContent: platformName ? undefined : 'flex-end',
            }}
          >
            {platformName ? (
              <CenteredBox>
                <CenteredBox
                  sx={{
                    marginRight: '4px',
                  }}
                >
                  {platformImage && (
                    <Image
                      src={platformImage}
                      alt="Platform Image"
                      width={24}
                      height={24}
                      style={{
                        borderRadius: '100%',
                      }}
                    />
                  )}
                </CenteredBox>
                <ProfilePageTypography fontSize={'12px'} lineHeight={'16px'}>
                  {platformName}
                </ProfilePageTypography>
              </CenteredBox>
            ) : null}
            {startDate && endDate ? (
              <QuestDatesBox>
                <CenteredBox>
                  <DateRangeRoundedIcon sx={{ height: '16px' }} />
                </CenteredBox>
                <ProfilePageTypography fontSize={'12px'} lineHeight={'16px'}>
                  {getStringDateFormatted(startDate, endDate)}
                </ProfilePageTypography>
              </QuestDatesBox>
            ) : null}
          </QuestPlatformMainBox>
        ) : (
          <CompletedBox>
            <DoneIcon sx={{ height: '16px', color: '#00B849' }} />
            <ProfilePageTypography
              fontSize={'12px'}
              lineHeight={'16px'}
              sx={{ color: '#00B849' }}
            >
              {t('questCard.completed')}
            </ProfilePageTypography>
          </CompletedBox>
        )}
        <QuestCardTitleBox>
          <ProfilePageTypography fontSize={'18px'} lineHeight={'24px'}>
            {title}
          </ProfilePageTypography>
        </QuestCardTitleBox>
        <QuestCardInfoBox
          sx={{
            display: 'flex',
            justifyContent: points ? undefined : 'flex-end',
          }}
        >
          {points ? (
            <XPDisplayBox
              sx={{
                width: active ? '50%' : '100%',
                marginRight: active ? '8px' : undefined,
              }}
            >
              <ProfilePageTypography
                fontSize={'14px'}
                lineHeight={'18px'}
                sx={{
                  color: theme.palette.mode === 'light' ? '#31007A' : '#BEA0EB',
                }}
              >
                {`+${points}`}
              </ProfilePageTypography>
              <CenteredBox sx={{ marginLeft: '8px' }}>
                <XPIcon size={24} />
              </CenteredBox>
            </XPDisplayBox>
          ) : null}
          {active && link ? (
            <a
              href={link}
              target="_blank"
              style={{ textDecoration: 'none', width: '50%' }}
              rel="noreferrer"
            >
              <Button
                variant="secondary"
                size="medium"
                styles={{ alignItems: 'center', width: '100%' }}
              >
                <ProfilePageTypography
                  fontSize={'16px'}
                  lineHeight={'18px'}
                  fontWeight={600}
                  sx={{
                    padding: '8px',
                  }}
                >
                  {t('questCard.join')}
                </ProfilePageTypography>
              </Button>
            </a>
          ) : null}
        </QuestCardInfoBox>
      </QuestCardBottomBox>
    </QuestCardMainBox>
  );
};
