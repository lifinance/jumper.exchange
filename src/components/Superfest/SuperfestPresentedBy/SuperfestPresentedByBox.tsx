'use client';

import { usePathname } from 'next/navigation';
import { SuperfestPresentedBy } from 'src/components/illustrations/SuperfestPresentedBy';
import { JUMPER_FEST } from 'src/const/urls';
import { SuperFestPoweredContainer } from './SuperfestPresentedByBox.style';

export const SuperfestPresentedByBox = () => {
  const currentPath = usePathname();
  const isSuperfest = currentPath?.includes(JUMPER_FEST);

  const handleClick = () => {
    // openInNewTab(lifiUrl);
  };

  return (
    <>
      {isSuperfest ? (
        <SuperFestPoweredContainer fixedPosition={false}>
          <a
            className={'link-superfest'}
            onClick={handleClick}
            href={'https://www.optimism.io/'}
            target={'_blank'}
            rel="noreferrer"
          >
            <>
              <SuperfestPresentedBy />
            </>
          </a>
        </SuperFestPoweredContainer>
      ) : null}
    </>
  );
};
