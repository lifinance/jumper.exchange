// app/server-sitemap.xml/route.ts
import { JUMPER_LEARN_PATH, pages } from '@/const/urls';
import type { BlogArticleData, StrapiResponse } from '@/types/strapi';
import { getServerSideSitemap } from 'next-sitemap';
import { getArticles } from '../lib/getArticles';

export async function GET(request: Request) {
  // paths
  const routes = pages.map((route) => ({
    loc: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // articles by slug
  const articles = await getArticles().then(
    (article: StrapiResponse<BlogArticleData>) =>
      article.data.map((el) => {
        return {
          loc: `${process.env.NEXT_PUBLIC_SITE_URL}${JUMPER_LEARN_PATH}/${el.attributes.Slug}`,
          lastModified:
            new Date(el.attributes.updatedAt).toISOString() ||
            new Date(el.attributes.publishedAt ?? Date.now()).toISOString(),
        };
      }),
  );

  return getServerSideSitemap([...routes, ...articles]);
}
