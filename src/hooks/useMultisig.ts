import { useMultisigStore } from '@/stores/multisig';
import type { MultisigWidgetConfig } from '@/types/internal';
import type {
  MultisigConfig,
  MultisigTransaction,
  MultisigTxDetails,
} from '@lifi/sdk';
import { type Process, type Route } from '@lifi/sdk';
import type { GatewayTransactionDetails } from '@safe-global/safe-apps-sdk';
import SafeAppsSDK, { TransactionStatus } from '@safe-global/safe-apps-sdk';
import { useAccounts } from './useAccounts';

export const useMultisig = () => {
  const { account } = useAccounts();

  const checkMultisigEnvironment = async () => {
    // in Multisig env, window.parent is not equal to window
    const isIframeEnvironment = window.parent !== window;

    if (!isIframeEnvironment) {
      return false;
    }

    const sdk = new SafeAppsSDK();
    const accountInfo = await Promise.race([
      sdk.safe.getInfo(),
      new Promise<undefined>((resolve) => setTimeout(resolve, 200)),
    ]);

    return !!accountInfo?.safeAddress;
  };

  const isSafeConnector = Boolean(account?.connector?.name === 'Safe');

  const handleMultiSigTransactionDetails = async (
    txHash: string,
    chainId: number,
    updateIntermediateStatus?: () => void,
  ): Promise<MultisigTxDetails> => {
    const safeAppProvider = await (account?.connector as any).getProvider();
    const safeProviderSDK = safeAppProvider.sdk;

    const safeTransactionDetails: GatewayTransactionDetails =
      await safeProviderSDK.txs.getBySafeTxHash(txHash);

    const safeTxHash = safeTransactionDetails.txId;

    const safeApiTransactionResponse = await fetch(
      `https://safe-client.safe.global/v1/chains/${chainId}/transactions/${safeTxHash}`,
    );

    const safeApiTransactionDetails = await safeApiTransactionResponse.json();

    const nonTerminalStatus = [
      TransactionStatus.SUCCESS,
      TransactionStatus.CANCELLED,
      TransactionStatus.FAILED,
    ];

    const isSafeStatusPending =
      !nonTerminalStatus.includes(safeTransactionDetails.txStatus) &&
      !nonTerminalStatus.includes(safeApiTransactionDetails.txStatus);

    const isAwaitingExecution = [
      safeTransactionDetails.txStatus,
      safeApiTransactionDetails.txStatus,
    ].includes(TransactionStatus.AWAITING_EXECUTION);

    if (isAwaitingExecution) {
      updateIntermediateStatus?.();
    }

    if (isSafeStatusPending) {
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });

      return await handleMultiSigTransactionDetails(
        txHash,
        chainId,
        updateIntermediateStatus,
      );
    }

    if (
      [
        safeTransactionDetails.txStatus,
        safeApiTransactionDetails.txStatus,
      ].includes(TransactionStatus.SUCCESS)
    ) {
      return {
        status: 'DONE',
        txHash: `0x${safeTransactionDetails.txHash?.slice(2)}`,
      };
    }

    if (
      [
        safeTransactionDetails.txStatus,
        safeApiTransactionDetails.txStatus,
      ].includes(TransactionStatus.FAILED)
    ) {
      return {
        status: 'FAILED',
        txHash: `0x${safeTransactionDetails.txHash?.slice(2)}`,
      };
    }

    if (
      [
        safeTransactionDetails.txStatus,
        safeApiTransactionDetails.txStatus,
      ].includes(TransactionStatus.CANCELLED)
    ) {
      return {
        status: 'CANCELLED',
        txHash: `0x${safeTransactionDetails.txHash?.slice(2)}`,
      };
    }

    if (isSafeStatusPending) {
      return {
        status: 'PENDING',
        txHash: `0x${safeTransactionDetails.txHash?.slice(2)}`,
      };
    }

    return {
      status: 'PENDING',
      txHash: `0x${safeTransactionDetails.txHash?.slice(2)}`,
    };
  };

  const handleSendingBatchTransaction = async (
    batchTransactions: MultisigTransaction[],
  ): Promise<`0x${string}`> => {
    const safeAppProvider = await (account?.connector as any).getProvider();
    const safeProviderSDK = safeAppProvider.sdk;

    try {
      const { safeTxHash } = await safeProviderSDK.txs.send({
        txs: batchTransactions,
      });

      return `0x${safeTxHash.slice(2)}`;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const getMultisigWidgetConfig = (): Partial<{
    multisigWidget: MultisigWidgetConfig;
    multisigSdkConfig: MultisigConfig;
  }> => {
    const multisigConfig = {
      isMultisigWalletClient: isSafeConnector,
      getMultisigTransactionDetails: handleMultiSigTransactionDetails,
      shouldBatchTransactions: isSafeConnector,
      sendBatchTransaction: handleSendingBatchTransaction,
    };

    const destinationChain = useMultisigStore.getState().destinationChain;

    if (isSafeConnector) {
      const shouldRequireToAddress = account?.chainId !== destinationChain;

      return {
        multisigWidget: {
          fromChain: account?.chainId,
          requiredUI: shouldRequireToAddress ? ['toAddress'] : [],
        },
        multisigSdkConfig: {
          ...multisigConfig,
        },
      };
    }

    return {};
  };

  const shouldOpenMultisigSignatureModal = (route: Route) => {
    const isRouteDone = route.steps.every(
      (step) => (step as any).execution?.status === 'DONE',
    );

    const isRouteFailed = route.steps.some(
      (step) => (step as any).execution?.status === 'FAILED',
    );

    const multisigRouteStarted = route.steps.some((step) =>
      (step as any).execution?.process.find(
        (process: Process) =>
          !!process.multisigTxHash && process.status === 'ACTION_REQUIRED',
      ),
    );

    return !isRouteDone && !isRouteFailed && multisigRouteStarted;
  };

  return {
    isMultisigSigner: isSafeConnector,
    getMultisigWidgetConfig,
    checkMultisigEnvironment,
    shouldOpenMultisigSignatureModal,
  };
};
