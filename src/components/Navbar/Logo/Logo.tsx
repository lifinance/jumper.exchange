import { JumperLearnLogo, JumperLogo } from '@/components/illustrations';
import { LogoWrapper } from '@/components/illustrations/Logo.style';
import { JumperLogoBlack } from 'src/components/illustrations/JumperLogoBlack';

type LogoProps = {
  variant: 'default' | 'learn' | 'superfest';
};

export const Logo = ({ variant }: LogoProps) => {
  let logo = <JumperLogo />;
  if (variant === 'learn') {
    logo = <JumperLearnLogo />;
  } else if (variant === 'superfest') {
    logo = <JumperLogoBlack />;
  }
  return <LogoWrapper>{logo}</LogoWrapper>;
};
