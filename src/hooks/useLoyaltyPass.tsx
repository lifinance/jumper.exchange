import { useLoyaltyPassStore } from '@/stores/loyaltyPass';
import type { PDA } from '@/types/loyaltyPass';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { getAllPDAs } from './querries/pdas';
import { useAccounts } from './useAccounts';

export interface UseLoyaltyPassProps {
  isSuccess: boolean;
  isLoading: boolean;
  points?: number;
  tier?: string;
  pdas?: PDA[];
}

interface IGatewayAPI {
  issuedPDAs: PDA[];
}

const SECONDS_IN_A_DAY = 86400;

export const useLoyaltyPass = (): UseLoyaltyPassProps => {
  const { account } = useAccounts();
  const {
    address: storedAddress,
    points: storedPoints,
    tier: storedTier,
    pdas: storedPdas,
    timestamp,
    setLoyaltyPassData,
  } = useLoyaltyPassStore((state) => state);

  //we store the data during 24hours to avoid querying too much our partner API.
  const t = Date.now() / 1000;
  const storeNeedsRefresh = t > (timestamp ?? 0) + SECONDS_IN_A_DAY;

  const queryIsEnabled =
    !!account?.address &&
    account?.chainType === 'EVM' &&
    (storeNeedsRefresh ||
      account?.address?.toLowerCase() !== storedAddress?.toLowerCase());

  // query
  const apiBaseUrl = process.env.NEXT_PUBLIC_GATEWAY_URL;
  const apiUrl = new URL(`${apiBaseUrl}`);
  const apiKey = process.env.NEXT_PUBLIC_GATEWAY_API_KEY;
  const apiAccesToken = process.env.NEXT_PUBLIC_GATEWAY_API_TOKEN;
  const headers = {
    'x-api-key': `${apiKey}`,
    Authorization: `Bearer ${apiAccesToken}`,
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['loyalty-pass'],
    queryFn: async () => {
      const res = await request(
        decodeURIComponent(apiUrl.href),
        getAllPDAs,
        { EVMAddress: account?.address },
        headers,
      );

      if (res && account?.address) {
        let points = 0;
        let tier = '';
        const { issuedPDAs: pdas } = res as IGatewayAPI;
        // filter to remove loyalty pass from pda
        const pdasWithoutLoyalty = pdas.filter((pda: PDA) => {
          if (pda.dataAsset.title === 'LI.FI Loyalty Pass') {
            points = pda.dataAsset.claim.points;
            tier = pda.dataAsset.claim.tier;
            return false;
          }
          return true;
        });

        setLoyaltyPassData(
          account.address,
          points,
          tier,
          pdasWithoutLoyalty,
          t,
        );

        return {
          address: account.address,
          points: points,
          tier: tier,
          pdas: pdasWithoutLoyalty,
        };
      } else {
        return null;
      }
    },
    enabled: queryIsEnabled,
    refetchInterval: 1000 * 60 * 60,
  });

  const returnLocalData = account?.address === storedAddress && !queryIsEnabled;

  const errorWhileFetchingData =
    !data || !account?.address || !(account.chainType === 'EVM');

  if (returnLocalData) {
    return {
      isSuccess: true,
      isLoading: isLoading,
      points: storedPoints,
      tier: storedTier,
      pdas: storedPdas,
    };
  } else if (errorWhileFetchingData) {
    return {
      isSuccess: false,
      isLoading: isLoading,
      points: undefined,
      tier: undefined,
      pdas: [],
    };
  }

  return { ...data, isSuccess, isLoading };
};
