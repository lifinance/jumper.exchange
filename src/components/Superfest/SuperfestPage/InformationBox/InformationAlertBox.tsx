import { LeftTextBox } from '../SuperfestMissionPage.style';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { InformationBox } from './InformationAlertBox.style';
import { SoraTypography } from '../../Superfest.style';

interface InformationAlertBoxProps {
  information?: string;
}

export const InformationAlertBox = ({
  information,
}: InformationAlertBoxProps) => {
  return (
    <InformationBox>
      <InfoOutlinedIcon sx={{ width: 32, height: 32 }} />
      <LeftTextBox ml="32px">
        <SoraTypography>{information}</SoraTypography>
      </LeftTextBox>
    </InformationBox>
  );
};
