import React from 'react';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import { Typography } from '@mui/material';
import FooterArea from '../components/layouts/FooterArea';
import DialogBuyTcu29 from '../components/elements/DialogBuyTcu29';
import { BigNumber, ethers } from 'ethers';
import { ADDRESS_TCU29, ADDRESS_TCU29SALE } from '../constants/addresses';
import { parseEther } from 'viem';
import { bnToCompact } from '../utils/bnToFixed';
import Tcu29SaleAbi from '../abi/Tcu29Sale.json';
import DialogPause from '../components/elements/DialogPause';
import DialogUnpause from '../components/elements/DialogUnpause';
import DialogDistribute from '../components/elements/DialogDistribute';
import DialogSetPrice from '../components/elements/DialogSetPrice';

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: dataPrice,
    isError: isErrorPrice,
    isLoading: isLoadingPrice,
  } = useContractRead({
    address: ADDRESS_TCU29SALE,
    abi: Tcu29SaleAbi,
    functionName: 'price',
    watch: true,
  });

  const priceTcu29 =
    !isLoadingPrice && !isErrorPrice && !!dataPrice
      ? BigNumber.from(dataPrice)
      : BigNumber.from('1');

  const {
    data: tokenBalDataTcu29,
    isError: tokenBalIsErrorTcu29,
    isLoading: tokenBalIsLoadingTcu29,
  } = useBalance({
    address: address,
    token: ADDRESS_TCU29,
    watch: true,
    enabled: !!address,
  });

  const tokenBalTcu29 =
    !tokenBalIsLoadingTcu29 &&
    !tokenBalIsErrorTcu29 &&
    !!tokenBalDataTcu29?.value
      ? BigNumber.from(tokenBalDataTcu29?.value ?? 0)
      : BigNumber.from(parseEther('0'));

  const {
    data: tokenBalDataCzusdSaleDapp,
    isError: tokenBalIsErrorCzusdSaleDapp,
    isLoading: tokenBalIsLoadingCzusdSaleDapp,
  } = useBalance({
    address: address,
    token: ADDRESS_TCU29,
    watch: true,
    enabled: !!address,
  });

  const tokenBalCzusdSaleDapp =
    !tokenBalIsLoadingCzusdSaleDapp &&
    !tokenBalIsErrorCzusdSaleDapp &&
    !!tokenBalDataCzusdSaleDapp?.value
      ? BigNumber.from(tokenBalDataCzusdSaleDapp?.value ?? 0)
      : BigNumber.from(parseEther('0'));

  const {
    data: tokenBalDataTcu29Sale,
    isError: tokenBalIsErrorTcu29Sale,
    isLoading: tokenBalIsLoadingTcu29Sale,
  } = useBalance({
    address: ADDRESS_TCU29SALE,
    token: ADDRESS_TCU29,
    watch: true,
  });

  const tokenBalTcu29Sale =
    !tokenBalIsLoadingTcu29Sale &&
    !tokenBalIsErrorTcu29Sale &&
    !!tokenBalDataTcu29Sale?.value
      ? BigNumber.from(tokenBalDataTcu29Sale?.value ?? 0)
      : BigNumber.from(parseEther('0'));

  const {
    data: hasRoleDataManager,
    isError: hasRoleIsErrorManager,
    isLoading: hasRoleIsLoadingManager,
  } = useContractRead({
    address: ADDRESS_TCU29SALE,
    abi: Tcu29SaleAbi,
    functionName: 'hasRole',
    watch: true,
    args: [ethers.utils.id('MANAGER_ROLE'), address],
    enabled: !!address,
  });

  const hasRoleManager =
    !hasRoleIsLoadingManager && !hasRoleIsErrorManager && !!hasRoleDataManager
      ? true
      : false;

  const {
    data: isPausedData,
    isError: isPausedIsError,
    isLoading: isPausedIsLoading,
  } = useContractRead({
    address: ADDRESS_TCU29SALE,
    abi: Tcu29SaleAbi,
    functionName: 'paused',
    watch: true,
    enabled: !!address,
  });

  const isPaused =
    !isPausedIsLoading && !isPausedIsError && !!isPausedData ? true : false;

  return (
    <>
      {hasRoleManager && (
        <div className="tempestas-contentblock--white">
          <div className="tempestas-contentblock--white-wrapper">
            <div className="tempestas-contentblock--content-left">
              <h3 className="tempestas-contentblock--white-title">
                Administrative Functions
              </h3>
              <p className="no-space--top-bottom">
                To make TCu29 available for sale, send TCu29 tokens to: <br />
                {ADDRESS_TCU29SALE}
              </p>
            </div>

            <div className="tempestas-contentblock--content-right">
              <div className="tempestas-contentblock--flex">
                <div className="tempestas-hero--content">
                  <Typography>
                    Pause Status: {isPaused ? 'PAUSED' : 'NOT PAUSED'}
                  </Typography>
                  {isPaused ? <DialogUnpause /> : <DialogPause />}
                </div>
                <div className="tempestas-hero--content">
                  <Typography>
                    CZUSD to Distribute:{' '}
                    {bnToCompact(tokenBalCzusdSaleDapp, 18, 5)}
                  </Typography>
                  <DialogDistribute />
                </div>
                <div className="tempestas-hero--content">
                  <Typography>
                    Current TCu29 Price: ${bnToCompact(priceTcu29, 3, 5)}
                  </Typography>
                  <DialogSetPrice
                    btn={<button className="primary-btn">SET PRICE</button>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="tempestas-hero">
        <div className="tempestas-hero-container">
          <div className="tempestas-hero-title-wrapper">
            <p className="tempestas-hero--subtitle">
              Become a TCu29 Token Holder
            </p>
            <h1 className="tempestas-hero--title">
              Purchase TCu29
              <br />
              Tokens Now
            </h1>
            <p className="tempestas-hero--content">
              Buy TCu29 tokens, each backed by 1 pound of physical copper.
              <br />
              RWA copper backed blockchain tokens suitable for every portfolio.
            </p>
            <DialogBuyTcu29
              btn={
                <button className="teritary-btn">Purchase Tokens Today</button>
              }
            />
          </div>
        </div>
      </div>

      <div className="tempestas-valueticker">
        <div className="tempestas-valueticker-container">
          <div className="tempestas-valueticker--title">
            <h4>
              <i className="fa-solid fa-chart-simple"></i> Current Value
            </h4>
          </div>
          <div className="tempestas-valueticker--text">
            <p>
              <span className="strong-text">TCu29 Price:</span>{' '}
              {priceTcu29?.eq(1)
                ? 'LOADING'
                : '$' + bnToCompact(priceTcu29, 3, 5)}
            </p>
            <p>
              <span className="strong-text">Purchasable:</span>{' '}
              {priceTcu29?.eq(1)
                ? 'LOADING'
                : bnToCompact(tokenBalTcu29Sale, 18, 5) +
                  ' ($' +
                  bnToCompact(
                    tokenBalTcu29Sale.mul(priceTcu29).div(1000),
                    18,
                    5
                  ) +
                  ')'}
            </p>
            <p>
              <span className="strong-text">Your TCu29:</span>{' '}
              {priceTcu29?.eq(1)
                ? 'LOADING'
                : bnToCompact(tokenBalTcu29, 18, 5) +
                  ' ($' +
                  bnToCompact(tokenBalTcu29.mul(priceTcu29).div(1000), 18, 5) +
                  ')'}
            </p>
          </div>
        </div>
      </div>
      <FooterArea />
    </>
  );
}
