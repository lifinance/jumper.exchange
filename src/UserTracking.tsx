import { useCookie3 } from '@/hooks/userTracking/useCookie3';
import { useInitUserTracking } from '@/hooks/userTracking/useInitUserTracking';
import { useEffect } from 'react';

export function UserTracking() {
  const { initTracking } = useInitUserTracking();
  const cookie3 = useCookie3();

  useEffect(() => {
    initTracking({});
    cookie3?.trackPageView();
  }, [cookie3, initTracking]);

  return null;
}
