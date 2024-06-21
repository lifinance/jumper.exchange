import { ToolModal } from '@/components/WelcomeScreen';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useChains } from '@/hooks/useChains';
import { useDexsAndBridges } from '@/hooks/useDexsAndBridges';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import type { DataItem } from '@/types/internal';
import { sortByName } from '@/utils/sortByName';
import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolCardsContainer as Container, ToolCard } from '.';
interface StatsDataProps {
  title: string;
  number: string;
  data: DataItem[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleOnClick: () => void;
}

interface ToolCardsProps {
  openChainsToolModal: boolean;
  setOpenChainsToolModal: Dispatch<SetStateAction<boolean>>;
  openBridgesToolModal: boolean;
  setOpenBridgesToolModal: Dispatch<SetStateAction<boolean>>;
  openDexsToolModal: boolean;
  setOpenDexsToolModal: Dispatch<SetStateAction<boolean>>;
}

const CHAINS_INDEX = 0;
const BRIDGES_INDEX = 1;
const DEXS_INDEX = 2;

export const ToolCards = ({
  openChainsToolModal,
  setOpenChainsToolModal,
  openBridgesToolModal,
  setOpenBridgesToolModal,
  openDexsToolModal,
  setOpenDexsToolModal,
}: ToolCardsProps) => {
  const { exchanges, bridges } = useDexsAndBridges();
  const { chains } = useChains();
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();

  const statsData: StatsDataProps[] = [
    {
      title: t('navbar.statsCards.chains'),
      number: chains?.length.toString() || '0',
      data: sortByName(chains),
      open: openChainsToolModal,
      setOpen: setOpenChainsToolModal,
      handleOnClick: () => {
        trackEvent({
          category: TrackingCategory.WelcomeScreen,
          action: TrackingAction.OpenToolModal,
          label: 'chains_stats',
          data: { [TrackingEventParameter.ToolModal]: 'chains_stats' },
        });
        setOpenChainsToolModal(!openChainsToolModal);
      },
    },
    {
      title: t('navbar.statsCards.bridges'),
      number: bridges?.length || 0,
      data: sortByName(bridges),
      open: openBridgesToolModal,
      setOpen: setOpenBridgesToolModal,
      handleOnClick: () => {
        trackEvent({
          category: TrackingCategory.WelcomeScreen,
          action: TrackingAction.OpenToolModal,
          label: 'bridges_stats',
          data: { [TrackingEventParameter.ToolModal]: 'bridges_stats' },
        });
        setOpenBridgesToolModal(!openBridgesToolModal);
      },
    },
    {
      title: t('navbar.statsCards.dexs'),
      number: exchanges?.length || 0,
      data: sortByName(exchanges),
      open: openDexsToolModal,
      setOpen: setOpenDexsToolModal,
      handleOnClick: () => {
        trackEvent({
          category: TrackingCategory.WelcomeScreen,
          action: TrackingAction.OpenToolModal,
          label: 'dexes_stats',
          data: { [TrackingEventParameter.ToolModal]: 'dexes_stats' },
        });
        setOpenDexsToolModal(!openDexsToolModal);
      },
    },
  ];

  return (
    <Container>
      {/* Chains */}
      <ToolCard
        title={statsData[CHAINS_INDEX].title}
        number={statsData[CHAINS_INDEX].number}
        handleClick={statsData[CHAINS_INDEX].handleOnClick}
      />
      <ToolModal
        title={statsData[CHAINS_INDEX].title}
        open={statsData[CHAINS_INDEX].open}
        setOpen={statsData[CHAINS_INDEX].setOpen}
        data={statsData[CHAINS_INDEX].data}
      />
      {/* Bridges */}
      <ToolCard
        title={statsData[BRIDGES_INDEX].title}
        number={statsData[BRIDGES_INDEX].number}
        handleClick={statsData[BRIDGES_INDEX].handleOnClick}
      />
      <ToolModal
        title={statsData[BRIDGES_INDEX].title}
        open={statsData[BRIDGES_INDEX].open}
        setOpen={statsData[BRIDGES_INDEX].setOpen}
        data={statsData[BRIDGES_INDEX].data}
      />
      {/* DEXs */}
      <ToolCard
        title={statsData[DEXS_INDEX].title}
        number={statsData[DEXS_INDEX].number}
        handleClick={statsData[DEXS_INDEX].handleOnClick}
      />
      <ToolModal
        title={statsData[DEXS_INDEX].title}
        open={statsData[DEXS_INDEX].open}
        setOpen={statsData[DEXS_INDEX].setOpen}
        data={statsData[DEXS_INDEX].data}
      />
    </Container>
  );
};
