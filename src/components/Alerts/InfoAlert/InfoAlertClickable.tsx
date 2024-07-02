import {
  InfoMessageCardClickable,
  InfoMessageCardTitle,
} from '@/components/MessageCard';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { Slide, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  InfoAlertButton,
  ButtonInfoAlertClickable,
  InfoAlertContainer,
} from '.';

export interface InfoAlertProps {
  title: string;
  subtitle: string;
  active: boolean;
  buttonText: string;
}

export const InfoAlertClickable = ({
  title,
  subtitle,
  active,
  buttonText,
}: InfoAlertProps) => {
  const [closed, setClosed] = useState(false);
  const theme = useTheme();
  const handleClose = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setClosed(true);
  };

  useEffect(() => {
    active && setClosed(false);
  }, [active]);

  return (
    <Slide
      direction="up"
      in={!closed && active}
      unmountOnExit
      appear={!closed && active}
      timeout={500}
      easing={'cubic-bezier(0.32, 0, 0.67, 0)'}
    >
      <InfoAlertContainer>
        <a
          href="https://app.sei.io/"
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
          rel="noreferrer"
        >
          <InfoMessageCardClickable>
            <InfoAlertButton onClick={(e) => handleClose(e)}>
              <CloseIcon
                sx={{
                  width: 16,
                  height: 16,
                }}
              />
            </InfoAlertButton>
            <InfoMessageCardTitle
              display="flex"
              alignItems="center"
              px={2}
              pt={2}
            >
              <InfoIcon
                sx={{
                  marginRight: 1,
                }}
              />
              <Typography variant={'lifiHeaderXSmall'}>{title}</Typography>
            </InfoMessageCardTitle>
            <Typography variant={'lifiBodySmall'} pt={theme.spacing(1.5)}>
              {subtitle}
            </Typography>
            <ButtonInfoAlertClickable size="small">
              <Typography variant={'lifiBodySmall'}>{buttonText}</Typography>
            </ButtonInfoAlertClickable>
          </InfoMessageCardClickable>
        </a>
      </InfoAlertContainer>
    </Slide>
  );
};
