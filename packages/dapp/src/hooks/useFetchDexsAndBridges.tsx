import { useQuery } from '@tanstack/react-query';

export const useFetchDexsAndBridges = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tools'],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_LIFI_API_URL;
      const response = await fetch(`${apiUrl}/tools`);
      const result = await response.json();
      return result;
    },
  });

  return {
    bridges: data?.bridges,
    exchanges: data?.exchanges,
    isLoading,
    error,
  };
};
