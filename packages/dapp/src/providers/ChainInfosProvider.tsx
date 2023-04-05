import { ChainsResponse } from '@lifi/sdk';
import { ExtendedChain } from '@lifi/types';

import axios from 'axios';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useQuery } from 'react-query';

export interface ChainInfosContextProps {
  chains: ExtendedChain[];
  isSuccess: boolean;
}

const initialData = {
  chains: [],
  isSuccess: false,
};

const ChainInfosContext = createContext<ChainInfosContextProps>(initialData);

export const useChainInfos = () => {
  return useContext(ChainInfosContext);
};

export const ChainInfosProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { data, isSuccess } = useQuery(
    ['chainStats'],
    async () => {
      const apiUrl = (import.meta as any).env.VITE_LIFI_API_URL;
      const result = await axios<ChainsResponse>({
        method: 'GET',
        url: `${apiUrl}/chains`,
      });
      if ((import.meta as any).env.VITE_LIFI_SHOW_TESTNET) {
        const testnetChains = result.data.chains.filter((el) => !el.mainnet);
        return { chains: testnetChains };
      }
      return result.data;
    },
    {
      enabled: true,
      refetchInterval: 1000 * 60 * 60,
      initialData: { chains: [] },
    },
  );

  return (
    <ChainInfosContext.Provider value={{ chains: data.chains, isSuccess }}>
      {children}
    </ChainInfosContext.Provider>
  );
};
