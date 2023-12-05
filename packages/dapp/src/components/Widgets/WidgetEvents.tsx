import { Route } from '@lifi/sdk';
import { useUserTracking } from '../../hooks';

import {
  ChainTokenSelected,
  RouteContactSupport,
  RouteExecutionUpdate,
  RouteHighValueLossUpdate,
  WidgetEvent,
  useWidgetEvents,
} from '@lifi/widget';
import { useEffect, useRef, useState } from 'react';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '../../const';
import { TabsMap } from '../../const/tabsMap';
import { useMultisig } from '../../hooks/useMultisig';
import { useWallet } from '../../providers/WalletProvider';
import {
  useActiveTabStore,
  useMenuStore,
  useMultisigStore,
} from '../../stores';
import { MultisigConfirmationModal } from '../MultisigConfirmationModal';
import { MultisigConnectedAlert } from '../MultisigConnectedAlert';

export function WidgetEvents() {
  const lastTxHashRef = useRef<string>();
  const { activeTab } = useActiveTabStore();
  const { trackEvent, trackTransaction } = useUserTracking();
  const [onOpenSupportModal] = useMenuStore((state) => [
    state.onOpenSupportModal,
  ]);
  const widgetEvents = useWidgetEvents();
  const { isMultisigSigner, shouldOpenMultisigSignatureModal } = useMultisig();
  const [onDestinationChainSelected] = useMultisigStore((state) => [
    state.onDestinationChainSelected,
  ]);

  const { account } = useWallet();

  const [isMultiSigConfirmationModalOpen, setIsMultiSigConfirmationModalOpen] =
    useState(false);

  const [isMultisigConnectedAlertOpen, setIsMultisigConnectedAlertOpen] =
    useState(false);

  useEffect(() => {
    const onRouteExecutionStarted = async (route: Route) => {
      if (!!route.id) {
        trackEvent({
          category: TrackingCategory.WidgetEvent,
          action: TrackingAction.OnRouteExecutionStarted,
          label: 'execution_start',
          value: parseFloat(route.fromAmountUSD),
          data: {
            [TrackingEventParameter.RouteId]: route.id,
            [TrackingEventParameter.FromToken]: route.fromToken.address,
            [TrackingEventParameter.ToToken]: route.toToken.address,
            [TrackingEventParameter.FromChainId]: route.fromChainId,
            [TrackingEventParameter.ToChainId]: route.toChainId,
            [TrackingEventParameter.FromAmount]: route.fromAmount,
            [TrackingEventParameter.ToAmount]: route.toAmount,
            [TrackingEventParameter.FromAmountUSD]: route.fromAmountUSD,
            [TrackingEventParameter.ToAmountUSD]: route.toAmountUSD,
            [TrackingEventParameter.Variant]: Object.values(TabsMap).filter(
              (el) => el.index === activeTab,
            )[0].variant,
          },
        });
      }
    };
    const onRouteExecutionUpdated = async (update: RouteExecutionUpdate) => {
      // check if multisig and open the modal

      const isMultisigRouteActive = shouldOpenMultisigSignatureModal(
        update.route,
      );

      if (isMultisigRouteActive) {
        setIsMultiSigConfirmationModalOpen(true);
      }

      if (!!update.process && !!update.route) {
        if (update.process.txHash !== lastTxHashRef.current) {
          lastTxHashRef.current = update.process.txHash;
          trackTransaction({
            chain: update.route.fromChainId,
            txhash: update.process.txHash || '',
            category: TrackingCategory.WidgetEvent,
            action: TrackingAction.OnRouteExecutionUpdated,
            value: parseFloat(update.route.fromAmountUSD),
            data: {
              label: 'execution_update',
              [TrackingEventParameter.FromAmountUSD]:
                update.route.fromAmountUSD,
              [TrackingEventParameter.ToAmountUSD]: update.route.toAmountUSD,
              [TrackingEventParameter.FromAmount]: update.route.fromAmount,
              [TrackingEventParameter.ToAmount]: update.route.toAmount,
              [TrackingEventParameter.FromToken]:
                update.route.fromToken.address,
              [TrackingEventParameter.ToToken]: update.route.toToken.address,
              [TrackingEventParameter.FromChainId]: update.route.fromChainId,
              [TrackingEventParameter.ToChainId]: update.route.toChainId,
              [TrackingEventParameter.RouteId]: `${update.route.id}`,
              [TrackingEventParameter.Status]: update.process.status,
              [TrackingEventParameter.TxHash]: update.process.txHash || '',
              [TrackingEventParameter.TxLink]: update.process.txLink || '',
              [TrackingEventParameter.Type]: update.process.type,
              [TrackingEventParameter.GasCostUSD]: update.route.gasCostUSD,
              [TrackingEventParameter.ErrorCode]:
                update.process.error?.code || '',
              [TrackingEventParameter.ErrorMessage]:
                update.process.error?.message || '',
              [TrackingEventParameter.InsuranceFeeAmountUSD]:
                update.route.insurance.feeAmountUsd,
              [TrackingEventParameter.InsuranceState]:
                update.route.insurance?.state,
              nonInteraction: true,
            },
          });
        }
      }
    };
    const onRouteExecutionCompleted = async (route: Route) => {
      if (!!route.id) {
        trackEvent({
          category: TrackingCategory.WidgetEvent,
          action: TrackingAction.OnRouteExecutionCompleted,
          label: 'execution_success',
          value: parseFloat(route.fromAmountUSD),
          data: {
            [TrackingEventParameter.RouteId]: route.id,
            [TrackingEventParameter.FromChainId]: route.fromChainId,
            [TrackingEventParameter.FromAmountUSD]: route.fromAmountUSD,
            [TrackingEventParameter.FromAmount]: route.fromAmount,
            [TrackingEventParameter.FromToken]: route.fromToken.address,
            [TrackingEventParameter.ToChainId]: route.toChainId,
            [TrackingEventParameter.ToAmountUSD]: route.toAmountUSD,
            [TrackingEventParameter.ToAmount]: route.toAmount,
            [TrackingEventParameter.ToAmountMin]: route.toAmountMin,
            [TrackingEventParameter.ToToken]: route.toToken.address,
          },
        });
      }
    };
    const onRouteExecutionFailed = async (update: RouteExecutionUpdate) => {
      trackEvent({
        category: TrackingCategory.WidgetEvent,
        action: TrackingAction.OnRouteExecutionFailed,
        label: 'execution_error',
        data: {
          [TrackingEventParameter.RouteId]: update.route.id,
          [TrackingEventParameter.TxHash]: update.process.txHash,
          [TrackingEventParameter.Status]: update.process.status,
          [TrackingEventParameter.Message]: update.process.message || '',
          [TrackingEventParameter.ErrorMessage]:
            update.process.error?.message || '',
          [TrackingEventParameter.ErrorCode]: update.process.error?.code || '',
        },
      });
    };

    const onRouteHighValueLoss = (update: RouteHighValueLossUpdate) => {
      trackEvent({
        action: TrackingAction.OnRouteHighValueLoss,
        category: TrackingCategory.WidgetEvent,
        label: 'click_high_value_loss_accepted',
        data: {
          [TrackingEventParameter.FromAmountUSD]: update.fromAmountUsd,
          [TrackingEventParameter.ToAmountUSD]: update.toAmountUSD,
          [TrackingEventParameter.GasCostUSD]: update.gasCostUSD,
          [TrackingEventParameter.ValueLoss]: update.valueLoss,
          [TrackingEventParameter.Timestamp]: Date.now(),
        },
      });
    };

    const onRouteContactSupport = (supportId: RouteContactSupport) => {
      onOpenSupportModal(true);
    };

    const handleMultisigChainTokenSelected = (
      destinationData: ChainTokenSelected,
    ) => {
      onDestinationChainSelected(destinationData.chainId);
    };

    widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    widgetEvents.on(
      WidgetEvent.RouteExecutionCompleted,
      onRouteExecutionCompleted,
    );
    widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);
    widgetEvents.on(WidgetEvent.RouteHighValueLoss, onRouteHighValueLoss);
    widgetEvents.on(WidgetEvent.RouteContactSupport, onRouteContactSupport);
    widgetEvents.on(
      WidgetEvent.DestinationChainTokenSelected,
      handleMultisigChainTokenSelected,
    );

    return () => widgetEvents.all.clear();
  }, [
    activeTab,
    onDestinationChainSelected,
    onOpenSupportModal,
    shouldOpenMultisigSignatureModal,
    trackEvent,
    trackTransaction,
    widgetEvents,
  ]);

  const handleMultiSigConfirmationModalClose = () => {
    setIsMultiSigConfirmationModalOpen(false);
  };

  const handleMultisigWalletConnectedModalClose = () => {
    setIsMultisigConnectedAlertOpen(false);
  };

  useEffect(() => {
    setIsMultisigConnectedAlertOpen(isMultisigSigner);
    // prevent endless loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.address]);

  return (
    <>
      <MultisigConnectedAlert
        open={isMultisigConnectedAlertOpen}
        onClose={handleMultisigWalletConnectedModalClose}
      />
      <MultisigConfirmationModal
        open={isMultiSigConfirmationModalOpen}
        onClose={handleMultiSigConfirmationModalClose}
      />
    </>
  );
}
