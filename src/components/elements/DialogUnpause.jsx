import { Typography } from '@mui/material';
import DialogTransaction from '../styled/DialogTransaction';
import Tcu29SaleAbi from '../../abi/Tcu29Sale.json';
import { ADDRESS_TCU29SALE } from '../../constants/addresses';

export default function DialogUnpause() {
  return (
    <>
      <DialogTransaction
        address={ADDRESS_TCU29SALE}
        abi={Tcu29SaleAbi}
        functionName="managerUnpause"
        title="UNPAUSE TCU29 SALE DAPP"
        btn={<button className="primary-btn">UNPAUSE</button>}
      >
        <Typography sx={{ fontSize: '1em', lineHeight: '1.25em' }}>
          Unpauses the TCU29 Sale Dapp, allowing anyone to purchase TCu29 if it
          is available in the dapp.
        </Typography>
      </DialogTransaction>
    </>
  );
}
