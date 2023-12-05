import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { CSSObject } from '@mui/material';
import { useTheme } from '@mui/material';
import { getContrastAlphaColor } from '../../utils';
import { ButtonBackArrowWrapper } from './ButtonArrowBack.styled';

type ButtonBackArrowProps = {
  onClick?: () => void;
  styles?: CSSObject;
};

export const ButtonBackArrow: React.FC<ButtonBackArrowProps> = ({
  onClick,
  styles,
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <ButtonBackArrowWrapper
      size="medium"
      aria-label="settings"
      edge="start"
      sx={{
        ...styles,
        '&:hover': {
          backgroundColor: getContrastAlphaColor(theme, '4%'),
        },
      }}
      onClick={handleClick}
    >
      <ArrowBackIcon />
    </ButtonBackArrowWrapper>
  );
};
