'use client';
import { Snackbar as MuiSnackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { useMenuStore } from '@/stores/menu';

export const Snackbar = () => {
  const [openSnackbar, setSnackbarState] = useMenuStore((state) => [
    state.openSnackbar,
    state.setSnackbarState,
  ]);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState(false);
  };

  return (
    <MuiSnackbar
      open={openSnackbar.open}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        zIndex: 9999,
        '.MuiAlert-message:first-letter': {
          textTransform: 'capitalize',
        },
      }}
    >
      <MuiAlert elevation={6} variant="filled" severity={openSnackbar.severity}>
        {openSnackbar.label}
      </MuiAlert>
    </MuiSnackbar>
  );
};
