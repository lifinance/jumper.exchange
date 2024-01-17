import type { Breakpoint, CSSObject } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MenuDesktop, MenuMobile } from '.';

interface MenuProps {
  isOpenSubMenu?: boolean;
  label?: string;
  setOpen: (open: boolean, anchorRef: any) => void;
  cardsLayout?: boolean;
  styles?: CSSObject;
  open: boolean;
  transformOrigin?: string;
  children: any;
  width?: string;
}

export const Menu = ({
  open,
  setOpen,
  transformOrigin,
  cardsLayout,
  styles,
  width,
  label,
  isOpenSubMenu,
  children,
}: MenuProps) => {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm' as Breakpoint));

  return (
    open &&
    (isDesktop ? (
      <MenuDesktop
        label={label}
        transformOrigin={transformOrigin}
        open={open}
        styles={styles}
        width={width}
        cardsLayout={cardsLayout}
        setOpen={setOpen}
        isOpenSubMenu={isOpenSubMenu || false}
      >
        {children}
      </MenuDesktop>
    ) : (
      <MenuMobile
        label={label}
        open={open}
        styles={styles}
        cardsLayout={cardsLayout}
        setOpen={setOpen}
        isOpenSubMenu={isOpenSubMenu || false}
      >
        {children}
      </MenuMobile>
    ))
  );
};
