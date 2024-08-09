'use client';
import { useQuery } from '@tanstack/react-query';

const LEADERBOARD_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/leaderboard`;

export const useLeaderboardList = (page: number, limit: number): any => {

  const { data: leaderboardListData, isSuccess, isLoading } = useQuery({
    queryKey: [`leaderboard-${page}-${limit}`],
    queryFn: async () => {
      try {
        const response = await fetch(`${LEADERBOARD_ENDPOINT}?page=${page}&limit=${limit}`);
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const data = leaderboardListData?.data;
  const meta = leaderboardListData?.meta;

  return {
    data,
    meta,
    isLoading,
    isSuccess,
  };
};

export const useLeaderboardUser = (walletAddress?: string): any => {

  if (!walletAddress) {
    return {
      data: null,
      isLoading: false,
      isSuccess: false,
    };
  }

  const { data: leaderboardUserData, isSuccess, isLoading } = useQuery({
    queryKey: [`leaderboard-user-${walletAddress}`],
    queryFn: async () => {
      try {
        const response = await fetch(`${LEADERBOARD_ENDPOINT}/${walletAddress}`);
        const result = await response.json();
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const data = leaderboardUserData?.data;

  return {
    data,
    isLoading,
    isSuccess,
  };
};
