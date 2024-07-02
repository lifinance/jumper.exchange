import { ChainId } from '@lifi/sdk';
import Link from 'next/link';
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';
import { useChainTokenSelectionStore } from 'src/stores/chainTokenSelection';
import { BackgroundFooterImage } from './Widgets/WidgetsContainer.style';

export const PartnerThemeFooterImage = () => {
  const { activeUid, footerImageUrl, footerUrl } = usePartnerTheme();
  const { sourceChainToken, destinationChainToken } =
    useChainTokenSelectionStore();

  const activeChainAlert =
    sourceChainToken?.chainId === ChainId.SEI ||
    destinationChainToken?.chainId === ChainId.SEI ||
    sourceChainToken?.chainId === ChainId.SOL ||
    destinationChainToken?.chainId === ChainId.SOL;

  return (
    !activeChainAlert &&
    activeUid &&
    footerUrl &&
    footerImageUrl &&
    !footerImageUrl?.href.includes('undefined') && (
      <Link href={footerUrl} target="_blank" style={{ zIndex: 1 }}>
        <BackgroundFooterImage
          alt="footer-image"
          src={footerImageUrl.href}
          width={300}
          height={200}
        />
      </Link>
    )
  );
};
