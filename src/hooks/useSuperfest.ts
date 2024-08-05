import { usePathname } from 'next/navigation';
import { JUMPER_FEST_PATH } from 'src/const/urls';

interface useSuperfestProps {
  isSuperfest: boolean;
}

export const useSuperfest = (): useSuperfestProps => {
  const pathname = usePathname();

  return {
    isSuperfest:
      pathname?.includes(
        JUMPER_FEST_PATH.endsWith('/')
          ? JUMPER_FEST_PATH.slice(0, -1)
          : JUMPER_FEST_PATH,
      ) ?? false,
  };
};
