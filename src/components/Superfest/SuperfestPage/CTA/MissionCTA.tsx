import { IconButtonPrimary } from '@/components/IconButton.style';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MissionCtaContainer, MissionCtaTitle } from './MissionCTA.style';

interface MissionCtaProps {
  title?: string;
  url?: string;
  id?: number;
}

export const MissionCTA = ({ title, url, id }: MissionCtaProps) => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const handleClick = () => {
    // trackEvent({
    //   category: TrackingCategory.BlogArticle,
    //   //   action: TrackingAction.ClickMissionCta,
    //   label: 'click-blog-cta',
    //   disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    //   data: {
    //     [TrackingEventParameter.ArticleTitle]: title || '',
    //     [TrackingEventParameter.ArticleID]: id || '',
    //   },
    // });
  };
  return (
    <Link
      style={{ textDecoration: 'none', width: '80%' }}
      href={url || '/'}
      target="_blank"
    >
      <MissionCtaContainer onClick={handleClick}>
        <MissionCtaTitle>{title ?? t('blog.jumperCta')}</MissionCtaTitle>
        <IconButtonPrimary onClick={handleClick}>
          <ArrowForwardIcon
            sx={{
              width: '28px',
              height: '28px',
            }}
          />
        </IconButtonPrimary>
      </MissionCtaContainer>
    </Link>
  );
};
