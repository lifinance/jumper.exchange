import type { CSSObject } from '@mui/material';
import { ReactNode, type PropsWithChildren } from 'react';
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonTransparent,
} from './Button.style';
type ButtonVariant = 'primary' | 'secondary' | 'transparent';

interface ButtonProbs {
  variant: ButtonVariant;
  styles?: CSSObject;
  id?: string;
  fullWidth?: boolean;
  muiVariant?: 'text' | 'outlined' | 'contained';
  onClick?: (event?: any) => void;
  children?: any;
}

export const Button: React.FC<PropsWithChildren<ButtonProbs>> = ({
  variant,
  styles,
  id,
  fullWidth,
  onClick,
  children,
  muiVariant,
}: ButtonProbs) => {
  let output: ReactNode;

  switch (variant) {
    case 'primary':
      output = (
        <ButtonPrimary
          id={id}
          fullWidth={fullWidth}
          onClick={(event) => onClick && onClick(event)}
          variant={muiVariant}
          sx={styles}
        >
          {children}
        </ButtonPrimary>
      );
      break;
    case 'secondary':
      output = (
        <ButtonSecondary
          id={id}
          fullWidth={fullWidth}
          onClick={(event) => onClick && onClick(event)}
          variant={muiVariant}
          sx={styles}
        >
          {children}
        </ButtonSecondary>
      );
      break;
    case 'transparent':
      output = (
        <ButtonTransparent
          id={id}
          fullWidth={fullWidth}
          onClick={(event) => onClick && onClick(event)}
          variant={muiVariant}
          sx={styles}
        >
          {children}
        </ButtonTransparent>
      );
      break;
    default:
      output = (
        <ButtonPrimary
          id={id}
          fullWidth={fullWidth}
          onClick={onClick}
          variant={muiVariant}
          sx={styles}
        >
          {children}
        </ButtonPrimary>
      );
  }

  return output;
};
