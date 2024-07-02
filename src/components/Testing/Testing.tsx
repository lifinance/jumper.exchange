'use client';

const Testing = () => {
  const isMobile =
    typeof window !== 'undefined' &&
    (window as any)?.navigator.userAgentData.mobile
      ? 'true'
      : 'false';
  const provider =
    typeof window !== 'undefined' && (window as any)?.ethereum
      ? 'true'
      : 'false';
  const isMetamask = `${
    typeof navigator !== 'undefined' &&
    navigator?.userAgent?.includes('MetaMaskMobile')
  }`;
  const isPhantom = `${
    typeof navigator !== 'undefined' &&
    navigator?.userAgent?.includes('Phantom')
  }`;
  const userAgent = `${
    typeof navigator !== 'undefined' && navigator?.userAgent
  }`;
  typeof navigator !== 'undefined' && console.log('userAgent', userAgent);
  console.log('isMobile', isMobile);
  return (
    <>
      -
      <p>
        userAgent
        {userAgent}
      </p>
      <p>
        window.ethereum?
        {provider}
      </p>
      <p>
        isMobile?
        {isMobile}
      </p>
      <p>
        IsMetamask?
        {isMetamask}
      </p>
      <p>
        IsPhantom?
        {isPhantom}
      </p>
    </>
  );
};

export default Testing;
