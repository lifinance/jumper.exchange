import { Chain, ChainId, ExtendedChain } from '@lifi/types';
import { useQuery } from '@tanstack/react-query';

export interface ChainProps {
  chains: ExtendedChain[];
  isSuccess: boolean;
  getChainById: (id: ChainId) => ExtendedChain;
}

export const useChains = (): ChainProps => {
  const { data, isSuccess } = useQuery({
    queryKey: ['chainStats'],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_LIFI_API_URL;
      const response = await fetch(`${apiUrl}/chains`);
      const result = await response.json();
      return result;
    },
    enabled: true,
    refetchInterval: 1000 * 60 * 60,
  });

  const getChainById = (id: ChainId) => {
    const filteredChain = data?.chains.find((el: Chain) => el.id === id);
    if (filteredChain) {
      return filteredChain;
    } else {
      console.error(`ChainID ${id} is not available`);
    }
  };

  return {
    getChainById,
    chains: data?.chains,
    isSuccess,
  };
};
