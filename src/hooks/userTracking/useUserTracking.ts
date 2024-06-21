'use client';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useAccounts } from '@/hooks/useAccounts';
import type { TrackEventProps } from '@/types/userTracking';
import { EventTrackingTool } from '@/types/userTracking';
import { useCallback, useEffect } from 'react';

export function useUserTracking() {
  const { account } = useAccounts();

  useEffect(() => {
    if (account?.chainId) {
      typeof window !== 'undefined' &&
        window?.gtag('event', TrackingAction.SwitchChain, {
          category: TrackingCategory.Wallet,
          [TrackingEventParameter.SwitchedChain]: account?.chainId,
        });
    }
  }, [account, account?.chainId]);

  const trackEvent = useCallback(
    async ({
      action,
      category,
      label,
      data,
      disableTrackingTool,
      enableAddressable,
      isConversion,
    }: TrackEventProps) => {
      if (!disableTrackingTool?.includes(EventTrackingTool.GA)) {
        typeof window !== 'undefined' &&
          window?.gtag('event', action, {
            category: category,
            ...data,
          });
      }
      if (enableAddressable) {
        const dataArray = [];
        if (label) {
          dataArray.push({ name: 'label', value: label });
        }

        typeof window !== 'undefined' &&
          data &&
          window.__adrsbl.run(
            action,
            isConversion ?? false,
            dataArray.concat(
              Object.entries(data).map(([key, value]) => ({
                name: `${key}`,
                value: `${value}`,
              })),
            ),
          );
      }
    },
    [],
  );

  return {
    trackEvent,
  };
}
