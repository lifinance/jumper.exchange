import { getContrastAlphaColor } from '@/utils/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Breakpoint } from '@mui/material';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { MouseEventHandler } from 'react';
import { useState } from 'react';
import type { InstructionItemProps } from '.';
import {
  InstructionsAccordionItemContainer,
  InstructionsAccordionItemHeader,
  InstructionsAccordionItemIndex,
  InstructionsAccordionItemLabel,
  InstructionsAccordionItemMain,
  InstructionsAccordionItemMore,
  InstructionsAccordionToggle,
} from '.';
import { Button } from 'src/components/Button';
import { sora } from 'src/fonts/fonts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface InstructionsAccordionItemProps extends InstructionItemProps {
  index: number;
}

// Function to parse links within the title
const parseTitle = (title: string, link: { label: string; url: string }) => {
  // Replace <LINK> with anchor tag
  const rawText = title.split('<LINK>');
  let cleanText = '';
  rawText.map((el, index) => {
    if (el !== '') {
      cleanText += `<p>${el}</p>`;
      if (index < rawText.length - 1) {
        cleanText += `<a href="${link.url}" target="${!link.url.includes('jumper.exchange') || link.url[0] === '/' ? '_self' : '_blank'}">${link.label}</a>`;
      }
    }
    return undefined;
  });
  return cleanText;
};

export const InstructionsAccordionItem = ({
  title,
  step,
  link,
  index,
  url,
  buttonText,
  buttonLink,
  activeTheme,
  variant,
}: InstructionsAccordionItemProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.up('sm' as Breakpoint));
  const handleOpen:
    | MouseEventHandler<HTMLDivElement | HTMLButtonElement>
    | undefined = (e) => {
    e.stopPropagation();
    step && setOpen((prev) => !prev);
  };
  return (
    <InstructionsAccordionItemContainer
      sx={{
        typograpy: variant === 'superfest' ? sora.style.fontFamily : undefined,
        border: variant === 'superfest' ? '2px dotted' : undefined,
        borderColor: variant === 'superfest' ? '#000000' : undefined,
      }}
    >
      <InstructionsAccordionItemMain onClick={(e) => handleOpen(e)}>
        <InstructionsAccordionItemHeader>
          <InstructionsAccordionItemIndex>
            {index + 1}
          </InstructionsAccordionItemIndex>
          {link ? (
            <InstructionsAccordionItemLabel
              dangerouslySetInnerHTML={{ __html: parseTitle(title, link) }}
            />
          ) : (
            <InstructionsAccordionItemLabel>
              {title}
            </InstructionsAccordionItemLabel>
          )}
        </InstructionsAccordionItemHeader>
        {step ? (
          isTablet ? (
            <InstructionsAccordionToggle onClick={(e) => handleOpen(e)}>
              <ExpandMoreIcon
                sx={{
                  ...(open && { transform: 'rotate(180deg)' }),
                }}
              />
            </InstructionsAccordionToggle>
          ) : (
            <ExpandMoreIcon
              sx={{
                color: getContrastAlphaColor(theme, 0.32),
                ...(open && { transform: 'rotate(180deg)' }),
              }}
            />
          )
        ) : null}
      </InstructionsAccordionItemMain>

      {open ? (
        <InstructionsAccordionItemMore>
          <>
            <Typography>{step}</Typography>
            {buttonLink ? (
              <Box
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'flex-start',
                  mt: '16px',
                  typography:
                    variant === 'superfest' ? sora.style.fontFamily : undefined,
                }}
              >
                <a
                  href={buttonLink}
                  target="_blank"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      textAlign: 'left',
                      alignItems: 'center',
                      alignContent: 'center',
                      color: '#000000',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <Typography
                      variant={'lifiBodyMediumStrong'}
                      component={'span'}
                      mr={'8px'}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 208,
                        [theme.breakpoints.up('sm' as Breakpoint)]: {
                          maxWidth: 168,
                        },
                      }}
                    >
                      {buttonText}
                    </Typography>
                    <ArrowForwardIcon />
                  </Box>
                </a>
              </Box>
            ) : null}
          </>
        </InstructionsAccordionItemMore>
      ) : null}
    </InstructionsAccordionItemContainer>
  );
};
