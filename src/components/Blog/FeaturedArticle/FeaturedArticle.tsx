'use client';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Tag } from '@/components/Tag.style';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { JUMPER_LEARN_PATH } from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import type { BlogArticleData } from '@/types/strapi';
import { EventTrackingTool } from '@/types/userTracking';
import { formatDate } from '@/utils/formatDate';
import { readingTime } from '@/utils/readingTime';
import { useRouter } from 'next/navigation';
import {
  FeaturedArticleContainer,
  FeaturedArticleContent,
  FeaturedArticleDetails,
  FeaturedArticleImage,
  FeaturedArticleMetaContainer,
  FeaturedArticleMetaDate,
  FeaturedArticleSkeleton,
  FeaturedArticleSubtitle,
  FeaturedArticleTitle,
} from '.';

interface FeaturedArticleProps {
  url: string | undefined;
  featuredArticle: BlogArticleData[] | undefined;
}

export const FeaturedArticle = ({
  featuredArticle,
  url,
}: FeaturedArticleProps) => {
  const { t } = useTranslation();
  const { trackEvent } = useUserTracking();
  const router = useRouter();

  const handleFeatureCardClick = (featuredArticle: BlogArticleData[]) => {
    trackEvent({
      category: TrackingCategory.BlogFeaturedArticle,
      label: 'click-featured-article',
      action: TrackingAction.ClickFeaturedArticle,
      data: { [TrackingEventParameter.ArticleID]: featuredArticle[0]?.id },
      disableTrackingTool: [EventTrackingTool.ARCx, EventTrackingTool.Cookie3],
    });
    router.push(`${JUMPER_LEARN_PATH}/${featuredArticle[0]?.attributes.Slug}`);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatedDate =
    featuredArticle &&
    formatDate(
      featuredArticle[0]?.attributes.publishedAt ||
        featuredArticle[0]?.attributes.createdAt,
    );

  const minRead =
    featuredArticle && readingTime(featuredArticle[0]?.attributes.Content);

  return featuredArticle && featuredArticle?.length > 0 ? (
    <>
      <FeaturedArticleContainer
        onClick={() => {
          handleFeatureCardClick(featuredArticle);
        }}
      >
        <FeaturedArticleImage
          src={`${url}${featuredArticle[0]?.attributes.Image.data.attributes.formats.medium.url}`}
          alt={
            featuredArticle[0].attributes.Image.data.attributes.alternativeText
          }
        />
        <FeaturedArticleContent>
          <FeaturedArticleDetails>
            {featuredArticle[0].attributes.tags.data
              .slice(0, 1)
              .map((el, index) => (
                <Tag
                  key={`blog-highlights-tag-${index}`}
                  variant="lifiBodyMediumStrong"
                >
                  {el.attributes.Title}
                </Tag>
              ))}
            <FeaturedArticleMetaContainer>
              <FeaturedArticleMetaDate
                variant="lifiBodyXSmall"
                component="span"
              >
                {formatedDate}
              </FeaturedArticleMetaDate>
              <Typography
                variant="lifiBodyXSmall"
                component="span"
                fontSize={'inherit'}
              >
                {t('blog.minRead', { minRead: minRead })}
              </Typography>
            </FeaturedArticleMetaContainer>
          </FeaturedArticleDetails>
          <Box>
            <FeaturedArticleTitle variant="lifiHeaderMedium" as="h2">
              {featuredArticle[0].attributes.Title}
            </FeaturedArticleTitle>
          </Box>
          <Box>
            <FeaturedArticleSubtitle>
              {featuredArticle[0].attributes.Subtitle}
            </FeaturedArticleSubtitle>
          </Box>
        </FeaturedArticleContent>
      </FeaturedArticleContainer>
    </>
  ) : (
    <FeaturedArticleSkeleton />
  );
};
