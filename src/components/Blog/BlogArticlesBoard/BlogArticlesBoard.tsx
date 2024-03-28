import type { TabProps } from '@/components/Tabs';
import { urbanist } from '@/fonts/fonts';
import type { BlogArticleData, TagAttributes } from '@/types/strapi';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { Breakpoint, Theme } from '@mui/material';
import {
  Fade,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlogArticlesBoardContainer } from './BlogArticlesBoard.style';
import { BlogArticlesBoardTabs } from './BlogArticlesBoardTabs';

interface BlogArticlesBoardProps {
  data: BlogArticleData[];
  tags: TagAttributes[];
  url: string;
}

const pageSize = 6;
export const BlogArticlesBoard = ({
  data,
  url,
  tags,
}: BlogArticlesBoardProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [catLabel, setCatLabel] = useState<string | undefined>(
    t('blog.allCategories'),
  );
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [page, setPage] = useState<number>(1);
  const handleTagsClick = useCallback(
    (id: number, label?: string) => () => {
      if (!isDesktop && !openDropdown) {
        setOpenDropdown(true);
      } else {
        setOpenDropdown(false);
      }
      setCategoryId(id);
      setCatLabel(label);
    },
    [isDesktop, openDropdown],
  );

  const filteredTags = useMemo<TabProps[]>(() => {
    // default "All" Category
    const defaultFilter = {
      id: 0,
      label:
        !isDesktop && categoryId !== 0 ? catLabel : t('blog.allCategories'),
      icon: !isDesktop && (
        <ArrowDropDownIcon
          sx={{
            position: 'absolute',
            right: theme.spacing(1),
            marginBottom: 0,
          }}
        />
      ),
      attributes: [],
      value: 0,
      onClick: handleTagsClick(0, t('blog.allCategories')),
      disabled: false,
    };
    // tags
    const output = tags?.map((el, index: number) => {
      return {
        label: el.attributes.Title || undefined, //el.attributes.Title,
        value: el.id,
        onClick: handleTagsClick(el.id, el.attributes.Title),
        // disabled: false,
      };
    });
    // merge default + tags
    output?.unshift(defaultFilter);
    return output;
  }, [categoryId, catLabel, handleTagsClick, isDesktop, t, tags, theme]);

  return (
    <BlogArticlesBoardContainer id="see-all">
      <Typography
        variant="lifiHeaderMedium"
        sx={{
          fontFamily: urbanist.style.fontFamily,
          textAlign: 'center',
          margin: theme.spacing(10, 'auto', 0),
        }}
      >
        {t('blog.categories')}
      </Typography>
      {filteredTags ? (
        <BlogArticlesBoardTabs
          openDropdown={openDropdown}
          filteredTags={filteredTags}
          categoryId={categoryId}
        />
      ) : (
        <Skeleton sx={{ width: '100%', height: 68 }} />
      )}
      <Fade in={!!data} timeout={600}>
        <></>
        {/* todo: enable */}
        {/* <ArticlesGrid container>
          {!!data ? (
            Array.from({ length: pageSize }).map((_, index) => (
              <BlogArticleCardSkeleton
                key={`blog-article-card-skeleton-${categoryId}-${index}`}
              />
            ))
          ) : data?.length > 0 ? (
            data?.map((article: BlogArticleData, index: number) => (
              <BlogArticleCard
                baseUrl={url}
                id={article.id}
                key={`blog-articles-board-${categoryId}-${index}`}
                image={article.attributes.Image}
                title={article.attributes.Title}
                slug={article.attributes.Slug}
                trackingCategory={TrackingCategory.BlogArticlesBoard}
                content={article.attributes.Content}
                publishedAt={article.attributes.publishedAt}
                createdAt={article.attributes.createdAt}
                tags={article.attributes.tags}
              />
            ))
          ) : (
            <p>No Content</p> //todo: find better option
          )}
        </ArticlesGrid> */}
      </Fade>
      {/* todo: enable pagination*/}
      {/* {meta?.pagination.pageCount > 1 ? (
        <Pagination
          isSuccess={(!isFetching || !isRefetching) && isSuccess}
          isEmpty={meta?.pagination.pageCount < 1}
          page={page}
          setPage={setPage}
          meta={meta}
          categoryId={categoryId}
        />
      ) : null} */}
    </BlogArticlesBoardContainer>
  );
};
