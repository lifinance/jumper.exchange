'use client';
import { JumperLearnLogo, JumperLogo } from '@/components/illustrations';
import { LogoWrapper } from '@/components/illustrations/Logo.style';
import { usePartnerTheme } from '@/hooks/usePartnerTheme';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material';
import Image from 'next/image';
type LogoProps = {
  variant: 'default' | 'learn';
};

export const Logo = ({ variant }: LogoProps) => {
  const logo = variant === 'default' ? <JumperLogo /> : <JumperLearnLogo />;
  const { logoUrl, activeUid, logo: partnerLogo } = usePartnerTheme();
  const theme = useTheme();
  return (
    <LogoWrapper>
      {activeUid && logoUrl && partnerLogo ? (
        <>
          {logo}
          <ClearIcon
            width="32px"
            height="32px"
            sx={{
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.black.main
                  : theme.palette.grey[500],
              width: '32px',
              height: '32px',
              marginLeft: theme.spacing(-2),
              marginRight: theme.spacing(2),
            }}
          />
          <Image
            alt="jumper-partner-logo"
            src={logoUrl.href}
            width={partnerLogo?.width}
            height={partnerLogo?.height}
          />
        </>
      ) : (
        logo
      )}
    </LogoWrapper>
  );
};
