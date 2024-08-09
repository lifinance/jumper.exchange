'use client';
import { usePathname } from 'next/navigation';
import {
  JUMPER_ANALYTICS_EVENT,
  JUMPER_ANALYTICS_TRANSACTION,
} from 'src/const/urls';
import { useFingerprint } from './useFingerprint';
interface JumperDataTrackEventProps {
  category: string;
  action: string;
  label: string;
  value?: number;
  data?: { [key: string]: string | number | boolean };
  isConnected?: boolean;
  walletAddress?: string;
  browserFingerprint?: string;
  isMobile: boolean;
  sessionId?: string;
}

const track = async (data: object, type: 'event' | 'transaction' = 'event') => {
  let result;
  await fetch(
    `${process.env.NEXT_PUBLIC_JUMPER_API}${type !== 'event' ? JUMPER_ANALYTICS_TRANSACTION : JUMPER_ANALYTICS_EVENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
  return result;
};

export interface JumperDataTrackTransactionProps {
  sessionId?: string;
  wallet?: string;
  type?: string;
  transactionHash?: string;
  transactionStatus?: string;
  fromChainId?: number;
  toChainId?: number;
  fromToken?: string;
  toToken?: string;
  exchange?: string;
  stepNumber?: number;
  isFinal: boolean;
  integrator: string;
  gasCost?: string;
  gasCostUSD?: string;
  fromAmount?: string;
  fromAmountUSD?: string;
  toAmount?: string;
  toAmountUSD?: string;
  routeId: string;
  errorCode?: string | number;
  errorMessage?: string;
}

export const useJumperTracking = () => {
  const pathname = usePathname();
  const fp = useFingerprint();
  console.log('fp jumper-tracking', fp);
  const trackEvent = async (data: JumperDataTrackEventProps) => {
    console.log('TRACK EVENT', data);
    await track(
      {
        category: data.category,
        action: data.action,
        label: data.label,
        value: data.value,
        sessionId: data.sessionId,
        data: data.data,
        walletAddress: data.walletAddress,
        browserFingerprint: 'test fingerprint',
        isMobile: false,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`,
      },
      'event',
    );
  };

  const trackTransaction = async (data: JumperDataTrackTransactionProps) => {
    const transactionData = {
      walletAddress: data.wallet,
      sessionId: data.sessionId,
      integrator: data.integrator,
      type: data.type,
      fromChain: data.fromChainId,
      toChain: data.toChainId,
      fromToken: data.fromToken,
      toToken: data.toToken,
      exchange: data.exchange,
      stepNumber: data.stepNumber,
      isFinal: data.isFinal,
      gasCost: data.gasCost,
      gasCostUSD: data.gasCostUSD,
      fromAmount: data.fromAmount,
      browserFingerprint: 'test fingerprint',
      toAmount: data.toAmount,
      transactionHash: data.transactionHash,
      transactionStatus: data.transactionStatus,
    };
    console.log('TRACK TRANSACTION DATA', transactionData);
    await track(transactionData, 'transaction');
  };

  return { trackTransaction, trackEvent };
};
