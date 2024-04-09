import { Typography } from '@mui/material';
import DialogTransaction from '../styled/DialogTransaction';
import Tcu29SaleAbi from '../../abi/Tcu29Sale.json';
import { ADDRESS_TCU29SALE } from '../../constants/addresses';

export default function DialogDistribute() {
  return (
    <>
      <DialogTransaction
        address={ADDRESS_TCU29SALE}
        abi={Tcu29SaleAbi}
        functionName="managerDistributeCzusd"
        title="DISTRIBUTE CZUSD"
        btn={<button className="primary-btn">DISTRIBUTE</button>}
      >
        <Typography sx={{ fontSize: '1em', lineHeight: '1.25em' }}>
          Distributes the collected CZUSD from selling TCu29 to the registered
          recipients, based on their weight.
        </Typography>
      </DialogTransaction>
    </>
  );
}
