import { useTheme } from '@mui/material';
import { SuperfestContainer } from '../Superfest.style';
import { SuperfestPageMainBox } from './SuperfestMissionPage.style';
import generateKey from 'src/app/lib/generateKey';
import { MissionCTA } from './CTA/MissionCTA';
import { Quest } from 'src/types/loyaltyPass';
import { BackButton } from './BackButton/BackButton';
import { BannerBox } from './Banner/Banner';
import { DescriptionBox } from './DescriptionBox/DescriptionBox';
import { StepsBox } from './StepsBox/StepsBox';
import { InformationAlertBox } from './InformationBox/InformationAlertBox';

interface SuperfestMissionPageVar {
  quest: Quest;
  baseUrl: string;
}

export const SuperfestMissionPage = ({
  quest,
  baseUrl,
}: SuperfestMissionPageVar) => {
  const theme = useTheme();

  const attributes = quest?.attributes;

  return (
    <SuperfestContainer className="superfest">
      <SuperfestPageMainBox>
        {/* button to go back */}
        <BackButton />
        {/* big component with the main information */}
        <BannerBox quest={quest} baseUrl={baseUrl} />
        {/* Subtitle and description */}
        <DescriptionBox
          longTitle={attributes.Subtitle}
          description={attributes.Description}
        />
        {/* Steps */}
        <StepsBox steps={attributes.Steps} baseUrl={baseUrl} />
        {/* Additional Info */}
        <InformationAlertBox information={attributes.Information} />
        {/* Big CTA */}
        <MissionCTA
          title={attributes.Title}
          url={attributes.Link}
          key={generateKey('cta')}
        />
      </SuperfestPageMainBox>
    </SuperfestContainer>
  );
};
