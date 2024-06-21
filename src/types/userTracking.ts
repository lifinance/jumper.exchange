export enum EventTrackingTool {
  GA,
}

export interface InitTrackingProps {
  disableTrackingTool?: EventTrackingTool[];
}

export interface TrackEventProps {
  action: string;
  category: string;
  label: string;
  value?: number;
  data?: { [key: string]: string | number | boolean };
  disableTrackingTool?: EventTrackingTool[];
  enableAddressable?: boolean;
  isConversion?: boolean;
}

// type destinations =
//   | 'discord-lifi'
//   | 'lifi-explorer'
//   | 'lifi-website'
//   | 'docs-sc-audits'
//   | 'lifi-github'
//   | 'lifi-docs'
//   | 'x-jumper'
//   | 'blokchain-explorer';

// type source = TrackingCategory;
