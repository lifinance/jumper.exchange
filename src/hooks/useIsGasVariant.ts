import { TabsMap } from 'src/const/tabsMap';
import { useActiveTabStore } from 'src/stores/activeTab';

export const useIsGasVariant = () => {
  const { activeTab } = useActiveTabStore();
  const isGasVariant = activeTab === TabsMap.Refuel.index;

  return isGasVariant;
};
