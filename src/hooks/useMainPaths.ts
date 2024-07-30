import { usePathname } from 'next/navigation';

interface useMainPathsProps {
  isMainPaths: boolean;
}

export const useMainPaths = (): useMainPathsProps => {
  const pathname = usePathname();

  const isGas = pathname?.includes('/gas');
  const isBuy = pathname?.includes('/buy');
  //Todo: find better way to check
  const isExchange =
    !pathname?.includes('/profile') &&
    !pathname?.includes('/learn') &&
    (pathname === '/' ||
      pathname?.split('/').length === 3 ||
      pathname?.split('/').length === 2);

  return {
    isMainPaths: isGas || isBuy || isExchange,
  };
};
