import { Button } from 'src/components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { JUMPER_FEST } from 'src/const/urls';
import { BackButtonMainBox, ButtonTypography } from './BackButton.style';

export const BackButton = () => {
  const router = useRouter();

  return (
    <BackButtonMainBox>
      <Button
        size={'small'}
        onClick={() => {
          router.push(JUMPER_FEST);
        }}
      >
        <ArrowBackIcon
          sx={{ color: '#FFFFFF', width: '16px', height: '16px' }}
        />
        <ButtonTypography>{'Back to Superfest'}</ButtonTypography>
      </Button>
    </BackButtonMainBox>
  );
};
