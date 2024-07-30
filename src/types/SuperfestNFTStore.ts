import { type NFTInfo } from 'src/hooks/useCheckNFTAvailability';

export interface SuperfestNFTStoreProps {
  address?: string;
  claimInfo?: {
    [key: string]: NFTInfo;
  };
  timestamp: number;
}

export interface SuperfestNFTState extends SuperfestNFTStoreProps {
  setNFTCheckData: (
    address: string,
    claimInfo: {
      [key: string]: NFTInfo;
    },
    time: number,
  ) => void;
}
