import { DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';

export default function DialogInfo({ btn, children, sx }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {React.cloneElement(btn, {
        onClick: handleClickOpen,
      })}
      <Dialog onClose={handleClose} open={open} sx={sx}>
        <DialogContent
          sx={{
            padding: '1em',
            background: '#ffffff',
            border: 'solid 4px #9E5635',
            borderRadius: '10px',
            color: 'black',
          }}
        >
          {children}
          <button onClick={handleClose} className="primary-btn">
            SEE YA LATER!
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
