'use client';

import type { ChainId } from '@lifi/types';
import type { ChainTokenSelected } from '@lifi/widget';
import { createWithEqualityFn } from 'zustand/traditional';

interface OptionalChainTokenSelected {
  chainId: ChainId | null | undefined;
  tokenAddress: string | null | undefined;
}

interface ChainTokenSelectionState {
  sourceChainToken: OptionalChainTokenSelected;
  setSourceChainToken: (sourceChainToken: ChainTokenSelected) => void;
  destinationChainToken: OptionalChainTokenSelected;
  setDestinationChainToken: (destinationChainToken: ChainTokenSelected) => void;
}

const queryParameters =
  typeof window !== 'undefined' &&
  window?.location &&
  new URLSearchParams(window.location.search);
const fromChain = queryParameters && queryParameters.get('fromChain');
const fromToken = queryParameters && queryParameters.get('fromToken');
const toChain = queryParameters && queryParameters.get('toChain');
const toToken = queryParameters && queryParameters.get('toToken');

export const useChainTokenSelectionStore =
  createWithEqualityFn<ChainTokenSelectionState>(
    (set) => ({
      sourceChainToken: {
        tokenAddress: fromToken || null,
        chainId: (fromChain && (parseInt(fromChain) as ChainId)) || null,
      },
      setSourceChainToken: (sourceChainToken) =>
        set({
          sourceChainToken,
        }),
      destinationChainToken: {
        tokenAddress: toToken || null,
        chainId: (toChain && (parseInt(toChain) as ChainId)) || null,
      },
      setDestinationChainToken: (destinationChainToken) =>
        set({
          destinationChainToken,
        }),
    }),
    Object.is,
  );
