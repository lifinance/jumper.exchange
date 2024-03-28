import { BlogCTA } from '@/components/Blog/CTAs/BlogCTA/BlogCTA';
import {
  InstructionsAccordion,
  type InstructionItemProps,
} from '@/components/Blog/CTAs/InstructionsAccordion/InstructionsAccordion';
import { Lightbox } from '@/components/Lightbox/Lightbox';
import { Link } from '@/components/Link.style';
import { Widget } from '@/components/Widgets/Widget';
import { inter, urbanist } from '@/fonts/fonts';
import type { MediaAttributes } from '@/types/strapi';
import { Typography, alpha, useTheme } from '@mui/material';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { RootNode } from 'node_modules/@strapi/blocks-react-renderer/dist/BlocksRenderer';

interface CustomRichBlocksProps {
  baseUrl?: string;
  content: RootNode[] | undefined;
  id?: number;
}

interface ImageData {
  image: MediaAttributes;
}

export const CustomRichBlocks = ({
  id,
  baseUrl,
  content,
}: CustomRichBlocksProps) => {
  const theme = useTheme();
  const customRichBlocks = {
    // You can use the default components to set class names...
    link: (data: any) => {
      return <Link href={data.url}>{data.children[0].props.text}</Link>;
    },
    image: (data: ImageData) =>
      baseUrl ? <Lightbox imageData={data.image} baseUrl={baseUrl} /> : null,
    paragraph: ({ children }: any) => {
      if (children[0].props.text.includes('<JUMPER_CTA')) {
        try {
          const htmlString = children[0].props.text;

          // Regular expressions to extract title and url strings
          const titleRegex = /title="(.*?)"/;
          const urlRegex = /url="(.*?)"/;

          // Extract title and url strings using regular expressions
          const titleMatch = htmlString.match(titleRegex);
          const urlMatch = htmlString.match(urlRegex);

          // Check if matches were found and extract strings
          const title = titleMatch ? titleMatch[1] : null;
          const url = urlMatch ? urlMatch[1] : null;
          return <BlogCTA title={title} url={url} id={id} />;
        } catch (error) {
          return;
        }
      } else if (children[0].props.text.includes('<WIDGET>')) {
        return <Widget starterVariant="default" />;
      } else if (children[0].props.text.includes('<INSTRUCTIONS')) {
        try {
          const new_array: InstructionItemProps[] = [];
          let jso = children[0].props.text
            .replace('<INSTRUCTIONS ', '')
            .replace('/>', '');

          // Parse the JSON string and push each parsed object into the new_array
          JSON.parse(jso).forEach((obj: InstructionItemProps) => {
            new_array.push(obj);
          });

          return <InstructionsAccordion data={new_array} />;
        } catch (error) {
          // console.log(error);
          return;
        }
      } else {
        return (
          <Typography
            sx={{
              color: alpha(
                theme.palette.mode === 'light'
                  ? theme.palette.black.main
                  : theme.palette.white.main,
                0.75,
              ),
              margin: theme.spacing(2, 0),
              fontFamily: inter.style.fontFamily,
              fontSize: '18px',
              lineHeight: '32px',
              fontWeight: 400,
            }}
          >
            {children}
          </Typography>
        );
      }
    },
    heading: ({ children, level }: any) => {
      switch (level) {
        case 1:
          return (
            <Typography
              variant="h1"
              sx={{
                marginTop: theme.spacing(12),
                marginBottom: theme.spacing(6),
                fontFamily: urbanist.style.fontFamily,
                fontSize: '64px',
                lineHeight: '64px',
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          );
        case 2:
          return (
            <Typography
              variant="h2"
              sx={{
                marginTop: theme.spacing(8),
                marginBottom: theme.spacing(3),
                fontFamily: urbanist.style.fontFamily,
                fontSize: '36px',
                lineHeight: '48px',
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          );
        case 3:
          return (
            <Typography
              variant="h3"
              sx={{
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(2),
                fontFamily: urbanist.style.fontFamily,
                fontSize: '28px',
                lineHeight: '36px',
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          );
        case 4:
          return (
            <Typography
              variant="h4"
              sx={{
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(1.5),
                fontFamily: urbanist.style.fontFamily,
                fontSize: '22px',
                lineHeight: '28px',
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          );
        case 5:
          return (
            <Typography
              variant="h5"
              sx={{
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(1),
                fontFamily: urbanist.style.fontFamily,
                fontSize: '18px',
                lineHeight: '24px',
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          );
        case 6:
          return (
            <Typography
              variant="h6"
              sx={{
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(0.5),
                fontFamily: urbanist.style.fontFamily,
                fontSize: '12px',
                lineHeight: '18px',
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          );
        default:
          return (
            <Typography
              variant="h1"
              sx={{
                marginTop: theme.spacing(12),
                marginBottom: theme.spacing(6),
                fontFamily: urbanist.style.fontFamily,
                fontSize: '64px',
                lineHeight: '64px',
                fontWeight: 700,
              }}
            >
              {children}
            </Typography>
          );
      }
    },
  };

  return content ? (
    <BlocksRenderer content={content} blocks={customRichBlocks as any} />
  ) : null;
};
