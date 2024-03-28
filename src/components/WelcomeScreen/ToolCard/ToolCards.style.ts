'use client';
import type { Breakpoint } from '@mui/material';
import { styled } from '@mui/material';

export const ToolCardsContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
  flexWrap: 'wrap',
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm' as Breakpoint)]: {},
}));
