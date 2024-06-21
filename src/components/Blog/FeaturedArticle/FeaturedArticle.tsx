'use client';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Tag } from '@/components/Tag.style';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import { useSession } from '@/hooks/useSession';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import type { BlogArticleData } from '@/types/strapi';
import { formatDate } from '@/utils/formatDate';
import { readingTime } from '@/utils/readingTime';
import { JUMPER_LEARN_PATH } from 'src/const/urls';
import {
  FeaturedArticleContent,
  FeaturedArticleDetails,
  FeaturedArticleImage,
  FeaturedArticleLink,
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

  // testing! todo: remove
  const sessionID = useSession();
  console.log('sessionId', sessionID);

  const handleFeatureCardClick = (featuredArticle: BlogArticleData[]) => {
    trackEvent({
      category: TrackingCategory.BlogFeaturedArticle,
      label: 'click-featured-article',
      action: TrackingAction.ClickFeaturedArticle,
      data: { [TrackingEventParameter.ArticleID]: featuredArticle[0]?.id },
    });
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
      <FeaturedArticleLink
        href={`${JUMPER_LEARN_PATH}/${featuredArticle[0]?.attributes.Slug}`}
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
      </FeaturedArticleLink>
    </>
  ) : (
    <FeaturedArticleSkeleton />
  );
};
