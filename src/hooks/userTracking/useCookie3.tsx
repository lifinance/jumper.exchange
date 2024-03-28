import { Cookie3Context } from '@/providers/Cookie3Provider';
import { useContext } from 'react';

export const useCookie3 = () => {
  const context = useContext(Cookie3Context);

  return context;
};
