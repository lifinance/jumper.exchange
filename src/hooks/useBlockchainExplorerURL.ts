import { useChains } from '@/hooks/useChains';
import { ChainId } from '@lifi/sdk';

export const useBlockchainExplorerURL = () => {
  const { isSuccess: chainsLoaded, getChainById } = useChains();

  return (walletAddress?: string, chainId?: number) => {
    if (!walletAddress || !chainId) {
      return undefined;
    }
    if (chainId === ChainId.SOL) {
      return `https://explorer.solana.com/address/${walletAddress}`;
    }
    const chain = getChainById(chainId);
    if (chainsLoaded && chain?.metamask) {
      return `${chain.metamask.blockExplorerUrls[0]}address/${walletAddress}`;
    } else {
      console.error(`No blockchain explorer found for ${chainId}`);
    }
  };
};
