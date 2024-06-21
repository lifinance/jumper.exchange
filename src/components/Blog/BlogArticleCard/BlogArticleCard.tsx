import { TrackingAction, TrackingEventParameter } from '@/const/trackingKeys';
import { JUMPER_LEARN_PATH } from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu/MenuStore';
import type { StrapiImageData, TagData } from '@/types/strapi';
import { formatDate } from '@/utils/formatDate';
import { readingTime } from '@/utils/readingTime';
import type { CSSObject } from '@mui/material';
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import type { RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';
import { useTranslation } from 'react-i18next';
import {
  BlogArticleCardContainer,
  BlogArticleCardContent,
  BlogArticleCardDetails,
  BlogArticleCardImage,
  BlogArticleCardMetaContainer,
  BlogArticleCardTag,
  BlogArticleCardTitle,
  BlogArticleMetaDate,
  BlogArticleMetaReadingTime,
} from '.';

interface BlogArticleCardProps {
  baseUrl: string;
  id: number;
  image: StrapiImageData;
  content: RootNode[];
  publishedAt: string | null | undefined;
  createdAt: string;
  title: string;
  tags: TagData | undefined;
  trackingCategory: string;
  slug: string;
  styles?: CSSObject;
}

export const BlogArticleCard = ({
  baseUrl,
  trackingCategory,
  image,
  tags,
  content,
  publishedAt,
  createdAt,
  id,
  title,
  styles,
  slug,
}: BlogArticleCardProps) => {
  const { trackEvent } = useUserTracking();
  const minRead = readingTime(content);
  const { t } = useTranslation();
  const { closeAllMenus } = useMenuStore((state) => state);

  const handleClick = () => {
    trackEvent({
      category: trackingCategory,
      action: TrackingAction.ClickArticleCard,
      label: 'click-blog-article-card',
      data: {
        [TrackingEventParameter.ArticleTitle]: title,
        [TrackingEventParameter.ArticleCardId]: id,
      },
    });
    closeAllMenus();
  };
  return (
    <Link
      href={`${JUMPER_LEARN_PATH}/${slug}`}
      style={{ textDecoration: 'none' }}
    >
      <BlogArticleCardContainer
        variant="outlined"
        onClick={handleClick}
        sx={styles}
      >
        {image.data ? (
          <BlogArticleCardImage
            src={`${baseUrl}${image.data?.attributes?.formats.small.url}`}
            alt={image.data?.attributes?.alternativeText}
            draggable={false}
          />
        ) : (
          <Skeleton
            component="img"
            sx={{
              width: '100%',
              aspectRatio: 1.6,
              transform: 'unset',
              borderRadius: '16px',
            }}
          />
        )}

        <BlogArticleCardContent>
          <BlogArticleCardTitle variant="lifiBodyLarge">
            {title}
          </BlogArticleCardTitle>
          <BlogArticleCardDetails>
            {tags?.data.slice(0, 1).map((tag, index) => (
              <BlogArticleCardTag key={index} variant="lifiBodyXSmall" as="h3">
                {tag.attributes.Title}
              </BlogArticleCardTag>
            ))}
            <BlogArticleCardMetaContainer>
              <BlogArticleMetaDate variant="lifiBodyXSmall" as="span">
                {formatDate(publishedAt || createdAt)}
              </BlogArticleMetaDate>
              <BlogArticleMetaReadingTime variant="lifiBodyXSmall" as="span">
                {t('blog.minRead', { minRead: minRead })}
              </BlogArticleMetaReadingTime>
            </BlogArticleCardMetaContainer>
          </BlogArticleCardDetails>
        </BlogArticleCardContent>
      </BlogArticleCardContainer>
    </Link>
  );
};
