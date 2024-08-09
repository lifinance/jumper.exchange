'use client';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useState } from 'react';

export const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | undefined>(() => {
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      return sessionStorage.getItem('fpId') || undefined;
    }
    return undefined;
  });

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const fp = await FingerprintJS.load();
      const response = await fp.get().then((el) => el);
      if (!active) {
        console.log('return');
        return;
      }
      setFingerprint(response.visitorId);

      sessionStorage.setItem('fpId', response.visitorId);
    }
  }, []);

  return fingerprint;
};
