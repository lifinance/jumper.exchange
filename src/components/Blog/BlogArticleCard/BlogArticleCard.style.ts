import { Tag } from '@/components/Tag.style';
import { urbanist } from '@/fonts/fonts';
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
  darken,
  type Breakpoint,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const BlogArticleCardContainer = styled(Card)(({ theme }) => ({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: 'unset',
  padding: theme.spacing(2),
  borderRadius: '32px',
  background:
    theme.palette.mode === 'light'
      ? theme.palette.white.main
      : theme.palette.alphaLight200.main,
  transition: 'background-color 250ms',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    minWidth: 250,
    width: 416,
  },
  '&:hover': {
    cursor: 'pointer',
    backgroundColor:
      theme.palette.mode === 'light'
        ? darken(theme.palette.white.main, 0.04)
        : theme.palette.alphaLight300.main,
  },
}));

export const BlogArticleCardDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    flexDirection: 'row',
  },
}));

export const BlogArticleMetaDate = styled(Typography)(({ theme }) => ({
  fontSize: 'inherit',
  '&:after': {
    content: '"•"',
    margin: theme.spacing(0, 0.5),
  },
}));

export const BlogArticleMetaReadingTime = styled(Typography)(({ theme }) => ({
  fontSize: 'inherit',
}));

export const BlogArticleCardMetaSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 150,
  height: 16,
  transform: 'unset',
  borderRadius: '8px',
}));

export const BlogArticleCardImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: '16px',
  objectFit: 'contain',
}));

export const BlogArticleCardImageSkeleton = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  aspectRatio: 1.6,
  transform: 'unset',
  height: 'auto',
  borderRadius: '16px',
}));

export const BlogArticleCardContent = styled(CardContent)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(2),
  '&:last-child': { paddingBottom: theme.spacing(1) },
}));

export const BlogArticleCardTitle = styled(Typography)(({ theme }) => ({
  color: 'inherit',
  fontWeight: 700, //todo: use typography
  fontSize: '24px',
  fontFamily: urbanist.style.fontFamily,
  lineHeight: '32px',
  minHeight: '64px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
}));

export const BlogArticleCardTitleSkeleton = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  height: '64px',
  transform: 'unset',
  borderRadius: '12px',
  minHeight: '64px',
}));

export const BlogArticleCardMetaContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  color:
    theme.palette.mode === 'light'
      ? theme.palette.grey[800]
      : theme.palette.grey[300],
  '*': { textWrap: 'nowrap' },
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    marginLeft: theme.spacing(2),
  },
}));

export const BlogArticleCardTag = styled(Tag)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '18px',
  overflow: 'hidden',
  marginTop: theme.spacing(2),
  marginBottom: 0,
  textOverflow: 'ellipsis',
  height: '40px',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    marginTop: 0,
    maxWidth: '50%',
  },
  ':not(:first-of-type)': {
    marginLeft: theme.spacing(0.5),
  },
}));

export const BlogArticleCardTagSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 120,
  fontSize: '14px',
  marginTop: theme.spacing(2),
  borderRadius: '20px',
  marginBottom: 0,
  transform: 'unset',
  height: '40px',
  [theme.breakpoints.up('sm' as Breakpoint)]: {
    marginTop: 0,
    maxWidth: '50%',
  },
  ':not(:first-of-type)': {
    marginLeft: theme.spacing(0.5),
  },
}));
