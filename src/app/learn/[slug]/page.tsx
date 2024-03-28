import type { BlogArticleData } from '@/types/strapi';
import { getArticleBySlug } from 'src/app/lib/getArticleBySlug';
import { getArticlesByTag } from 'src/app/lib/getArticlesByTag';

import dynamic from 'next/dynamic';

const LearnArticlePageWrapper = dynamic(
  () => import('../../ui/learn/LearnArticlePage'),
  {
    ssr: true,
  },
);

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  const currentTags = (
    article.data as BlogArticleData
  ).attributes?.tags.data.map((el) => el?.id);

  const relatedArticles = await getArticlesByTag(
    article.data[0]?.id,
    currentTags,
  );

  return (
    <LearnArticlePageWrapper
      article={article.data.data}
      url={article.url}
      articles={relatedArticles.data}
    />
  );
}
