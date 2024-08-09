import { useChainTokenSelectionStore } from 'src/stores/chainTokenSelection';
import { ChainId } from '@lifi/types';

export const useDeductedAmount = () => {
  const { sourceChainToken, destinationChainToken } =
    useChainTokenSelectionStore();

  let deductedAmount = undefined;

  if (
    sourceChainToken?.chainId === ChainId.SOL &&
    destinationChainToken?.chainId === ChainId.SOL
  ) {
    deductedAmount = 5 / 10000;
  }

  return {
    deductedAmount,
  };
};
