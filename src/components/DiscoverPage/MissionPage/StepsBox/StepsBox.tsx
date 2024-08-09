import {
  LeftTextBox,
  SuperfestPageElementContainer,
} from '../MissionPage.style';
import { CustomRichBlocks } from 'src/components/Blog';
import { type RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';
import { DescriptionTitleTypography } from '../DescriptionBox/DescriptionBox.style';

interface StepsBoxProps {
  steps?: RootNode[];
  baseUrl: string;
}

export const StepsBox = ({ steps, baseUrl }: StepsBoxProps) => {
  return (
    <SuperfestPageElementContainer>
      <LeftTextBox>
        <DescriptionTitleTypography>
          Steps to complete the mission
        </DescriptionTitleTypography>
      </LeftTextBox>
      <>
        <CustomRichBlocks
          id={1}
          baseUrl={baseUrl}
          content={steps}
          variant={'superfest'}
        />
      </>
    </SuperfestPageElementContainer>
  );
};
