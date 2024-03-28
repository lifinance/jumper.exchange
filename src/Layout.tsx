import type { PropsWithChildren } from 'react';
import { BackgroundGradient } from './components/BackgroundGradient/BackgroundGradient';
import { Navbar } from './components/Navbar/Navbar';
import { Snackbar } from './components/Snackbar/Snackbar';

interface LayoutProps {
  variant?: 'blog' | undefined;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  variant,
}) => {
  return (
    <>
      <BackgroundGradient variant={variant} />
      <Navbar />
      {children}
      <Snackbar />
    </>
  );
};
