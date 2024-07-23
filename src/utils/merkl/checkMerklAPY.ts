const CHAIN_IDS = [10, 252, 34443, 8453];

export async function checkResult(
  claimId: string,
  chainId: number,
): Promise<number> {
  let result = 0;
  const res = await fetch(
    'https://api.merkl.xyz/v3/campaigns?chainIds=10,252,34443,8453&creatorTag=superfest',
    {
      next: {
        revalidate: 100, //3600 * 12, // 12 hours
      },
    },
  );
  const data = await res.json();

  console.log('hereeeee');
  console.log(claimId);
  if (data && data?.[chainId] && data?.[chainId]?.[claimId]) {
    console.log(data?.[chainId]?.[claimId]);
    result = data?.[chainId]?.[claimId]?.[0]?.['apr'];
  }

  return result;
}

export async function checkMerklAPY(
  ids: string[],
): Promise<number | undefined> {
  let result = 0;
  for (const id of ids) {
    for (const chain of CHAIN_IDS) {
      const res = await checkResult(id, chain);
      result = res > result ? res : result;
    }
  }
  console.log('-----------');
  console.log(result);
  return result;
}
