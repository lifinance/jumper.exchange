import { Typography, useTheme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TrackingAction, TrackingCategory } from '../../const';
import { TrackingEventParameter } from '../../const/trackingKeys';
import { useFetchDexsAndBridges, useUserTracking } from '../../hooks';
import { useChains } from '../../hooks/useChains';
import { useCountUpAnimation } from '../../hooks/useCountUpAnimation';
import { EventTrackingTool } from '../../types';
import { StatsModal } from '../StatsModal/StatsModal';
import { Card, Container } from './StatsCard.style';

interface StatsCardProps {
  number: string;
  title: string;
  handleClick: () => void;
}

export const StatsCard = ({ number, title, handleClick }: StatsCardProps) => {
  const theme = useTheme();
  const counter = useCountUpAnimation({ children: number, duration: 1000 });
  return (
    <Card
      className={'stats-card'}
      onClick={handleClick}
      sx={{ cursor: 'pointer' }}
    >
      <Typography
        variant={'lifiHeaderMedium'}
        sx={{
          fontSize: '24px',
          lineHeight: '32px',
          pointerEvents: 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '80px',
          maxHeight: '32px',
          [theme.breakpoints.up('sm')]: {
            fontSize: '32px',
            maxHeight: '40px',
            lineHeight: '40px',
          },
        }}
      >
        {counter}
      </Typography>
      <Typography
        variant={'lifiBodySmall'}
        sx={{
          pointerEvents: 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '80px',
          maxHeight: '20px',
          [theme.breakpoints.up('sm')]: {
            mt: theme.spacing(0.5),
            fontSize: '16px',
            maxWidth: '118px',
          },
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

type DataItem = {
  name: string;
  // Other properties of the data item
};

const sortByName = (data: DataItem[]): DataItem[] => {
  return data?.sort(function (a: DataItem, b: DataItem) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

interface StatsDataProps {
  title: string;
  number: string;
  data: DataItem[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleOnClick: () => void;
}

interface StatsCardsProps {
  openChainsPopper: boolean;
  setOpenChainsPopper: Dispatch<SetStateAction<boolean>>;
  openBridgesPopper: boolean;
  setOpenBridgesPopper: Dispatch<SetStateAction<boolean>>;
  openDexsPopper: boolean;
  setOpenDexsPopper: Dispatch<SetStateAction<boolean>>;
}

const CHAINS_INDEX = 0;
const BRIDGES_INDEX = 1;
const DEXS_INDEX = 2;

export const StatsCards = ({
  openChainsPopper,
  setOpenChainsPopper,
  openBridgesPopper,
  setOpenBridgesPopper,
  openDexsPopper,
  setOpenDexsPopper,
}: StatsCardsProps) => {
  const { exchanges, bridges } = useFetchDexsAndBridges();
  const { chains } = useChains();
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();

  const statsData: StatsDataProps[] = [
    {
      title: t('navbar.statsCards.chains'),
      number: chains?.length || 0,
      data: sortByName(chains),
      open: openChainsPopper,
      setOpen: setOpenChainsPopper,
      handleOnClick: () => {
        trackEvent({
          category: TrackingCategory.WelcomeScreen,
          action: TrackingAction.OpenStatsModal,
          label: 'chains_stats',
          data: { [TrackingEventParameter.StatsModal]: 'chains_stats' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        setOpenChainsPopper(!openChainsPopper);
      },
    },
    {
      title: t('navbar.statsCards.bridges'),
      number: bridges?.length || 0,
      data: sortByName(bridges),
      open: openBridgesPopper,
      setOpen: setOpenBridgesPopper,
      handleOnClick: () => {
        trackEvent({
          category: TrackingCategory.WelcomeScreen,
          action: TrackingAction.OpenStatsModal,
          label: 'bridges_stats',
          data: { [TrackingEventParameter.StatsModal]: 'bridges_stats' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        setOpenBridgesPopper(!openBridgesPopper);
      },
    },
    {
      title: t('navbar.statsCards.dexs'),
      number: exchanges?.length || 0,
      data: sortByName(exchanges),
      open: openDexsPopper,
      setOpen: setOpenDexsPopper,
      handleOnClick: () => {
        trackEvent({
          category: TrackingCategory.WelcomeScreen,
          action: TrackingAction.OpenStatsModal,
          label: 'dexes_stats',
          data: { [TrackingEventParameter.StatsModal]: 'dexes_stats' },
          disableTrackingTool: [
            EventTrackingTool.ARCx,
            EventTrackingTool.Cookie3,
          ],
        });
        setOpenDexsPopper(!openDexsPopper);
      },
    },
  ];

  return (
    <Container>
      {/* Chains */}
      <StatsCard
        title={statsData[CHAINS_INDEX].title}
        number={statsData[CHAINS_INDEX].number}
        handleClick={statsData[CHAINS_INDEX].handleOnClick}
      />
      <StatsModal
        title={statsData[CHAINS_INDEX].title}
        open={statsData[CHAINS_INDEX].open}
        setOpen={statsData[CHAINS_INDEX].setOpen}
        data={statsData[CHAINS_INDEX].data}
      />
      {/* Bridges */}
      <StatsCard
        title={statsData[BRIDGES_INDEX].title}
        number={statsData[BRIDGES_INDEX].number}
        handleClick={statsData[BRIDGES_INDEX].handleOnClick}
      />
      <StatsModal
        title={statsData[BRIDGES_INDEX].title}
        open={statsData[BRIDGES_INDEX].open}
        setOpen={statsData[BRIDGES_INDEX].setOpen}
        data={statsData[BRIDGES_INDEX].data}
      />
      {/* DEXs */}
      <StatsCard
        title={statsData[DEXS_INDEX].title}
        number={statsData[DEXS_INDEX].number}
        handleClick={statsData[DEXS_INDEX].handleOnClick}
      />
      <StatsModal
        title={statsData[DEXS_INDEX].title}
        open={statsData[DEXS_INDEX].open}
        setOpen={statsData[DEXS_INDEX].setOpen}
        data={statsData[DEXS_INDEX].data}
      />
    </Container>
  );
};
