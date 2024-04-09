import { useTheme } from '@mui/material';
import React from 'react';
import {
  ADDRESS_CZUSD,
  ADDRESS_TCU29,
  ADDRESS_TCU29SALE,
  ADDRESS_USDT,
} from '../../constants/addresses';

export default function FooterArea() {
  const theme = useTheme();

  return (
    <div className="tempestas-contentblock--navy">
      <div className="tempestas-contentblock--navy-wrapper">
        <h2 className="tempestas-contentblock--navy-title">
          Latest TCu29 Copper Token Details
        </h2>
      </div>

      <div className="tempestas-contentblock--navy-content">
        <h3>Token Contract Addresses (BSC)</h3>
        <p>
          <span className="strong-text">TCU29:</span> {ADDRESS_TCU29}
        </p>
        <p>
          <span className="strong-text">USDT:</span> {ADDRESS_USDT}
        </p>
        <p>
          <span className="strong-text">CZUSD:</span> {ADDRESS_CZUSD}
        </p>

        <h3>Dapp Contract Address (BSC)</h3>
        <p>
          <span className="strong-text">TCU29 Sale:</span> {ADDRESS_TCU29SALE}
        </p>
      </div>
    </div>
  );
}
