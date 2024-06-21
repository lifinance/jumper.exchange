'use client';
import { TrackingAction, TrackingCategory } from '@/const/trackingKeys';
import { JUMPER_LEARN_PATH } from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import type { BlogArticleData, StrapiResponseData } from '@/types/strapi';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CarouselContainer } from '.';
import { BlogArticleCard } from '../BlogArticleCard/BlogArticleCard';
import { BlogArticleCardSkeleton } from '../BlogArticleCard/BlogArticleCardSkeleton';
import {
  BlogCarouselContainer,
  SeeAllButton,
  SeeAllButtonContainer,
} from './BlogCarousel.style';

interface BlogCarouselProps {
  showAllButton?: boolean;
  url: string;
  title?: string;
  data: StrapiResponseData<BlogArticleData> | undefined;
}

export const BlogCarousel = ({
  data,
  url,
  title,
  showAllButton,
}: BlogCarouselProps) => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();

  const handleShowAll = () => {
    trackEvent({
      category: TrackingCategory.BlogCarousel,
      action: TrackingAction.SeeAllPosts,
      label: 'click-see-all-posts',
    });
  };

  return (
    <BlogCarouselContainer>
      <CarouselContainer
        title={title}
        trackingCategory={TrackingCategory.BlogCarousel}
      >
        {data ? (
          data.map((article, index) => (
            <BlogArticleCard
              id={article.id}
              baseUrl={url}
              key={`blog-article-card-${article.id}-${index}`}
              trackingCategory={TrackingCategory.BlogCarousel}
              image={article.attributes.Image}
              title={article.attributes.Title}
              slug={article.attributes.Slug}
              content={article.attributes.Content}
              publishedAt={article.attributes.publishedAt}
              createdAt={article.attributes.createdAt}
              tags={article.attributes.tags}
            />
          ))
        ) : (
          <>
            <BlogArticleCardSkeleton />
            <BlogArticleCardSkeleton />
            <BlogArticleCardSkeleton />
            <BlogArticleCardSkeleton />
          </>
        )}
      </CarouselContainer>
      {showAllButton ? (
        <SeeAllButtonContainer show={!!data?.length}>
          <Link href={JUMPER_LEARN_PATH} style={{ color: 'inherit' }}>
            <SeeAllButton onClick={handleShowAll}>
              {t('blog.seeAllPosts')}
            </SeeAllButton>
          </Link>
        </SeeAllButtonContainer>
      ) : null}
    </BlogCarouselContainer>
  );
};
