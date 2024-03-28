import { IconButtonAlpha } from '@/components/IconButton';
import {
  InfoMessageCard,
  InfoMessageCardTitle,
} from '@/components/MessageCard';
import { getContrastAlphaColor } from '@/utils/colors';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { Slide, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { InfoAlertContainer } from '.';

export interface InfoAlertProps {
  title: string;
  subtitle: string;
  active: boolean;
}

export const InfoAlert = ({ title, subtitle, active }: InfoAlertProps) => {
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
        <InfoMessageCard mt={theme.spacing(4)} mb={theme.spacing(4)}>
          <IconButtonAlpha
            sx={{
              position: 'absolute',
              right: theme.spacing(2),
              top: theme.spacing(2),
              backgroundColor: getContrastAlphaColor(theme, 0.04),
              width: 24,
              height: 24,
            }}
            onClick={(e) => handleClose(e)}
          >
            <CloseIcon
              sx={{
                width: 16,
                height: 16,
              }}
            />
          </IconButtonAlpha>
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
        </InfoMessageCard>
      </InfoAlertContainer>
    </Slide>
  );
};
