import { useArcxAnalytics } from '@arcxmoney/analytics';
import { useCallback } from 'react';
import { hotjar } from 'react-hotjar';
import { TrackingAction, TrackingEventParameter } from '../../const';
import { useWallet } from '../../providers/WalletProvider';
import {
  EventTrackingTool,
  TrackAttributeProps,
  TrackChainSwitchProps,
  TrackConnectWalletProps,
  TrackDisconnectWalletProps,
  TrackEventProps,
  TrackTransactionProps,
  trackPageloadProps,
} from '../../types';
import { useCookie3 } from '../useCookie3';

export function useUserTracking() {
  const arcx = useArcxAnalytics();
  const cookie3 = useCookie3();
  const { account } = useWallet();

  const trackConnectWallet = useCallback(
    /**
     * Track Wallet Connect with HJ and ARCx
     *
     */
    ({ disableTrackingTool, account, wallet }: TrackConnectWalletProps) => {
      if (account?.address && account?.chainId && wallet) {
        if (!disableTrackingTool?.includes(EventTrackingTool.ARCx)) {
          arcx?.wallet({
            account: `${account.address}`,
            chainId: `${account.chainId}`,
          });
        }
        if (!disableTrackingTool?.includes(EventTrackingTool.Hotjar)) {
          hotjar.identify(account.address, {
            [TrackingEventParameter.Wallet]: wallet.name,
          });
          hotjar.initialized() && hotjar.event(TrackingAction.ConnectWallet);
        }
      }
    },
    [arcx],
  );

  const trackAttribute = useCallback(
    /**
     * Track Attributes with GA, HJ and ARCx
     *
     */
    async ({ data, disableTrackingTool }: TrackAttributeProps) => {
      if (
        !!account.address &&
        data &&
        !disableTrackingTool?.includes(EventTrackingTool.Hotjar)
      ) {
        hotjar.initialized() &&
          hotjar.identify(account.address, {
            ...data,
          });
      }
      if (data && !disableTrackingTool?.includes(EventTrackingTool.GA)) {
        data && window.gtag('set', 'user_properties', data);
      }
    },
    [account.address],
  );

  const trackDisconnectWallet = useCallback(
    ({ account, data, disableTrackingTool }: TrackDisconnectWalletProps) => {
      if (
        account?.address &&
        !disableTrackingTool?.includes(EventTrackingTool.Hotjar)
      ) {
        hotjar.identify(account.address, {
          ...data,
        });
        hotjar.initialized() && hotjar.event(TrackingAction.DisconnectWallet);
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.GA)) {
        window.gtag('event', TrackingAction.DisconnectWallet, {
          ...data,
        });
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.ARCx)) {
        arcx?.disconnection({
          account: `${account?.address}`, // optional(string) - The account that got disconnected
          chainId: `${account?.chainId}`, // optional(string | number) - The chain ID from which the wallet disconnected
        });
      }
    },
    [arcx],
  );

  const trackEvent = useCallback(
    async ({
      action,
      category,
      label,
      value,
      data,
      disableTrackingTool,
    }: TrackEventProps) => {
      if (!disableTrackingTool?.includes(EventTrackingTool.Hotjar)) {
        hotjar.initialized() &&
          hotjar.event(`${action}-${category}-${label ?? '-' + label}`);
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.GA)) {
        window.gtag('event', action, {
          category: category,
          ...data,
        });
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.ARCx)) {
        arcx?.event(action, {
          category: category,
          ...data,
        });
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.Cookie3)) {
        cookie3?.trackEvent({
          category,
          action,
          name: label,
          value,
        });
      }
    },
    [arcx, cookie3],
  );

  const trackPageload = useCallback(
    /**
     * Track PageLoad with GA, HJ and ARCx
     *
     */
    async ({
      destination,
      source,
      data,
      pageload, // requires page load? -> true
      disableTrackingTool,
      url,
    }: trackPageloadProps) => {
      if (!disableTrackingTool?.includes(EventTrackingTool.Hotjar)) {
        hotjar.initialized() && pageload
          ? hotjar.stateChange(url)
          : hotjar.event(`pageload${destination && '-' + destination}`);
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.GA)) {
        window.gtag('event', TrackingAction.PageLoad, {
          category: pageload ? 'external' : 'internal',
          url,
          source,
          destination,
          ...data,
        });
      }
    },
    [],
  );

  const trackTransaction = useCallback(
    /**
     * Track Transaction with GA, HJ and ARCx
     *
     */
    async ({
      action,
      category,
      chain,
      value,
      data,
      disableTrackingTool,
      txhash,
    }: TrackTransactionProps) => {
      if (!disableTrackingTool?.includes(EventTrackingTool.Hotjar)) {
        hotjar.initialized() && hotjar.event(`${category}-${action}`);
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.GA)) {
        window.gtag('event', action, {
          category,
          ...data,
        });
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.ARCx)) {
        arcx?.transaction({
          chainId: chain,
          transactionHash: txhash,
          metadata: { ...data, category, action }, // optional(object) - additional information about the transaction
        });
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.Cookie3)) {
        cookie3?.trackEvent({
          category,
          action,
          name: 'transaction',
          value: value,
        });
      }
    },
    [arcx, cookie3],
  );

  const trackChainSwitch = useCallback(
    async ({
      account,
      disableTrackingTool,
      action,
      category,
      data,
    }: TrackChainSwitchProps) => {
      if (!disableTrackingTool?.includes(EventTrackingTool.ARCx)) {
        arcx?.chain({
          account: `${account?.address}`,
          chainId: `${account?.chainId}`,
        });
      }
      if (!disableTrackingTool?.includes(EventTrackingTool.GA)) {
        window.gtag('event', action, {
          category: category,
          ...data,
        });
      }
    },
    [arcx],
  );

  return {
    trackAttribute,
    trackDisconnectWallet,
    trackConnectWallet,
    trackEvent,
    trackPageload,
    trackTransaction,
    trackChainSwitch,
  };
}
