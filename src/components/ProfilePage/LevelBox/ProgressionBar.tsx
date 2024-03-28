import type { LevelData } from '@/types/loyaltyPass';
import { Box, useTheme } from '@mui/material';
import { XPIcon } from '../../illustrations/XPIcon';
import { CenteredBox, ProfilePageTypography } from '../ProfilePage.style';

interface ProgressionBarProps {
  points?: number | null;
  levelData?: LevelData;
}

export const ProgressionBar = ({ points, levelData }: ProgressionBarProps) => {
  const theme = useTheme();
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProfilePageTypography fontSize={'14px'} lineHeight={'18px'}>
              {`LEVEL ${levelData?.level}`}
            </ProfilePageTypography>
            <ProfilePageTypography fontSize={'14px'} lineHeight={'18px'}>
              {`LEVEL ${levelData.level + 1}`}
            </ProfilePageTypography>
          </Box>
          <Box
            sx={{
              height: '16px',
              width: '100%',
              display: 'flex',
              marginTop: '12px',
              marginBottom: '12px',
            }}
          >
            <Box
              sx={{
                height: '100%',
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px',
                width:
                  points && points > levelData.minPoints
                    ? `${calcWidth}%`
                    : '0%',
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? theme.palette.pink.light
                    : theme.palette.pink.dark,
                borderRadius: points === levelData.maxPoints ? '12px' : null,
              }}
            />
            <Box
              sx={{
                height: '100%',
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
                width:
                  points && points > levelData.minPoints
                    ? `${100 - calcWidth}%`
                    : '100%',
                backgroundColor: theme.palette.grey[100],
                borderRadius: points ? null : '12px',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CenteredBox>
              <ProfilePageTypography
                fontSize={'16px'}
                lineHeight={'20px'}
                fontWeight={600}
              >
                {levelData.minPoints}
              </ProfilePageTypography>
              <CenteredBox sx={{ marginLeft: '8px' }}>
                <XPIcon size={24} />
              </CenteredBox>
            </CenteredBox>
            <CenteredBox>
              <ProfilePageTypography
                fontSize={'16px'}
                lineHeight={'20px'}
                fontWeight={600}
              >
                {levelData.maxPoints}
              </ProfilePageTypography>
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
