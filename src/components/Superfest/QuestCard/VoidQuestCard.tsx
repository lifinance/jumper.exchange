import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { alpha, useTheme } from '@mui/material';
import { VoidQuestCardContainer } from './VoidQuestCard.style';

interface VoidQuestCardProps {
  connected: boolean;
}

export const VoidQuestCard = ({ connected }: VoidQuestCardProps) => {
  const theme = useTheme();
  return (
    <VoidQuestCardContainer>
      <QuestionMarkIcon
        sx={{
          height: '96px',
          width: '96px',
          color:
            theme.palette.mode === 'light'
              ? theme.palette.grey[400]
              : alpha(theme.palette.grey[400], 0.08),
        }}
      />
    </VoidQuestCardContainer>
  );
};
