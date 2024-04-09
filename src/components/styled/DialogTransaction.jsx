import { Dialog, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDebounce } from 'usehooks-ts';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import DialogConfirm from './DialogConfirm';

export default function DialogTransaction({
  btn,
  children,
  title,
  sx,
  address,
  abi,
  functionName,
  args,
  onSuccess,
  value,
  gas,
}) {
  const [open, setOpen] = React.useState(false);
  const [openTxStatus, setOpenTxStatus] = React.useState(false);

  const debouncedAddress = useDebounce(address);
  const debouncedFunctionName = useDebounce(functionName);
  const debouncedArgs = useDebounce(args);
  const debouncedValue = useDebounce(value);
  const debouncedGas = useDebounce(gas);
  const { config } = usePrepareContractWrite({
    abi,
    address: debouncedAddress,
    functionName: debouncedFunctionName,
    args: debouncedArgs,
    gas: debouncedGas,
    value: debouncedValue,
  });
  const { data, error, isError, isLoading, isSuccess, write } =
    useContractWrite({ ...config, onSuccess });
  const txHash = data?.hash ?? '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseTxStatus = () => {
    setOpenTxStatus(false);
  };

  const handleConfirmed = () => {
    //send tx
    write?.();
    //open watch tx dialog
    handleClose();
    setOpenTxStatus(true);
  };

  return (
    <>
      {React.cloneElement(btn, {
        onClick: handleClickOpen,
      })}
      <DialogConfirm
        sx={sx}
        handleConfirmed={handleConfirmed}
        open={open}
        setOpen={setOpen}
      >
        <Typography
          as="h1"
          sx={{
            fontSize: '2em',
            lineHeight: '1em',
            marginBottom: '0.5em',
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ lineHeight: '1.2em' }}>{children}</Typography>
      </DialogConfirm>
      <Dialog onClose={handleClose} open={openTxStatus} sx={sx}>
        <div className="tempestas-contentblock--modal">
          <div className="tempestas-contentblock--flex">
            <Typography
              as="h1"
              sx={{
                color: '#06a69e',
                fontWeight: 'bold',
                fontSize: '2em',
                lineHeight: '1em',
                marginBottom: '0.5em',
              }}
            >
              {title}
            </Typography>
          </div>
          <div className="tempestas-contentblock--flex">
            {!!isLoading && 'Check your wallet and confirm the transaction...'}
            {!!isSuccess && (
              <>
                <Typography>TX INFO:</Typography>
                <Typography
                  as="a"
                  color="black"
                  target="_blank"
                  href={'https://bscscan.com/tx/' + txHash}
                >
                  {txHash.slice(0, 5) + '...' + txHash.slice(-3)}
                </Typography>

                <Box
                  sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <CountdownCircleTimer
                    isPlaying
                    duration={9}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[9, 6, 3, 0]}
                    onComplete={() => ({ shouldRepeat: false })}
                  >
                    {({ remainingTime }) => {
                      if (remainingTime === 0) {
                        return (
                          <>
                            TX
                            <br />
                            COMPLETE!
                          </>
                        );
                      } else {
                        return (
                          <Box>
                            TX Processing:
                            <br />
                            {remainingTime}
                            <br />
                            Seconds
                          </Box>
                        );
                      }
                    }}
                  </CountdownCircleTimer>
                </Box>
              </>
            )}
          </div>

          {!!isError && (
            <div className="tempestas-contentblock--flex column">
              <Typography>ERROR:</Typography>
              <span
                style={{
                  wordBreak: 'break-word',
                }}
              >
                {error?.message}
              </span>
            </div>
          )}
          <div className="tempestas-contentblock--flex end">
            <button
              onClick={() => {
                handleCloseTxStatus();
              }}
              className="secondary-btn"
            >
              EXIT
            </button>
            {!isSuccess && (
              <button onClick={handleConfirmed} className="primary-btn">
                RETRY
              </button>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
