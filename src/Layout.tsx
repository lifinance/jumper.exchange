import type { PropsWithChildren } from 'react';
import { BackgroundGradient } from './components/BackgroundGradient/BackgroundGradient';
import { Navbar } from './components/Navbar/Navbar';
import { PoweredBy } from './components/PoweredBy/PoweredBy';
import { Snackbar } from './components/Snackbar/Snackbar';
import { SupportModal } from './components/SupportModal/SupportModal';
import Image from 'next/image';
import { SuperfestPresentedByBox } from './components/Superfest/SuperfestPresentedBy/SuperfestPresentedByBox';
import { Box } from '@mui/material';

interface LayoutProps {
  fixedPoweredBy?: boolean | undefined;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  fixedPoweredBy,
}) => {
  return (
    <>
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          textAlign: 'center',
          padding: '10px',
          background: 'rgb(101 0 254 / 10%)',
          fontWeight: 700,
        }}
      >
        To ensure a seamless experience on Jumper, please update MetaMask to the
        latest version. This update solves a bug present in older versions.{' '}
        <Image
          alt=""
          width={24}
          height={24}
          style={{ marginLeft: 8 }}
          src="https://cdn.discordapp.com/emojis/898917406548836402.webp?size=96&quality=lossless"
        />
      </div>
      <BackgroundGradient />
      <Navbar />
      {children}
      <SupportModal />
      <Snackbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <SuperfestPresentedByBox />
        <PoweredBy fixedPosition={fixedPoweredBy} />
      </Box>
    </>
  );
};
