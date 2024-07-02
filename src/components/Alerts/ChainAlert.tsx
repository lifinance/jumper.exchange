import { useChainTokenSelectionStore } from '@/stores/chainTokenSelection/ChainTokenSelectionStore';
import { ChainId } from '@lifi/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfoAlert } from '.';
import { InfoAlertClickable } from './InfoAlert/InfoAlertClickable';

export const ChainAlert = () => {
  const { t } = useTranslation();
  const { sourceChainToken, destinationChainToken } =
    useChainTokenSelectionStore();
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [buttonText, setButtontext] = useState<string>('');

  useEffect(() => {
    if (
      sourceChainToken?.chainId === ChainId.SEI ||
      destinationChainToken?.chainId === ChainId.SEI
    ) {
      setIsClickable(true);
      setChainId(ChainId.SEI);
      setTitle(t('seiAlert.title'));
      setSubtitle(t('seiAlert.subtitle'));
      setButtontext(t('seiAlert.buttonText'));
    } else if (
      sourceChainToken?.chainId === ChainId.SOL ||
      destinationChainToken?.chainId === ChainId.SOL
    ) {
      setChainId(ChainId.SOL);
      setTitle(t('solanaAlert.title'));
      setSubtitle(t('solanaAlert.subtitle'));
    } else {
      setIsClickable(false);
      setChainId(0);
    }
  }, [destinationChainToken, sourceChainToken, t]);

  return (
    <>
      {isClickable ? (
        <InfoAlertClickable
          active={chainId > 0}
          title={title}
          subtitle={subtitle}
          buttonText={buttonText}
        />
      ) : (
        <InfoAlert active={chainId > 0} title={title} subtitle={subtitle} />
      )}
    </>
  );
};
