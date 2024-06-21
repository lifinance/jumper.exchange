import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { openInNewTab } from '@/utils/openInNewTab';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { FB_SHARE_URL, LINKEDIN_SHARE_URL, X_SHARE_URL } from '@/const/urls';
import { ShareArticleIcon } from './ShareArticleIcon';
import {
  ShareIconsContainer,
  ShareIconsSkeletons,
} from './ShareArticleIcons.style';

interface ShareIconsProps {
  title?: string;
  slug?: string;
}

export const ShareArticleIcons = ({ title, slug }: ShareIconsProps) => {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();

  const { trackEvent } = useUserTracking();
  const isComponentMounted = useRef(false);
  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      isComponentMounted.current = false;
    };
  }, []);
  const handleShareClick = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`,
    );
    setShowCopyMessage(true);
    trackEvent({
      category: TrackingCategory.BlogArticle,
      action: TrackingAction.ClickShareArticleLink,
      label: 'click-share-blog-article-link',
      data: {
        [TrackingEventParameter.ArticleTitle]: title || '',
        [TrackingEventParameter.ArticleCardId]: slug || '',
      },
    });

    // Hide the copy message after 3 seconds
    setTimeout(() => {
      if (isComponentMounted.current) {
        setShowCopyMessage(false);
      }
    }, 3000);
  };

  const handleXClick = () => {
    if (!title) {
      return;
    }
    const xUrl = new URL(X_SHARE_URL);
    xUrl.searchParams.set(
      'url',
      `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`,
    );
    xUrl.searchParams.set('title', title);
    trackEvent({
      category: TrackingCategory.BlogArticle,
      action: TrackingAction.ClickShareArticleX,
      label: 'click-share-blog-article-x',
      data: {
        [TrackingEventParameter.ArticleTitle]: title || '',
        [TrackingEventParameter.ArticleCardId]: slug || '',
      },
    });
    openInNewTab(xUrl.href);
  };

  const handleFbClick = () => {
    if (!title) {
      return;
    }
    const fbUrl = new URL(FB_SHARE_URL);
    fbUrl.searchParams.set(
      'u',
      `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`,
    );
    fbUrl.searchParams.set('title', title);
    trackEvent({
      category: TrackingCategory.BlogArticle,
      action: TrackingAction.ClickShareArticleFB,
      label: 'click-share-blog-article-fb',
      data: {
        [TrackingEventParameter.ArticleTitle]: title || '',
        [TrackingEventParameter.ArticleCardId]: slug || '',
      },
    });
    openInNewTab(fbUrl.href);
  };

  const handleLinkedInClick = () => {
    if (!title) {
      return;
    }
    const linkedInUrl = new URL(LINKEDIN_SHARE_URL);
    linkedInUrl.searchParams.set('mini', 'true');
    linkedInUrl.searchParams.set(
      'url',
      `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`,
    );
    linkedInUrl.searchParams.set('title', title);
    trackEvent({
      category: TrackingCategory.BlogArticle,
      action: TrackingAction.ClickShareArticleLinkedIn,
      label: 'click-share-blog-article-linkedin',
      data: {
        [TrackingEventParameter.ArticleTitle]: title || '',
        [TrackingEventParameter.ArticleCardId]: slug || '',
      },
    });
    openInNewTab(linkedInUrl.href);
  };
  return title ? (
    <ShareIconsContainer>
      <ShareArticleIcon
        handleShare={handleLinkedInClick}
        tooltipMsg={t('blog.shareLinkedIn')}
        icon={<LinkedInIcon sx={{ width: '28px' }} />}
      />
      <ShareArticleIcon
        handleShare={handleFbClick}
        tooltipMsg={t('blog.shareFb')}
        icon={<FacebookIcon sx={{ width: '28px' }} />}
      />
      <ShareArticleIcon
        handleShare={handleXClick}
        tooltipMsg={t('blog.shareX')}
        icon={<XIcon sx={{ width: '28px' }} />}
      />
      <ShareArticleIcon
        handleShare={handleShareClick}
        tooltipMsg={t('blog.shareLink')}
        icon={
          <LinkIcon
            sx={{
              width: '28px',
              ...(showCopyMessage ? { marginLeft: '2px' } : { marginLeft: 0 }),
            }}
          />
        }
        showMsgActive={showCopyMessage}
        showMsg={t('blog.copiedLink')}
      />
    </ShareIconsContainer>
  ) : (
    <ShareIconsSkeletons
      variant="rectangular"
      sx={{ width: '228px', height: '48px' }}
    />
  );
};
