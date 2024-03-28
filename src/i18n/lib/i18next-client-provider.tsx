'use client';

import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

interface ClientTranslationContextType {
  language: string;
  setLanguage: (newValue: string) => void;
}

export const ClientTranslationContext =
  createContext<ClientTranslationContextType>({
    language: '',
    setLanguage: () => {},
  });

interface ClientTranslationProviderProps extends PropsWithChildren {
  lng: string;
}
export const ClientTranslationProvider = ({
  children,
  lng,
}: ClientTranslationProviderProps) => {
  const [language, setLanguage] = useState(lng);
  return (
    <ClientTranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </ClientTranslationContext.Provider>
  );
};
