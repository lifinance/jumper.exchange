import type { Account } from '@/hooks/useAccounts';

interface GetStrapiBaseUrlProps {
  contentType:
    | 'feature-cards'
    | 'blog-articles'
    | 'faq-items'
    | 'tags'
    | 'jumper-users'
    | 'partner-themes';
}

interface PaginationProps {
  page: number;
  pageSize: number;
  withCount?: boolean;
}

class StrapiApi {
  protected baseUrl: string;
  protected contentType: GetStrapiBaseUrlProps['contentType'];
  protected apiUrl: URL;
  public apiAccessToken: string;

  constructor({ contentType }: GetStrapiBaseUrlProps) {
    this.contentType = contentType;

    // Set up API access token based on environment
    this.apiAccessToken = this.getApiAccessToken();

    // Set up base URL
    this.baseUrl = this.getBaseUrl();

    // Set up API URL
    this.apiUrl = new URL(`${this.baseUrl}/${this.contentType}`);

    // Show drafts ONLY on development env
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
      this.apiUrl.searchParams.set('publicationState', 'preview');
    }
  }

  public getApiAccessToken(): string {
    if (process.env.NEXT_PUBLIC_STRAPI_DEVELOP === 'true') {
      // Use local-strapi-api token for development environment
      return process.env.NEXT_PUBLIC_LOCAL_STRAPI_API_TOKEN || '';
    } else {
      // Use default STRAPI API token for other environments
      return process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';
    }
  }

  private getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_STRAPI_DEVELOP === 'true') {
      // Use local Strapi URL for development environment
      if (!process.env.NEXT_PUBLIC_LOCAL_STRAPI_URL) {
        console.error('Local Strapi URL is not provided.');
        throw new Error('Local Strapi URL is not provided.');
      }
      return process.env.NEXT_PUBLIC_LOCAL_STRAPI_URL;
    } else {
      // Use default Strapi URL for other environments
      if (!process.env.NEXT_PUBLIC_STRAPI_URL) {
        console.error('Strapi URL is not provided.');
        throw new Error('Strapi URL is not provided.');
      }
      return process.env.NEXT_PUBLIC_STRAPI_URL;
    }
  }

  getApiUrl(): string {
    return this.apiUrl.href;
  }

  getApiBaseUrl(): string {
    return this.apiUrl.origin;
  }

  addPaginationParams({
    page,
    pageSize,
    withCount = true,
  }: PaginationProps): this {
    this.apiUrl.searchParams.set('pagination[page]', `${page}`);
    this.apiUrl.searchParams.set('pagination[pageSize]', `${pageSize}`);
    this.apiUrl.searchParams.set('pagination[withCount]', `${withCount}`);
    return this;
  }
}

class ArticleParams {
  private apiUrl: URL;

  constructor(apiUrl: URL) {
    this.apiUrl = apiUrl;
  }

  addParams(): URL {
    this.apiUrl.searchParams.set('populate[0]', 'Image');
    this.apiUrl.searchParams.set('populate[1]', 'tags');
    this.apiUrl.searchParams.set('populate[2]', 'author.Avatar');
    this.apiUrl.searchParams.set('populate[3]', 'faq_items');
    return this.apiUrl;
  }
}

class ArticleStrapiApi extends StrapiApi {
  constructor() {
    super({ contentType: 'blog-articles' }); // Set content type to "blog-articles" automatically
    const articleParams = new ArticleParams(this.apiUrl);
    this.apiUrl = articleParams.addParams();
  }

  sort(order: 'asc' | 'desc'): this {
    this.apiUrl.searchParams.set('sort', `createdAt:${order.toUpperCase()}`);
    return this;
  }

  filterByTag(tags: number | number[]): this {
    if (typeof tags === 'string') {
      this.apiUrl.searchParams.set('filters[tags][id][$eq]', tags);
    } else if (Array.isArray(tags)) {
      tags.forEach((tag, index) => {
        this.apiUrl.searchParams.set(
          `filters[$and][0][$or][${index}][tags][id][$eq]`,
          `${tag}`,
        );
      });
    }
    return this;
  }

  filterBySlug(filterSlug: string): this {
    this.apiUrl.searchParams.set('filters[Slug][$eq]', filterSlug);
    return this;
  }

  filterByFeatured(): this {
    this.apiUrl.searchParams.set('filters[featured][$eq]', 'true');
    return this;
  }
}

class FeatureCardStrapiApi extends StrapiApi {
  constructor() {
    super({ contentType: 'feature-cards' }); // Set content type to "feature-cards" automatically
    this.addFeatureCardParams(); // Add specific parameters for feature cards
  }

  private addFeatureCardParams(): void {
    // populate images on feature card query
    this.apiUrl.searchParams.set('populate[0]', 'BackgroundImageLight');
    this.apiUrl.searchParams.set('populate[1]', 'BackgroundImageDark');
    this.apiUrl.searchParams.set(
      'filters[PersonalizedFeatureCard][$nei]',
      'true',
    );
  }
}

class PartnerThemeStrapiApi extends StrapiApi {
  constructor() {
    super({ contentType: 'partner-themes' }); // Set content type to "feature-cards" automatically
    this.addPartnerThemeParams(); // Add specific parameters for feature cards
  }

  private addPartnerThemeParams(): void {
    // populate images on feature card query
    this.apiUrl.searchParams.set('populate[0]', 'BackgroundImageLight');
    this.apiUrl.searchParams.set('populate[1]', 'BackgroundImageDark');
  }
}

interface FilterPerrsonalFeatureCardsProps {
  account: Account | undefined;
}

class JumperUserStrapiApi extends StrapiApi {
  constructor() {
    super({ contentType: 'jumper-users' }); // Set content type to "jumper-users" automatically
    this.addJumperUsersParams(); // Add specific parameters for jumper users
  }

  private addJumperUsersParams(): void {
    // populate feature cards with custom fields
    this.apiUrl.searchParams.set('populate[0]', 'feature_cards');
    this.apiUrl.searchParams.set(
      'populate[feature_cards][populate][0]',
      'BackgroundImageLight',
    );
    this.apiUrl.searchParams.set(
      'populate[feature_cards][populate][1]',
      'BackgroundImageDark',
    );
  }

  addJumperUsersPersonalizedFCParams(
    filterPersonalFeatureCards: FilterPerrsonalFeatureCardsProps,
  ): this {
    if (
      filterPersonalFeatureCards.account?.address &&
      filterPersonalFeatureCards.account?.chainType === 'EVM'
    ) {
      this.apiUrl.searchParams.set(
        'filters[EvmWalletAddress][$eqi]',
        filterPersonalFeatureCards.account?.address,
      );
    }
    return this;
  }
}

class BlogFaqStrapiApi extends StrapiApi {
  constructor() {
    super({ contentType: 'blog-articles' }); // Set content type to "blog-articles" automatically
    this.addFaqParams(); // Add specific parameters for fetching FAQ items related to blog articles
    this.addFaqFeaturedFilterParams(); // Add specific parameters for filtering featured FAQ items
  }

  public addFaqParams(): void {
    // populate FAQ items related to blog articles
    this.apiUrl.searchParams.set('populate[0]', 'faqItems');
  }

  public addFaqFeaturedFilterParams(): void {
    // filter FAQ items to fetch only featured ones
    this.apiUrl.searchParams.set('filters[faqItems][featured][$eq]', 'true');
  }
}

export {
  ArticleStrapiApi,
  BlogFaqStrapiApi,
  FeatureCardStrapiApi,
  JumperUserStrapiApi,
  PartnerThemeStrapiApi,
  StrapiApi,
};
