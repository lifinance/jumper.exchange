'use server';
import Link from 'next/link';
import { getCookies } from 'src/app/lib/getCookies';
import { getPartnerThemes } from 'src/app/lib/getPartnerTheme';
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';
import { BackgroundFooterImage } from './Widgets/WidgetsContainer.style';

export const PartnerThemeFooterImage = async () => {
  const { activeUid, footerImageUrl, footerUrl } = usePartnerTheme();
  const { activeTheme, partnerThemeUid } = getCookies();
  const partnerThemes = partnerThemeUid
    ? await getPartnerThemes(partnerThemeUid)
    : undefined;

  let footerImg;
  let partnerUrl;

  if (partnerThemes) {
    footerImg =
      activeTheme === 'light'
        ? partnerThemes?.data[0].attributes.FooterImageLight.data.attributes.url
        : partnerThemes?.data[0].attributes.FooterImageDark.data.attributes.url;
    partnerUrl = partnerThemes?.data[0].attributes.PartnerURL;
  }

  return (
    footerImg &&
    partnerUrl && (
      <Link href={partnerUrl} target="_blank" style={{ zIndex: 1 }}>
        <BackgroundFooterImage
          alt="footer-image"
          src={footerImg}
          width={300}
          height={200}
        />
      </Link>
    )
  );
};
