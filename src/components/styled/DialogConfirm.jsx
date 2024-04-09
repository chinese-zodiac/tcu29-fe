import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';

export default function DialogConfirm({
  children,
  sx,
  handleConfirmed,
  open,
  setOpen,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open} sx={sx}>
        <div className="tempestas-contentblock--modal">
          {children}
          <div className="tempestas-contentblock--flex end">
            <button onClick={handleClose} className="secondary-btn">
              <Typography sx={{ lineHeight: '1em' }}>NO</Typography>
              GO BACK
            </button>
            <button
              onClick={() => {
                handleConfirmed();
              }}
              className="primary-btn"
            >
              <Typography sx={{ lineHeight: '1em' }}>YES</Typography>
              SEND TX
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
