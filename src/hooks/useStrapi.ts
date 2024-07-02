import {
  STRAPI_BLOG_ARTICLES,
  STRAPI_FAQ_ITEMS,
  STRAPI_FEATURE_CARDS,
  STRAPI_JUMPER_USERS,
  STRAPI_PARTNER_THEMES,
} from '@/const/strapiContentKeys';
import type { StrapiMeta, StrapiResponseData } from '@/types/strapi';
import { useQuery } from '@tanstack/react-query';
import type { Account } from './useAccounts';

export interface UseStrapiProps<T> {
  data: StrapiResponseData<T>;
  meta: StrapiMeta;
  url: URL;
  isSuccess: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  isFetching: boolean;
}

interface PaginationProps {
  page: number;
  pageSize: number;
  withCount?: boolean;
}

interface filterPerrsonalFeatureCardsProps {
  enabled: boolean;
  account: Account | undefined;
}
interface ContentTypeProps {
  contentType:
    | 'feature-cards'
    | 'blog-articles'
    | 'faq-items'
    | 'tags'
    | 'partner-themes'
    | 'jumper-users';
  filterSlug?: string;
  filterUid?: string;
  filterTag?: (number | null | undefined)[] | null | undefined;
  filterFeaturedArticle?: boolean | undefined;
  filterPersonalFeatureCards?: filterPerrsonalFeatureCardsProps;
  sort?: 'desc' | 'asc';
  pagination?: PaginationProps;
  filterFeaturedFaq?: boolean;
  queryKey?: (string | number | undefined)[];
}

// Query passed Content-Type var from Strapi
export const useStrapi = <T>({
  contentType,
  filterSlug,
  filterUid,
  filterFeaturedArticle,
  filterPersonalFeatureCards,
  sort,
  filterTag,
  pagination,
  filterFeaturedFaq,
  queryKey,
}: ContentTypeProps): UseStrapiProps<T> => {
  // account needed to filter personalized feature cards

  const hasQueryKey = !!queryKey;
  const enableQuery =
    filterPersonalFeatureCards?.enabled &&
    hasQueryKey &&
    filterPersonalFeatureCards.account?.isConnected;

  // create url
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_STRAPI_DEVELOP === 'true'
      ? process.env.NEXT_PUBLIC_LOCAL_STRAPI_URL
      : process.env.NEXT_PUBLIC_STRAPI_URL;
  const apiUrl = new URL(`${apiBaseUrl}/${contentType}`);

  // pagination by page + pagesize + return meta object
  if (pagination) {
    apiUrl.searchParams.set('pagination[page]', `${pagination.page}`);
    apiUrl.searchParams.set('pagination[pageSize]', `${pagination.pageSize}`);
    apiUrl.searchParams.set(
      'pagination[withCount]',
      pagination.withCount === false ? 'false' : 'true',
    );
  }

  // sorting
  if (sort) {
    switch (sort) {
      case 'asc':
        apiUrl.searchParams.set('sort', 'createdAt:ASC');
        break;
      case 'desc':
        apiUrl.searchParams.set('sort', 'createdAt:DESC');
        break;
    }
  }

  // blog articles -->
  if (contentType === STRAPI_BLOG_ARTICLES) {
    // filter articles by slug
    if (filterSlug) {
      apiUrl.searchParams.set('filters[Slug][$eq]', filterSlug);
    }

    // filter articles by tag / category
    if (filterTag) {
      if (typeof filterTag === 'string') {
        apiUrl.searchParams.set('filters[tags][id][$eq]', `${filterTag}`);
      } else if (Array.isArray(filterTag)) {
        filterTag.forEach((el, index) => {
          apiUrl.searchParams.set(
            `filters[$and][0][$or][${index}][tags][id][$eq]`,
            `${el}`,
          );
        });
      }
    }

    // filter articles by "featured" boolean flag
    if (filterFeaturedArticle) {
      apiUrl.searchParams.set('filters[featured][$eq]', 'true');
    }

    // populate images and relations (tags + faq)
    if (contentType === STRAPI_BLOG_ARTICLES) {
      apiUrl.searchParams.set('populate[0]', 'Image');
      apiUrl.searchParams.set('populate[1]', 'tags');
      apiUrl.searchParams.set('populate[2]', 'author.Avatar');
      apiUrl.searchParams.set('populate[3]', 'faq_items');
    }
  }

  // faq items -->
  if (contentType === STRAPI_FAQ_ITEMS) {
    apiUrl.searchParams.set('populate[0]', 'faqItems');
    // filter FAQ by boolean flag "displayOnBlogPage"
    if (filterFeaturedFaq) {
      apiUrl.searchParams.set('filters[displayOnBlogPage][$eq]', 'true');
    }
  }

  // feature cards -->
  if (contentType === STRAPI_FEATURE_CARDS) {
    // populate images on feature card query
    apiUrl.searchParams.set('populate[BackgroundImageLight]', '*');
    apiUrl.searchParams.set('populate[BackgroundImageDark]', '*');
    apiUrl.searchParams.set(
      'populate[featureCardsExclusions][fields][0]',
      'uid',
    );
    apiUrl.searchParams.set('filters[PersonalizedFeatureCard][$nei]', 'true');
    //filter url
    const currentDate = new Date(Date.now()).toISOString().split('T')[0];
    apiUrl.searchParams.set(
      'filters[$or][0][campaignStart][$lte]',
      currentDate,
    );
    apiUrl.searchParams.set('filters[$or][1][campaignStart][$null]', 'true');
    apiUrl.searchParams.set('filters[$or][0][campaignEnd][$gte]', currentDate);
    apiUrl.searchParams.set('filters[$or][1][campaignEnd][$null]', 'true');
  }

  // partner-themes -->
  if (contentType === STRAPI_PARTNER_THEMES) {
    apiUrl.searchParams.set('populate[BackgroundImageLight]', '*');
    apiUrl.searchParams.set('populate[BackgroundImageDark]', '*');
    apiUrl.searchParams.set('populate[FooterImageLight]', '*');
    apiUrl.searchParams.set('populate[FooterImageDark]', '*');
    apiUrl.searchParams.set('populate[LogoLight]', '*');
    apiUrl.searchParams.set('populate[LogoDark]', '*');

    // filter partner-themes by "uid"
    if (filterUid) {
      apiUrl.searchParams.set('filters[uid][$eq]', filterUid);
    }
  }

  // jumper users -->
  if (contentType === STRAPI_JUMPER_USERS) {
    apiUrl.searchParams.set('populate[0]', 'feature_cards');
    apiUrl.searchParams.set(
      'populate[feature_cards][populate][0]',
      'BackgroundImageLight',
    );
    apiUrl.searchParams.set(
      'populate[feature_cards][populate][1]',
      'BackgroundImageDark',
    );
    apiUrl.searchParams.set(
      'populate[feature_cards][populate][2]',
      'featureCardsExclusions',
    );
    // filter feature cards by related EVM address
    if (filterPersonalFeatureCards?.enabled) {
      if (
        filterPersonalFeatureCards.account?.address &&
        filterPersonalFeatureCards.account.chainType === 'EVM'
      ) {
        apiUrl.searchParams.set(
          'filters[EvmWalletAddress][$eqi]',
          filterPersonalFeatureCards.account?.address,
        );
      }
    }
  }

  // show drafts ONLY on development env
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'development' &&
    apiUrl.searchParams.set('publicationState', 'preview');

  // use local strapi on develop || prod strapi
  const apiAccesToken =
    process.env.NEXT_PUBLIC_STRAPI_DEVELOP === 'true'
      ? process.env.NEXT_PUBLIC_LOCAL_STRAPI_API_TOKEN
      : process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const { data, isSuccess, isLoading, isRefetching, isFetching } = useQuery({
    queryKey: [queryKey, filterPersonalFeatureCards?.account?.isConnected],
    queryFn: async () => {
      const response = await fetch(decodeURIComponent(apiUrl.href), {
        headers: {
          Authorization: `Bearer ${apiAccesToken}`,
        },
      });
      const result = await response.json();
      return result;
    },
    enabled: enableQuery,
    refetchInterval: 1000 * 60 * 60,
  });

  return {
    data: data?.data ?? undefined,
    meta: data?.meta ?? undefined,
    url: apiUrl,
    isSuccess,
    isLoading,
    isRefetching,
    isFetching,
  };
};
