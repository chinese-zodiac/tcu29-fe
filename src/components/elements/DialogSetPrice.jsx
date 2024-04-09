import { TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import { BigNumber } from 'ethers';
import { cloneElement, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import Tcu29SaleAbi from '../../abi/Tcu29Sale.json';
import { ADDRESS_TCU29SALE } from '../../constants/addresses';
import { bnToCompact } from '../../utils/bnToFixed';
import EtherTextField from '../elements/EtherTextField';
import DialogTransaction from '../styled/DialogTransaction';

export default function DialogSetPrice({ btn, sx }) {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [open, setOpen] = useState(false);
  const [inputWad, setInputWad] = useState(1.0);

  const {
    data: dataPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
  } = useContractRead({
    address: ADDRESS_TCU29SALE,
    abi: Tcu29SaleAbi,
    functionName: 'price',
    watch: true,
    enabled: !!address,
  });

  const priceTcu29 =
    !isLoadingPrice && !isErrorPrice && !!dataPrice
      ? dataPrice
      : BigNumber.from('1000');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {cloneElement(btn, {
        onClick: handleClickOpen,
      })}
      <Dialog onClose={handleClose} open={open} sx={sx}>
        <div className="tempestas-contentblock--modal">
          <div className="tempestas-contentblock--flex evenly">
            <Box
              sx={{
                position: 'relative',
                textAlign: 'right',
                paddingBottom: '0.5em',
                width: '100%',
              }}
            >
              <EtherTextField
                decimals={3}
                onChange={setInputWad}
                value={inputWad?.toString()}
                placeholder="0.0"
                autofocus
                fullWidth
                renderInput={(props) => (
                  <TextField
                    variant="standard"
                    sx={{
                      padding: '0.25em',
                      width: '90%',
                      '& .MuiInputBase-input': {
                        fontSize: '1.5em',
                        color: 'black',
                        textAlign: 'right',
                        width: '100%',
                        display: 'inline-block',
                      },
                    }}
                    {...props}
                  />
                )}
              />
            </Box>
          </div>
          <div className="tempestas-contentblock--flex end">
            <button onClick={handleClose} className="secondary-btn">
              <Typography sx={{ lineHeight: '1em' }}>EXIT</Typography>
            </button>
            <DialogTransaction
              title="Purchase TCu29"
              btn={
                <button
                  onClick={() => {
                    handleConfirmed();
                  }}
                  className="primary-btn"
                >
                  <Typography sx={{ lineHeight: '1em' }}>SET PRICE</Typography>
                </button>
              }
              address={ADDRESS_TCU29SALE}
              abi={Tcu29SaleAbi}
              functionName="managerSetPrice"
              args={[inputWad?.toString()]}
            >
              <Typography sx={{ fontSize: '1em', lineHeight: '1em' }}>
                <br />
                Old Price: ${bnToCompact(priceTcu29, 3, 5)}
                <br />
                New Price: ${bnToCompact(inputWad, 3, 5)}
              </Typography>
            </DialogTransaction>
          </div>
        </div>
      </Dialog>
    </>
  );
}
