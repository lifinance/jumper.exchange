import { usePathname } from 'next/navigation';
import { JUMPER_LEARN_PATH, JUMPER_LOYALTY_PATH } from 'src/const/urls';

const checkDappPath = (path: string | null) => {
  if (path) {
    return (
      !path.includes(JUMPER_LEARN_PATH) && !path.includes(JUMPER_LOYALTY_PATH)
    );
  }
};

export const useIsDapp = () => {
  const pathname = usePathname();
  const isDapp = checkDappPath(pathname);
  return isDapp;
};
