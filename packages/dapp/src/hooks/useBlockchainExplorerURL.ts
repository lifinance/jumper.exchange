import { useChains } from '@transferto/dapp/src/hooks/useChains';
import { useWallet } from '../providers';

export const useBlockchainExplorerURL = () => {
  const { account } = useWallet();
  const { isSuccess: chainsLoaded, getChainById } = useChains();

  if (account.isActive && account.chainId) {
    const chain = getChainById(account.chainId);
    if (chainsLoaded && chain?.metamask) {
      return `${chain.metamask.blockExplorerUrls[0]}address/${account.address}`;
    } else {
      console.error(`No blockchain explorer found for ${account.chainId}`);
    }
  }
};
