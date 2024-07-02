import { Skeleton } from '@mui/material';
import { QuestCardSkeletonContainer } from './QuestCardSkeleton.style';

export const QuestCardSkeleton = () => {
  return (
    <QuestCardSkeletonContainer>
      <Skeleton
        variant="rectangular"
        sx={{
          height: '416px',
          width: '256px',
          textAlign: 'center',
          borderRadius: '8px',
          transform: 'unset',
          aspectRatio: 550 / 300,
        }}
      />
    </QuestCardSkeletonContainer>
  );
};
