import { UTM_SOURCE } from '@/const/trackingKeys';
import type { UtmParams } from '@/types/utm';

export function appendUTMParametersToLink(link: string, utm: UtmParams) {
  const searchParams = new URLSearchParams(
    Object.entries({ utm_source: UTM_SOURCE, ...utm }).map(([key, value]) => [
      key,
      String(value),
    ]),
  );
  const updatedLink = link.charAt(link.length - 1) === '/' ? link : `${link}/`;
  const updatedUrl = `${updatedLink}?${searchParams.toString()}`;

  return updatedUrl;
}
