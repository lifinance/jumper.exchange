import { Button } from '@/components/Button';
import { useClientTranslation } from '@/i18n/useClientTranslation';
import { Modal, Typography } from '@mui/material';
import {
  MultisigConnectedAlertContainer,
  MultisigConnectedAlertIcon,
  MultisigConnectedAlertIconContainer,
} from '.';

export const MultisigConnectedAlert: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { t } = useClientTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <MultisigConnectedAlertContainer>
        <MultisigConnectedAlertIconContainer>
          <MultisigConnectedAlertIcon />
        </MultisigConnectedAlertIconContainer>
        <Typography
          fontWeight={700}
          textAlign={'center'}
          marginY={4}
          style={{
            fontSize: '1.125rem',
          }}
        >
          {t('multisig.connected.title')}
        </Typography>
        <Typography fontSize={'1.125 rem'} marginY={4}>
          {t('multisig.connected.description')}
        </Typography>
        <Button
          variant="primary"
          onClick={onClose}
          styles={{
            width: '100%',
          }}
        >
          {t('button.okay')}
        </Button>
      </MultisigConnectedAlertContainer>
    </Modal>
  );
};
