import { JUMPER_LEARN_PATH, JUMPER_URL, pages } from '@/const/urls';
import type { ChangeFrequency, SitemapPage } from '@/types/sitemap';
import type { BlogArticleData, StrapiResponse } from '@/types/strapi';
import type { MetadataRoute } from 'next';
import { getArticles } from './lib/getArticles';
import { locales } from 'src/i18n';

function withTrallingSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // paths
  const routes = pages.map((route: SitemapPage) => ({
    url: withTrallingSlash(`${process.env.NEXT_PUBLIC_SITE_URL}${route.path}`),
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as ChangeFrequency,
    // todo: enable alternates once xml formatting is fixed
    alternates: {
      languages: locales.reduce(
        (acc, locale) => ({
          ...acc,
          [locale !== 'en' ? locale : 'x-default']: withTrallingSlash(
            `${process.env.NEXT_PUBLIC_SITE_URL}/${locale !== 'en' ? locale : ''}${locale === 'en' ? route.path.slice(1) : route.path}`,
          ),
        }),
        {},
      ),
    },
    priority: route.priority,
  }));

  // articles by slug
  const articles = await getArticles().then(
    (article: StrapiResponse<BlogArticleData>) =>
      article.data.map((el) => ({
        url: withTrallingSlash(
          `${process.env.NEXT_PUBLIC_SITE_URL}${JUMPER_LEARN_PATH}${el.attributes.Slug}`,
        ),
        lastModified: new Date(
          el.attributes.updatedAt || el.attributes.publishedAt || Date.now(),
        )
          .toISOString()
          .split('T')[0],
        changeFrequency: 'weekly' as ChangeFrequency,
        // todo: enable alternates once xml formatting is fixed
        alternates: {
          languages: locales.reduce((acc, locale) => {
            return {
              ...acc,
              [locale !== 'en' ? locale : 'x-default']: withTrallingSlash(
                `${process.env.NEXT_PUBLIC_SITE_URL}${locale !== 'en' ? `/${locale}` : ''}${JUMPER_LEARN_PATH}${el.attributes.Slug}`,
              ),
            };
          }, {}),
        },
        priority: 0.8,
      })),
  );

  return [...routes, ...articles];
}
