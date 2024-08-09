import {
  LeftTextBox,
  SuperfestPageElementContainer,
} from '../MissionPage.style';
import { SoraTypography } from '../../LandingPage/LandingPage.style';
import { DescriptionTitleTypography } from './DescriptionBox.style';

interface DescriptionBox {
  longTitle?: string;
  description?: string;
}

export const DescriptionBox = ({ longTitle, description }: DescriptionBox) => {
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
