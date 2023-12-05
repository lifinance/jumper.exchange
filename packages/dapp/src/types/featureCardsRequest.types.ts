export type FeatureCardsResponseType = {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: FeatureCardType[];
  includes: {
    Asset: FeatureCardAsset[];
  };
};

export type FeatureCardType = {
  fields: FeatureCardEntry;
  metadata: {
    tags: any[];
  };
  sys: Sys;
};

export type FeatureCardEntry = {
  displayConditions: DisplayConditions;
  subtitle: string;
  title: string;
  titleColor?: string;
  ctaCall?: string;
  ctaColor?: string;
  url: string;
  backgroundImageDark?: Image;
  backgroundImageLight?: Image;
};

export type FeatureCardAsset = {
  fields: Fields;
  metadata: {
    tags: any[];
  };
  sys: Sys;
};

type Sys = {
  createdAt: string;
  environment: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
  id: string;
  locale: string;
  revision: number;
  space: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    };
  };
  type: string;
  updatedAt: string;
};

type FileDetails = {
  image: {
    height: number;
    width: number;
  };
  size: number;
};

type File = {
  contentType: string;
  details: FileDetails;
  fileName: string;
  url: string;
};

type Fields = {
  description: string;
  file: File;
  title: string;
};

type CardTheme = 'light' | 'dark';

type DisplayConditions = {
  id: string;
  showOnce?: boolean;
  mode?: CardTheme;
};

type Image = {
  sys: {
    id: string;
    linkType: string;
    type: string;
  };
};
