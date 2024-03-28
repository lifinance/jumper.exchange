import type { RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';

export const readingTime = (text: string | RootNode[] | undefined) => {
  let cleanedText = '';
  if (!text) {
    return 'XX';
  }
  if (Array.isArray(text)) {
    text.forEach((node) => {
      if ('children' in node) {
        node.children.forEach((child) => {
          if ('text' in child && !!child.text) {
            cleanedText += child.text;
          }
        });
      }
    });
  } else {
    cleanedText = text;
  }
  const wpm = 225;
  const words = cleanedText.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};
