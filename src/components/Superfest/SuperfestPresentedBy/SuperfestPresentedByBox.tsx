'use client';

import { usePathname } from 'next/navigation';
import { SuperfestPresentedBy } from 'src/components/illustrations/SuperfestPresentedBy';
import { JUMPER_LEARN_PATH, JUMPER_LOYALTY_PATH } from 'src/const/urls';
import { SuperFestPoweredContainer } from './SuperfestPresentedByBox.style';

export const SuperfestPresentedByBox = () => {
  const currentPath = usePathname();
  const isLearn = currentPath?.includes(JUMPER_LEARN_PATH);
  const isProfile = currentPath?.includes(JUMPER_LOYALTY_PATH);

  const handleClick = () => {};

  return (
    <>
      {!isLearn && !isProfile ? (
        <SuperFestPoweredContainer>
          <a
            className={'link-superfest'}
            onClick={handleClick}
            href={'https://superfest.optimism.io/'}
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
