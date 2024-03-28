import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  BlogArticlAuthorName,
  BlogArticlAuthorNameSkeleton,
  BlogArticlAuthorRole,
  BlogArticlAuthorRoleSkeleton,
  BlogArticleContainer,
  BlogArticleContentContainer,
  BlogArticleContentSkeleton,
  BlogArticleHeaderMeta,
  BlogArticleHeaderMetaDate,
  BlogArticleHeaderTagSkeleton,
  BlogArticleImage,
  BlogArticleImageContainer,
  BlogArticleMetaSkeleton,
  BlogArticleSubtitle,
  BlogArticleSubtitleSkeleton,
  BlogArticleTitle,
  BlogArticleTitleSkeleton,
  BlogArticleTopHeader,
  BlogAuthorAvatar,
  BlogAuthorAvatarSkeleton,
  BlogAuthorContainer,
  BlogAuthorMetaWrapper,
  BlogAuthorWrapper,
  BlogMetaContainer,
  Divider,
} from './BlogArticle.style';

import { ArticleJsonSchema } from '@/components/JsonSchema/JsonSchemaArticle';
import { Tag } from '@/components/Tag.style';
import type { AuthorData, StrapiImageData, TagData } from '@/types/strapi';
import { formatDate } from '@/utils/formatDate';
import { readingTime } from '@/utils/readingTime';
import type { RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';
import { CustomRichBlocks, ShareArticleIcons } from '..';

interface BlogArticleProps {
  title: string | undefined;
  subtitle: string | undefined;
  content: RootNode[] | undefined;
  tags: TagData | undefined;
  author: AuthorData | undefined;
  slug: string | undefined;
  publishedAt: string | null | undefined;
  updatedAt: string | null | undefined;
  createdAt: string | undefined;
  image: StrapiImageData | undefined;
  baseUrl: string | undefined;
  id?: number;
}

export const BlogArticle = ({
  title,
  subtitle,
  content,
  author,
  tags,
  id,
  publishedAt,
  updatedAt,
  createdAt,
  slug,
  image,
  baseUrl,
}: BlogArticleProps) => {
  const theme = useTheme();
  const minRead = readingTime(content);
  const { t } = useTranslation();

  return (
    <>
      <BlogArticleContainer>
        <BlogArticleTopHeader>
          {!!tags?.data[0]?.attributes.Title ? (
            <Tag
              color={tags.data[0]?.attributes.TextColor}
              backgroundColor={tags.data[0]?.attributes.BackgroundColor}
              component="span"
              variant="lifiBodyMediumStrong"
              key={`blog-article-tag-${tags.data[0]?.id}`}
            >
              {tags.data[0].attributes?.Title}
            </Tag>
          ) : (
            <BlogArticleHeaderTagSkeleton variant="rectangular" />
          )}
          {!!createdAt ? (
            <BlogArticleHeaderMeta>
              <BlogArticleHeaderMetaDate variant="lifiBodyXSmall" as="span">
                {formatDate(publishedAt || createdAt)}
              </BlogArticleHeaderMetaDate>
              <span>{t('blog.minRead', { minRead: minRead })}</span>
            </BlogArticleHeaderMeta>
          ) : (
            <BlogArticleMetaSkeleton variant="text" />
          )}
        </BlogArticleTopHeader>
        {title ? (
          <BlogArticleTitle as="h1">{title}</BlogArticleTitle>
        ) : (
          <BlogArticleTitleSkeleton />
        )}
        <BlogMetaContainer>
          <BlogAuthorContainer>
            {author?.data?.attributes?.Avatar.data?.attributes?.url ? (
              <BlogAuthorAvatar
                src={`${baseUrl}${author.data.attributes.Avatar.data.attributes.url}`}
                alt="author-avatar"
              />
            ) : (
              <BlogAuthorAvatarSkeleton variant="rounded" />
            )}
            {author?.data ? (
              <BlogArticlAuthorName
                variant="lifiBodyXSmallStrong"
                component="span"
              >
                {author.data?.attributes.Name}
              </BlogArticlAuthorName>
            ) : (
              <BlogArticlAuthorNameSkeleton variant="text" />
            )}
          </BlogAuthorContainer>
          <ShareArticleIcons title={title} slug={slug} />
        </BlogMetaContainer>
      </BlogArticleContainer>

      <BlogArticleImageContainer>
        {image?.data && (
          <BlogArticleImage
            src={`${baseUrl}${image.data.attributes?.url}`}
            alt={image?.data.attributes?.alternativeText}
          />
        )}
      </BlogArticleImageContainer>
      <BlogArticleContainer>
        <BlogArticleContentContainer>
          {subtitle ? (
            <BlogArticleSubtitle variant="lifiHeaderMedium" as="h4">
              {subtitle}
            </BlogArticleSubtitle>
          ) : (
            <BlogArticleSubtitleSkeleton variant="text" />
          )}
          {content ? (
            <CustomRichBlocks id={id} baseUrl={baseUrl} content={content} />
          ) : (
            <BlogArticleContentSkeleton variant="text" />
          )}
          <Divider />
          <BlogAuthorWrapper>
            {author?.data?.attributes?.Avatar.data?.attributes.url ? (
              <BlogAuthorAvatar
                src={`${baseUrl}${author.data.attributes.Avatar.data.attributes.url}`}
                alt="author-avatar"
              />
            ) : (
              <BlogAuthorAvatarSkeleton
                variant="rounded"
                sx={{
                  marginRight: theme.spacing(3),
                }}
              />
            )}
            <BlogAuthorMetaWrapper>
              {author?.data ? (
                <BlogArticlAuthorName component="span">
                  {author.data.attributes?.Name}
                </BlogArticlAuthorName>
              ) : (
                <BlogArticlAuthorNameSkeleton variant="text" />
              )}
              {author?.data ? (
                <BlogArticlAuthorRole variant="lifiBodyXSmall" component="span">
                  {author.data.attributes?.Role}
                </BlogArticlAuthorRole>
              ) : (
                <BlogArticlAuthorRoleSkeleton variant="text" />
              )}
            </BlogAuthorMetaWrapper>
          </BlogAuthorWrapper>
        </BlogArticleContentContainer>
      </BlogArticleContainer>
      {image?.data && publishedAt && author?.data && title && createdAt ? (
        <ArticleJsonSchema
          title={title}
          images={[`${baseUrl}${image.data.attributes?.url}`]}
          datePublished={publishedAt || createdAt}
          dateModified={updatedAt || createdAt}
          authorName={author.data.attributes?.Name}
        />
      ) : null}
    </>
  );
};
