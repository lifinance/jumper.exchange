import {
  CardMedia,
  CardMediaProps,
  Card as MuiCard,
  CardProps as MuiCardProps,
} from '@mui/material';

import { styled } from '@mui/material/styles';

export interface CardProps extends Omit<MuiCardProps, 'component'> {
  backgroundImageUrl?: string;
}

export const Card = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'backgroundImageUrl',
})<CardProps>(({ theme, backgroundImageUrl }) => ({
  width: 384,
  height: 160,
  borderRadius: '12px',
  position: 'relative',
  marginBottom: theme.spacing(1.5),
  overflow: 'hidden',
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: 'contain',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.16)'
      : '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 16px rgba(0, 0, 0, 0.08)',
  ':last-child': {
    marginBottom: 0,
  },
}));

export interface CardImageProps extends Omit<CardMediaProps, 'component'> {
  component?: string;
  alt?: string;
  src?: string;
}

export const CardImage = styled(CardMedia)<CardImageProps>(({ theme }) => ({
  width: '106px',
  height: 'auto',
  maxHeight: '88px',
  position: 'absolute',
  objectFit: 'contain',
  right: theme.spacing(3.75),
  bottom: '22px',
}));
