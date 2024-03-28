import { useChainTokenSelectionStore } from '@/stores/chainTokenSelection/ChainTokenSelectionStore';
import { ChainId } from '@lifi/types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoAlert } from '.';

export const SolanaAlert = () => {
  const { t } = useTranslation();
  const { sourceChainToken, destinationChainToken } =
    useChainTokenSelectionStore();

  const solanaSelected = useMemo(() => {
    const isSelected =
      sourceChainToken?.chainId === ChainId.SOL ||
      destinationChainToken?.chainId === ChainId.SOL;
    return isSelected;
  }, [destinationChainToken, sourceChainToken]);

  return (
    <InfoAlert
      active={solanaSelected}
      title={t('solanaAlert.title')}
      subtitle={t('solanaAlert.subtitle')}
    />
  );
};
