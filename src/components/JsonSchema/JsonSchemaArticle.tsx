import Script from 'next/script';

interface ArticleJsonSchemaProps {
  title: string;
  images: string[];
  datePublished: string;
  dateModified: string;
  authorName?: string;
}

export const ArticleJsonSchema = ({
  title,
  images,
  datePublished,
  dateModified,
  authorName,
}: ArticleJsonSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    image: images,
    datePublished: datePublished,
    dateModified: dateModified,
    ...(authorName && {
      author: [
        {
          '@type': 'Person',
          name: authorName,
          // url: 'https://example.com/profile/janedoe123',
        },
      ],
    }),
  };
  return <Script type="application/ld+json">{JSON.stringify(schema)}</Script>;
};
