import { XpIconContainer } from '@/components/ProfilePage/LevelBox/PointsBox.style';
import { Skeleton, useTheme } from '@mui/material';
import { XPIcon } from '../../illustrations/XPIcon';
import { CenteredBox, NoSelectTypography } from '../ProfilePage.style';

interface PointsBoxProps {
  points?: number;
}

export const PointsBox = ({ points }: PointsBoxProps) => {
  const theme = useTheme();

  return (
    <CenteredBox>
      <NoSelectTypography
        color={
          theme.palette.mode === 'light'
            ? theme.palette.accent1.main
            : theme.palette.white.main
        }
        fontWeight={700}
        sx={{
          fontSize: { xs: 48, sm: 80 },
        }}
      >
        {points === undefined ? (
          <Skeleton
            variant="text"
            sx={{ fontSize: { xs: 48, sm: 80 }, minWidth: 40 }}
          />
        ) : (
          points
        )}
      </NoSelectTypography>
      <XpIconContainer>
        <XPIcon />
      </XpIconContainer>
    </CenteredBox>
  );
};
