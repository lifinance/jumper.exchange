import {
  LeftTextBox,
  SuperfestPageElementContainer,
} from '../SuperfestMissionPage.style';
import { CustomRichBlocks } from 'src/components/Blog';
import { RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';
import { Sequel65Typography } from '../../Superfest.style';

interface StepsBoxProps {
  steps?: RootNode[];
  baseUrl: string;
}

export const StepsBox = ({ steps, baseUrl }: StepsBoxProps) => {
  return (
    <SuperfestPageElementContainer>
      <LeftTextBox>
        <Sequel65Typography fontSize={'48px'} fontWeight={700}>
          Steps to complete the mission
        </Sequel65Typography>
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
