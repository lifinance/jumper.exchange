import type { InitTrackingProps } from '@/types/userTracking';
import { EventTrackingTool } from '@/types/userTracking';
import { useCallback } from 'react';
import { hotjar } from 'react-hotjar';

export function useInitUserTracking() {
  const initTracking = useCallback(
    /**
     * Initialize for Tracking with HJ
     * (ARCx has its own Provider)
     * (Google Analytics is initialized in index.html)
     */
    async ({ disableTrackingTool }: InitTrackingProps) => {
      if (!disableTrackingTool?.includes(EventTrackingTool.Hotjar)) {
        !hotjar.initialized() &&
          process.env.NEXT_PUBLIC_HOTJAR_ID &&
          process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION &&
          hotjar.initialize(
            process.env.NEXT_PUBLIC_HOTJAR_ID,
            process.env.NEXT_PUBLIC_HOTJAR_SNIPPET_VERSION,
          );
      }
    },
    [],
  );

  return {
    initTracking,
  };
}
