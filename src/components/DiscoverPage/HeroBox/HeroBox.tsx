import { SuperfestLogo } from 'src/components/illustrations/SuperfestLogo';
import { HeroButtonBox, HeroMainBox } from './HeroBox.style';
import { Button } from 'src/components/Button';
import { SoraTypography } from '../LandingPage/LandingPage.style';
import Link from 'next/link';
import { type Theme, useMediaQuery } from '@mui/material';
import { SuperfestPresentedBy } from 'src/components/illustrations/SuperfestPresentedBy';
import Image from 'next/image';

export const HeroBox = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  return (
    <HeroMainBox>
      <>
        {isMobile ? (
          <Image
            src="https://taiko.xyz/img/brand/logo-pw.svg"
            alt="taiko-background"
          />
        ) : (
          <Image
            src="https://taiko.xyz/img/brand/logo-pw.svg"
            alt="taiko-background"
            width={'600'}
            height={'300'}
          />
        )}
      </>
      <Link
        style={{ textDecoration: 'none' }}
        href={'https://taiko.xyz/'}
        target="_blank"
      >
        <HeroButtonBox>
          <Button
            id="learn-more-button"
            disabled={false}
            variant="primary"
            size="large"
            styles={{
              color: '#ffffff',
              alignItems: 'center',
              minWidth: { xs: '300px', md: '400px' },
              padding: '16px',
            }}
          >
            <SoraTypography fontSize="16px" lineHeight="18px" fontWeight={600}>
              {String('Learn More').toUpperCase()}
            </SoraTypography>
          </Button>
        </HeroButtonBox>
      </Link>
    </HeroMainBox>
  );
};
