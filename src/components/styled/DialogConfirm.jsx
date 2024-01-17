import { Button, DialogContent, Typography } from '@mui/material';
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
        <DialogContent
          sx={{
            padding: '1em',
            background: '#ede8e6',
            border: 'solid 4px #9E5635',
            borderRadius: '10px',
            color: 'black',
          }}
        >
          {children}
          <br />
          <Button
            onClick={handleClose}
            variant="text"
            autoFocus
            sx={{
              backgroundColor: '#5D2410',
              borderRadius: '1em',
              border: 'solid 1px #ede8e6',
              display: 'inline-block',
              fontSize: '1em',
              width: '6em',
              padding: '0.4em 0.25em',
              lineHeight: '1.2em',
              color: '#ede8e6',
              margin: 0,
              marginRight: '2em',
              '&:hover': {
                backgroundColor: '#5D2410',
              },
            }}
          >
            <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
              NO
            </Typography>
            GO BACK
          </Button>
          <Button
            onClick={() => {
              handleConfirmed();
            }}
            variant="text"
            autoFocus
            sx={{
              backgroundColor: '#5D2410',
              borderRadius: '1em',
              border: 'solid 1px #ede8e6',
              display: 'inline-block',
              fontSize: '1em',
              width: '6em',
              padding: '0.4em 0.25em',
              lineHeight: '1.2em',
              color: '#ede8e6',
              margin: 0,
              '&:hover': {
                backgroundColor: '#5D2410',
              },
            }}
          >
            <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
              YES
            </Typography>
            SEND TX
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
