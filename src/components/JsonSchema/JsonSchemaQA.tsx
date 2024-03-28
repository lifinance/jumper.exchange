import type { FaqMeta } from '@/types/strapi';
import Script from 'next/script';
import { useMemo } from 'react';

interface TextProps {
  text: string;
  type: string;
}

interface BlocksProps {
  type: string;
  children: TextProps[];
}

function extractTextFromBlocks(blocks: BlocksProps[]) {
  let text = '';
  blocks.forEach((block) => {
    if (
      block.type === 'text' ||
      block.type === 'paragraph' ||
      block.type === 'heading' ||
      block.type === 'quote' ||
      block.type === 'list'
    ) {
      block.children.forEach((blockItem) => {
        text += blockItem && blockItem.text + '\n';
      });
      // Add more conditions for other block types if needed
    }
  });
  if (text) {
    return text;
  }
}

interface QAJsonSchemaProps {
  data: FaqMeta[];
}

export const QAJsonSchema = ({ data }: QAJsonSchemaProps) => {
  const schema = useMemo(() => {
    const entities = data?.map((el, index) => {
      const text = extractTextFromBlocks(
        el.attributes.Answer as unknown as BlocksProps[],
      );
      const output = text && {
        '@type': 'Question',
        name: el.attributes.Question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: text.length > 256 ? `${text.slice(0, 256)}...` : text,
        },
      };
      return output;
    });
    const structuredJson = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: entities,
    };
    return structuredJson;
  }, [data]);
  return <Script type="application/ld+json">{JSON.stringify(schema)}</Script>;
};
