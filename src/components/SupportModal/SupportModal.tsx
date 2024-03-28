'use client';

import { HeaderHeight } from '@/const/headerHeight';
import { useMenuStore } from '@/stores/menu';
import type { Breakpoint } from '@mui/material';
import { useTheme } from '@mui/material';
import WidgetBot from '@widgetbot/react-embed';
import { Modal, SupportModalContainer } from './SupportModal.style';

export const SupportModal = () => {
  const theme = useTheme();
  const [openSupportModal, setSupportModalState] = useMenuStore((state) => [
    state.openSupportModal,
    state.setSupportModalState,
  ]);

  return (
    <Modal open={openSupportModal} onClose={() => setSupportModalState(false)}>
      <SupportModalContainer>
        <WidgetBot
          server="849912621360218112" // LI.FI
          channel="1108568727148056646" // #🩹︱web-support
          shard="https://emerald.widgetbot.io"
          style={{
            width: '100%',
            height: '80vh',
            maxHeight: `calc( 100vh - ${HeaderHeight.XS} )`,
            [theme.breakpoints.up('sm' as Breakpoint)]: {
              maxHeight: `calc( 100vh - ${HeaderHeight.SM} )`,
            },
            [theme.breakpoints.up('md' as Breakpoint)]: {
              height: 500,
            },
          }}
        />
      </SupportModalContainer>
    </Modal>
  );
};
