import { Skeleton } from '@mui/material';
import { LeaderboardSkeletonContainer } from './LeaderboardSkeleton.style';

export const LeaderboardSkeleton = () => {
  return (
    <LeaderboardSkeletonContainer>
      <Skeleton
        variant="rectangular"
        sx={{
          height: '450px',
          width: '288px',
          textAlign: 'center',
          borderRadius: '8px',
          transform: 'unset',
          aspectRatio: 550 / 300,
        }}
      />
    </LeaderboardSkeletonContainer>
  );
};
