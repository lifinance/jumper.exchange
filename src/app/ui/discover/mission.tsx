'use client';
import { MissionPage } from 'src/components/DiscoverPage/MissionPage/MisisonPage';

const DiscoverMissionPage = ({ quest, url }: any) => {
  return <MissionPage quest={quest} baseUrl={url} />;
};

export default DiscoverMissionPage;
