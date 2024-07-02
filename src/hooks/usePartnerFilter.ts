'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSettingsStore } from 'src/stores/settings';
import { useDexsAndBridgesKeys } from './useDexsAndBridgesKeys';
import { useIsDapp } from './useIsDapp';

interface usePartnerFilterProps {
  hasTheme: boolean;
  isBridgeFiltered: boolean;
  isDexFiltered: boolean;
  partnerName: string;
  bridgesKeys: string[];
  exchangesKeys: string[];
}

export const usePartnerFilter = (): usePartnerFilterProps => {
  const pathname = usePathname();
  const setPartnerPageThemeUid = useSettingsStore(
    (state) => state.setPartnerPageThemeUid,
  );
  const isDapp = useIsDapp();
  // check the list of bridge that we suport the name that we use
  const { bridgesKeys, exchangesKeys } = useDexsAndBridgesKeys();

  // check the list of bridge that we suport the name that we use
  let hasTheme = false;
  let isBridgeFiltered = false;
  let isDexFiltered = false;
  let partnerName = '';
  const pathnameSplit = pathname?.split('/').filter((el) => el !== '');
  const localeSplit =
    pathnameSplit && pathnameSplit.length > 1 && pathnameSplit[0];
  let pathnameKey;
  if (localeSplit && localeSplit.length === 2) {
    pathnameKey =
      pathnameSplit && pathnameSplit[pathnameSplit.length - 1]?.toLowerCase();
  } else {
    pathnameKey = pathnameSplit && pathnameSplit[0]?.toLowerCase();
  }

  if (pathnameKey) {
    if (bridgesKeys && bridgesKeys.includes(pathnameKey) && isDapp) {
      hasTheme = true;
      isBridgeFiltered = true;
      partnerName = pathnameKey;
    } else if (bridgesKeys && !bridgesKeys.includes(pathnameKey)) {
      setPartnerPageThemeUid(undefined);
    } else if (exchangesKeys && exchangesKeys.includes(pathnameKey)) {
      hasTheme = true;
      isDexFiltered = true;
      partnerName = pathnameKey;
    } else if (exchangesKeys && !exchangesKeys.includes(pathnameKey)) {
      setPartnerPageThemeUid(undefined);
    }
  } else {
    setPartnerPageThemeUid(undefined);
  }

  useEffect(() => {
    partnerName && setPartnerPageThemeUid(partnerName);
  }, [setPartnerPageThemeUid, partnerName]);

  if (pathname?.includes('memecoins')) {
    hasTheme = true;
    partnerName = 'memecoins';
    return {
      hasTheme,
      isBridgeFiltered,
      isDexFiltered,
      partnerName,
      exchangesKeys,
      bridgesKeys,
    };
  }

  return {
    hasTheme,
    isBridgeFiltered,
    isDexFiltered,
    partnerName,
    bridgesKeys,
    exchangesKeys,
  };
};
