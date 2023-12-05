import { useContext } from 'react';
import { Cookie3Context } from '../providers';

export const useCookie3 = () => {
  const context = useContext(Cookie3Context);

  return context;
};
