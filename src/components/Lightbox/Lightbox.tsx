import type { MediaAttributes } from '@/types/strapi';
import CloseIcon from '@mui/icons-material/Close';
import type { Breakpoint } from '@mui/material';
import { Fade, useTheme } from '@mui/material';
import { useState } from 'react';
import {
  LightboxContainer,
  LightboxImage,
  LightboxModal,
  PreviewImage,
} from '.';
interface LightboxProps {
  baseUrl: string;
  imageData: MediaAttributes;
}

export const Lightbox = ({ baseUrl, imageData }: LightboxProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const handleClose = () => {
    setOpen(false);
  };

  const handleImage = (value: any) => {
    setOpen(true);
  };

  return (
    <>
      <PreviewImage
        src={imageData?.url}
        alt={imageData.caption ?? 'article-image'}
        onClick={() => handleImage(imageData.alternativeText)}
      />
      <LightboxModal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open} timeout={500}>
          <LightboxContainer onClick={handleClose}>
            <CloseIcon
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 0,
                cursor: 'pointer',
                right: 0,
                width: 32,
                height: 32,
                color: theme.palette.white.main,
                margin: theme.spacing(2, 3),
                [theme.breakpoints.up('sm' as Breakpoint)]: {
                  margin: theme.spacing(3, 4),
                },
              }}
            />
            <LightboxImage
              src={imageData?.url}
              alt={imageData.caption ?? 'article-image'}
            />
          </LightboxContainer>
        </Fade>
      </LightboxModal>
    </>
  );
};
