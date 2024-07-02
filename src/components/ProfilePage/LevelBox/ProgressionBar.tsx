import type { LevelData } from '@/types/loyaltyPass';
import { Box } from '@mui/material';
import { XPIcon } from '../../illustrations/XPIcon';
import { CenteredBox, NoSelectTypography } from '../ProfilePage.style';
import {
  ProgressionChart,
  ProgressionChartBg,
  ProgressionChartScore,
} from './ProgressionBar.style';

interface ProgressionBarProps {
  points?: number;
  levelData?: LevelData;
}

export const ProgressionBar = ({ points, levelData }: ProgressionBarProps) => {
  const calcWidth =
    points && levelData
      ? points - levelData.minPoints > 0
        ? ((points - levelData.minPoints) /
            (levelData.maxPoints - levelData.minPoints)) *
          100
        : 0
      : 0;

  return (
    <Box>
      {levelData ? (
        <>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'space-between',
            }}
          >
            <NoSelectTypography
              fontSize="14px"
              lineHeight="18px"
              fontWeight={700}
            >
              {`LEVEL ${levelData?.level}`}
            </NoSelectTypography>
            <NoSelectTypography
              fontSize="14px"
              lineHeight="18px"
              fontWeight={700}
            >
              {`LEVEL ${levelData.level + 1}`}
            </NoSelectTypography>
          </Box>
          <ProgressionChart>
            <ProgressionChartScore
              points={points}
              calcWidth={calcWidth}
              levelData={levelData}
            />
            <ProgressionChartBg />
          </ProgressionChart>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CenteredBox>
              <NoSelectTypography
                fontSize="16px"
                lineHeight="20px"
                fontWeight={600}
              >
                {levelData.minPoints}
              </NoSelectTypography>
              <CenteredBox sx={{ marginLeft: '8px' }}>
                <XPIcon size={24} />
              </CenteredBox>
            </CenteredBox>
            <CenteredBox>
              <NoSelectTypography
                fontSize={'16px'}
                lineHeight={'20px'}
                fontWeight={600}
              >
                {levelData.maxPoints}
              </NoSelectTypography>
              <CenteredBox sx={{ marginLeft: '8px' }}>
                <XPIcon size={24} />
              </CenteredBox>
            </CenteredBox>
          </Box>
        </>
      ) : null}
    </Box>
  );
};
