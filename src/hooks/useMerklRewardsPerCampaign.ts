// 'use client';
// import { MercleNFTABI } from '../const/abi/mercleNftABI';
// import { base } from 'wagmi/chains';
// import { useReadContract } from 'wagmi';
// import { useQuery } from '@tanstack/react-query';

// export interface UseMerklRes {
//   isSuccess: boolean;
//   isLoading: boolean;
//   userTVL: number;
//   activePosition: any[];
//   availableRewards: any[];
// }

// export interface UseMerklRewardsProps {
//   userAddress?: string;
// }

// const JUMPER_QUEST_ID = ['0x1C6A6Ee7D2e0aC0D2E3de4a69433553e0cb52777'];

// const ACTIVE_CHAINS = ['42161', '10', '8453', '34443'];

// const MERKL_API = 'https://api.merkl.xyz/v3';
// const REWARDS_CHAIN_ID = '10';
// const REWARDS_TOKEN = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';

// export const useMerklRewardsPerCampaign = ({
//   userAddress,
// }: UseMerklRewardsProps): UseMerklRes => {
//   // state
//   let userTVL = 0;
//   let rewardsToClaim = [];
//   //test
//   console.log('-------------');

//   // Call to get the active positions
//   // To do -> use the label to get only
//   const MERKL_POSITIONS_API = `${MERKL_API}/positions?chainId=${ACTIVE_CHAINS.join(',')}&user=${userAddress}`;
//   const {
//     data: positionsData,
//     isSuccess: positionsIsSuccess,
//     isLoading: positionsIsLoading,
//   } = useQuery({
//     queryKey: ['MerklPositions'],

//     queryFn: async () => {
//       const response = await fetch(MERKL_POSITIONS_API, {
//         // headers: {
//         //   Authorization: `Bearer ${apiAccesToken}`,
//         // },
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     },
//     // enabled: !!account?.address && account.chainType === 'EVM',
//     refetchInterval: 1000 * 60 * 60,
//   });
//   // loop through the position and sum the TVL USD
//   if (positionsData) {
//     for (const [key, data] of Object.entries(positionsData)) {
//       if (
//         JUMPER_QUEST_ID.includes(key.split('_')[1]) &&
//         (data as any)?.userTVL
//       ) {
//         userTVL += (data as any)?.userTVL;
//       }
//     }
//   }

//   // check the user positions for the interesting campaign

//   // Call to get the available rewards
//   const MERKL_REWARDS_API = `${MERKL_API}/rewards?chainIds=10&user=${userAddress}`;
//   const {
//     data: rewardsData,
//     isSuccess: rewardsIsSuccess,
//     isLoading: rewardsIsLoading,
//   } = useQuery({
//     queryKey: ['MerklRewards'],

//     queryFn: async () => {
//       const response = await fetch(MERKL_REWARDS_API, {
//         // headers: {
//         //   Authorization: `Bearer ${apiAccesToken}`,
//         // },
//       });
//       const result = await response.json();
//       return result;
//     },
//     // enabled: !!account?.address && account.chainType === 'EVM',
//     refetchInterval: 1000 * 60 * 60,
//   });
//   console.log(rewardsData);
//   // transform the rewards to get the total in the token that we want // OP
//   // transform the result to know what is coming from Jumper campaigns
//   // transform to know what is not coming from Jumper campaigns
//   if (rewardsData) {
//     const tokenData = rewardsData[REWARDS_CHAIN_ID]?.tokenData;
//     let rewardData = [];
//     console.log(tokenData);
//     if (tokenData) {
//       rewardsToClaim = Object.entries(tokenData).map((elem): any => {
//         console.log('---');
//         const key = elem[0];
//         const value = elem[1] as any;
//         console.log(key);
//         console.log(value);
//         return {
//           chainId: REWARDS_CHAIN_ID,
//           address: key,
//           symbol: value.symbol,
//           amountToClaim: value.unclaimed / 10 ** value.decimals,
//           amountAccumulated: value.accumulated / 10 ** value.decimals,
//           proof: value.proof,
//         };
//       });
//     }
//   }

//   console.log('REWARDs ------------');
//   console.log(rewardsToClaim);

//   return {
//     isLoading: positionsIsLoading && rewardsIsLoading,
//     isSuccess: positionsIsSuccess && rewardsIsSuccess,
//     userTVL: userTVL,
//     activePosition: [],
//     availableRewards: rewardsToClaim,
//   };
// };
