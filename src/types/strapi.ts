import type { WidgetConfig } from '@lifi/widget';
import type { RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';

/* Strapi */
interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface MediaData {
  id: number;
  attributes: MediaAttributes;
}

export interface MediaAttributes {
  name: string;
  alternativeText: string | undefined;
  caption?: string;
  width: number;
  height: number;
  formats: {
    small: MediaFormat;
    medium: MediaFormat;
    large: MediaFormat;
    thumbnail: MediaFormat;
    [key: string]: MediaFormat; // Allow additional formats
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export type StrapiResponseData<T> = T[];

export interface StrapiResponse<T> {
  data: StrapiResponseData<T>;
  meta: StrapiMeta;
}

export interface StrapiImageData {
  data: MediaData;
}

/* Feature-Cards */
export interface FeatureCardData {
  id: number;
  attributes: FeatureCardAttributes;
}

interface FeatureCardDisplayConditions {
  mode: string;
  showOnce?: boolean;
}

interface FeatureCardExclusions {
  data: {
    id: number;
    attributes: Pick<FeatureCardAttributes, 'uid'>;
  }[];
}

interface FeatureCardAttributes {
  Title: string;
  Subtitle: string;
  CTACall: string;
  URL: string;
  TitleColor?: string;
  CTAColor?: string;
  DisplayConditions: FeatureCardDisplayConditions;
  createdAt: string;
  updatedAt: string;
  PersonalizedFeatureCard?: boolean;
  publishedAt?: string;
  locale: string;
  uid: string;
  BackgroundImageLight: StrapiImageData;
  BackgroundImageDark: StrapiImageData;
  featureCardsExclusions?: FeatureCardExclusions;

  localizations: {
    data: any[];
  };
}

/* Jumper User */
export interface JumperUserData {
  id: number;
  attributes: JumperUserAttributes;
}

interface JumperUserAttributes {
  EvmWalletAddress?: string;
  SolWalletAddress?: string;
  PersonalizedContent?: object;
  feature_cards: { data: FeatureCardData[] };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/* Tags */
export interface TagData {
  data: TagAttributes[];
}
export interface TagAttributes {
  attributes: {
    Title: string;
    TextColor?: string;
    Key: string;
    BackgroundColor?: string;
    createdAt: string;
    locale: string;
    publishedAt?: string;
    updatedAt: string;
  };
  id: number;
}

/* FAQ-Items */
interface FaqItemAttributes {
  Question: string;
  Answer: RootNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  displayOnBlogPage: boolean;
}

export interface FaqMeta {
  id: number;
  attributes: FaqItemAttributes;
}

export interface FaqData {
  data: FaqMeta[];
}

/* Author */
export interface AuthorData {
  attributes: any;
  data: AuthorAttributes;
}
interface AuthorAttributes {
  attributes: {
    Name: string;
    createdAt: string;
    publishedAt?: string;
    updatedAt: string;
    Avatar: AvatarItem;
    Role: string;
  };
  id: number;
}

export interface AvatarItem {
  data: AvatarData;
}

export interface AvatarData {
  id: number;
  attributes: MediaAttributes;
}

/* Themes */
export interface PartnerThemesData {
  id: number;
  attributes: PartnerThemesAttributes;
}

export interface Customization {
  palette: { [colorName: string]: string };
  logoName?: string;
  footerBannerUrl?: string;
  typography?: string;
}

type WidgetConfigProps = Omit<WidgetConfig, 'integrator'>;

export interface PartnerTheme {
  config: WidgetConfigProps;
  customization?: Customization;
}

export interface PartnerThemesAttributes {
  PartnerName: string;
  lightConfig?: PartnerTheme;
  darkConfig?: PartnerTheme;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  darkModeEnabled: boolean;
  uid: string;
  SelectableInMenu?: boolean;
  PartnerURL?: URL;
  BackgroundImageLight: StrapiImageData;
  BackgroundImageDark: StrapiImageData;
  FooterImageLight: StrapiImageData;
  FooterImageDark: StrapiImageData;
  LogoLight: StrapiImageData;
  LogoDark: StrapiImageData;
  BackgroundColorLight?: string;
  BackgroundColorDark?: string;
}

/* Blog */
export interface BlogArticleData {
  id: number;
  attributes: BlogArticleAttributes;
}
export interface BlogArticleAttributes {
  Title: string;
  Subtitle: string;
  Content: RootNode[];
  Image: StrapiImageData;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  tags: TagData;
  author: AuthorData;
  faq_items: FaqData;
  publishedAt?: string;
  locale: string;
  localizations: {
    data: any[];
  };
}
