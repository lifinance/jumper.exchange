import { ChainID } from '@arcxmoney/analytics';
import { WalletAccount } from '@transferto/shared/src/types';
import { TrackingCategory } from '../const';
import { Wallet } from '@lifi/wallet-management';

export enum EventTrackingTool {
  ARCx,
  GA,
  Hotjar,
  Cookie3,
}

export interface InitTrackingProps {
  disableTrackingTool?: EventTrackingTool[];
}

export interface TrackEventProps {
  action: string;
  category: string;
  label: string;
  value?: number;
  data?: { [key: string]: string | number | boolean | any };
  disableTrackingTool?: EventTrackingTool[];
}

export interface TrackTransactionProps {
  action: string;
  category: string;
  chain: ChainID;
  value?: number;
  disableTrackingTool?: EventTrackingTool[];
  data: Record<string, unknown>;
  txhash: string;
}
export interface TrackChainSwitchProps {
  account?: WalletAccount;
  disableTrackingTool?: EventTrackingTool[];
  action: string;
  category?: string;
  label?: string;
  value?: number;
  data?: { [key: string]: string | number | boolean | any };
}

type destinations =
  | 'discord-lifi'
  | 'lifi-explorer'
  | 'lifi-website'
  | 'docs-sc-audits'
  | 'lifi-github'
  | 'lifi-docs'
  | 'twitter-jumper'
  | 'blokchain-explorer';

type source = TrackingCategory;

export interface trackPageloadProps {
  destination: destinations;
  source: source;
  data?: { [key: string]: string | number | boolean };
  pageload: boolean;
  disableTrackingTool?: EventTrackingTool[];
  url: string;
}

export interface TrackConnectWalletProps {
  account?: WalletAccount;
  data?: { [key: string]: string | number | boolean };
  disableTrackingTool?: EventTrackingTool[];
  wallet?: Wallet;
  disconnect?: boolean;
}

export interface TrackDisconnectWalletProps {
  account?: WalletAccount;
  data?: { [key: string]: string | number | boolean };
  disableTrackingTool?: EventTrackingTool[];
}
export interface TrackAttributeProps {
  data?: { [key: string]: string | number | boolean };
  disableTrackingTool?: EventTrackingTool[];
}
