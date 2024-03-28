'use client';
import { Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

interface SwitchLangButtonProps {
  lang: string;
}

const SwitchLangButton = ({ lang }: SwitchLangButtonProps) => {
  const pathname = usePathname();

  const switchLocale = useCallback(
    (locale: string) => {
      const newPath = `/${locale}${pathname}`;
      window.history.replaceState(null, '', newPath);
    },
    [pathname],
  );

  return (
    <Button
      onClick={() => {
        switchLocale(lang);
      }}
    >
      {lang}
    </Button>
  );
};

export default SwitchLangButton;
