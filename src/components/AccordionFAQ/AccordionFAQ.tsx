import { QAJsonSchema } from '@/components/JsonSchema';
import type { FaqMeta } from '@/types/strapi';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, IconButton, useTheme } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContainer as Container } from '.';

interface AccordionFAQProps {
  content: FaqMeta[];
}

export const AccordionFAQ = ({ content }: AccordionFAQProps) => {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const handleShowMore = () => {
    setShow(!show);
  };

  return !!content?.length ? (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setShow(!show)}
      >
        <Typography variant="lifiHeaderMedium" m={theme.spacing(2, 0)}>
          {t('blog.faq')}
        </Typography>
        <IconButton
          sx={{
            width: 42,
            height: 42,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : 'currentColor',
          }}
          onClick={handleShowMore}
        >
          <ExpandMoreIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Box>
      {content?.map((el: FaqMeta, index: number) => (
        <Accordion key={`faq-item-${index}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography variant="lifiBodyMediumStrong">
              {el.attributes.Question}
            </Typography>
          </AccordionSummary>
          <Divider
            sx={{
              ...(theme.palette.mode === 'dark' && {
                borderColor: theme.palette.grey[200],
              }),
            }}
          />
          <AccordionDetails sx={{ '& > img': { width: '100%' } }}>
            <BlocksRenderer content={el.attributes.Answer} />
          </AccordionDetails>
        </Accordion>
      ))}
      <QAJsonSchema data={content} />
    </Container>
  ) : null;
};
