import { IconButtonPrimary } from '@/components/IconButton.style';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { BlogCtaContainer, BlogCtaTitle } from '.';

interface BlogCTAProps {
  title?: string;
  url?: string;
  id?: number;
}

export const BlogCTA = ({ title, url, id }: BlogCTAProps) => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const handleClick = () => {
    trackEvent({
      category: TrackingCategory.BlogArticle,
      action: TrackingAction.ClickBlogCTA,
      label: 'click-blog-cta',
      data: {
        [TrackingEventParameter.ArticleTitle]: title || '',
        [TrackingEventParameter.ArticleID]: id || '',
      },
    });
  };
  return (
    <Link style={{ textDecoration: 'none' }} href={url || '/'}>
      <BlogCtaContainer onClick={handleClick}>
        <BlogCtaTitle>{title ?? t('blog.jumperCta')}</BlogCtaTitle>
        <IconButtonPrimary onClick={handleClick}>
          <ArrowForwardIcon sx={{ width: '28px', height: '28px' }} />
        </IconButtonPrimary>
      </BlogCtaContainer>
    </Link>
  );
};
