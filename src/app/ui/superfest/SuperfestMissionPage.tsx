'use client';
import { SuperfestMissionPage } from 'src/components/Superfest/SuperfestPage/SuperfestMisisonPage';

const SuperfestPage = ({ quest, url }: any) => {
  return <SuperfestMissionPage quest={quest} baseUrl={url} />;
};

export default SuperfestPage;
