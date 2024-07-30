import {
  LeftTextBox,
  SuperfestPageElementContainer,
} from '../SuperfestMissionPage.style';
import { SoraTypography } from '../../Superfest.style';
import { DescriptionTitleTypography } from './DescriptionBox.style';

interface IDescriptionBox {
  longTitle?: string;
  description?: string;
}

export const DescriptionBox = ({ longTitle, description }: IDescriptionBox) => {
  return (
    <SuperfestPageElementContainer>
      <DescriptionTitleTypography>{longTitle}</DescriptionTitleTypography>
      <LeftTextBox marginTop={'32px'}>
        <SoraTypography fontSize={'18px'} fontWeight={500} lineHeight={'32px'}>
          {description}
        </SoraTypography>
      </LeftTextBox>
    </SuperfestPageElementContainer>
  );
};
