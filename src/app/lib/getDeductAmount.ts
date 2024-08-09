import * as Sentry from '@sentry/nextjs';

import { ChainId } from '@lifi/types';

const NON_STABLE_BRIDGE = 10;
const STABLE_BRIDGE = 5;
const STABLE_SWAP = 2;
const NON_STABLE_SWAP = 5;
const SOLANA_STABLES = [
  'epjfwdd5aufqssqem2qn1xzybapc8g4weggkzwytdt1v',
  'es9vmfrzacermjfrf4h2fyd4kconky11mcce8benwnyb',
  '2b1kv6dkpanxd5ixfnxcpjxmkwqjjaymczfhsfu24gxo',
  'ejmyn6qec1tf1jxig1ae7utjhuxswk1tcwnwqxwv4j6o',
  'fr87nweuxvgerfghzm8y4aggkglnaxswr1pd8wz4kzcp',
];

const EVM_STABLES = [
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  '0x6b175474e89094c44da98b954eedeac495271d0f',
  '0x6c3ea9036406852006290770bedfcaba0e23a0e8',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0x853d955acef822db058eb8505911ed77f175b99e',
  '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
  '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
  '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0x2e3d870790dc77a83dd1d18184acc7439a53f475',
  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
  '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
  '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  '0x17fc002b466eec40dae837fc4be5c67993ddbd6f',
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
  '0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca',
  '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  '0x45c32fa6df82ead1e2ef74d17b76547eddfaff89',
  '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035',
  '0xc5015b9d9161dca7e18e32f6f25c4ad850731fd4',
  '0x1e4a5963abfd975d8c9021ce480b42188849d41d',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0x55d398326f99059ff775485246999027b3197955',
  '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0x90c97f71e18723b0cf0dfa30ee176ab653e89f40',
  '0xc7198437980c041c805a1edcba50c1ce5db95118',
  '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
  '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
  '0x0000206329b97db379d5e1bf586bbdb969c63274',
  '0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64',
  '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
  '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
  '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4',
  '0xa219439258ca9da29e9cc4ce5596924745e12b93',
  '0x176211869ca2b568f2a7d4ee941e073a821ee1ff',
  '0x4af15ec2a0bd43db75dd04e62faa3b8ef36b00d5',
];

interface ITokenInfo {
  chainId?: ChainId;
  tokenAddress?: string;
}

export const getDeductedAmount = (
  sourceChainToken: ITokenInfo,
  destinationChainToken: ITokenInfo,
) => {
  let amount = undefined;
  const srcTokenAddress = sourceChainToken?.tokenAddress?.toLowerCase();
  const dstTokenAddress = destinationChainToken?.tokenAddress?.toLowerCase();

  if (
    srcTokenAddress &&
    dstTokenAddress &&
    sourceChainToken?.chainId === ChainId.SOL &&
    destinationChainToken?.chainId === ChainId.SOL
  ) {
    if (
      SOLANA_STABLES.includes(srcTokenAddress) &&
      SOLANA_STABLES.includes(dstTokenAddress)
    ) {
      amount = STABLE_SWAP / 10000;
    } else {
      amount = NON_STABLE_SWAP / 10000;
    }
  } else if (
    srcTokenAddress &&
    dstTokenAddress &&
    (sourceChainToken?.chainId === ChainId.SOL ||
      destinationChainToken?.chainId === ChainId.SOL)
  ) {
    if (
      (SOLANA_STABLES.includes(srcTokenAddress) &&
        EVM_STABLES.includes(dstTokenAddress)) ||
      (EVM_STABLES.includes(srcTokenAddress) &&
        SOLANA_STABLES.includes(dstTokenAddress))
    ) {
      amount = STABLE_BRIDGE / 10000;
    } else {
      amount = NON_STABLE_BRIDGE / 10000;
    }
  }

  return {
    deductedAmount: amount,
  };
};

// Move function to the backend
async function getDeductAmount(
  srcChainId: number,
  srcTokenAddress: string,
  dstChainId: number,
  dstTokenAddress: string,
): Promise<number | undefined> {
  try {
    const result = getDeductedAmount(
      {
        chainId: Number(srcChainId),
        tokenAddress: srcTokenAddress as string,
      },
      {
        chainId: Number(dstChainId),
        tokenAddress: dstTokenAddress as string,
      },
    );

    return result?.deductedAmount;
  } catch (e) {
    Sentry.captureException(e);
    console.error(e);

    return undefined;
  }
}

export default getDeductAmount;
