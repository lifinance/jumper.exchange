import { type Cookie3Analytics } from '@cookie3/analytics';
import { createContext } from 'react';

export interface ProviderProps {
  children?: React.ReactNode;
  value: Cookie3Analytics;
}

export const Cookie3Context = createContext<Cookie3Analytics | undefined>(
  undefined,
);

export const Cookie3Provider = ({ children, value }: ProviderProps) => {
  return (
    <Cookie3Context.Provider value={value}>{children}</Cookie3Context.Provider>
  );
};
