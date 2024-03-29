import React from 'react';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import ConnectWallet from '../components/elements/ConnectWallet';
import { Typography, TextField, Box } from '@mui/material';
import FooterArea from '../components/layouts/FooterArea';
import { LINK_OPERATOR_INFO } from '../constants/links';
import Grid2 from '@mui/material/Unstable_Grid2';
import DialogBuyTcu29 from '../components/elements/DialogBuyTcu29';
import ButtonPrimary from '../components/styled/ButtonPrimary';
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
      <ConnectWallet />
      <Box
        as="img"
        src="./images/copper-icon.png"
        sx={{
          width: '10em',
          height: '10em',
          marginTop: '1em',
        }}
      />
      <Typography as="h1" sx={{ fontSize: '2em' }}>
        TCU29 SALE DAPP
      </Typography>
      <Typography
        as="p"
        sx={{
          maxWidth: '360px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '1em',
          lineHeight: '1.2em',
        }}
      >
        Buy TCu29 tokens, each backed by 1 pound of physical copper. RWA copper
        backed blockchain tokens suitable for every portfolio.
        <br />
        Learn more at{' '}
        <Typography
          as="a"
          href={LINK_OPERATOR_INFO}
          target="_blank"
          rel="noreferrer"
          sx={{ color: '#ffffff' }}
        >
          tempestascoins.io
        </Typography>
      </Typography>
      <br />
      <Grid2 container spacing={1} columns={2}>
        <Grid2 xs={1} sx={{ textAlign: 'right' }}>
          TCu29 Price:
        </Grid2>
        <Grid2 xs={1} sx={{ textAlign: 'left' }}>
          {priceTcu29?.eq(1) ? 'LOADING' : '$' + bnToCompact(priceTcu29, 3, 5)}
        </Grid2>
        <Grid2 xs={1} sx={{ textAlign: 'right' }}>
          Purchasable:
        </Grid2>
        <Grid2 xs={1} sx={{ textAlign: 'left' }}>
          {priceTcu29?.eq(1)
            ? 'LOADING'
            : bnToCompact(tokenBalTcu29Sale, 18, 5) +
              ' ($' +
              bnToCompact(tokenBalTcu29Sale.mul(priceTcu29).div(1000), 18, 5) +
              ')'}
        </Grid2>
        <Grid2 xs={1} sx={{ textAlign: 'right' }}>
          Your TCu29:
        </Grid2>
        <Grid2 xs={1} sx={{ textAlign: 'left' }}>
          {priceTcu29?.eq(1)
            ? 'LOADING'
            : bnToCompact(tokenBalTcu29, 18, 5) +
              ' ($' +
              bnToCompact(tokenBalTcu29.mul(priceTcu29).div(1000), 18, 5) +
              ')'}
        </Grid2>
      </Grid2>
      <DialogBuyTcu29
        btn={
          <ButtonPrimary
            sx={{
              width: '8em',
              marginTop: '0.66em',
              fontSize: '1.5em',
              position: 'relative',
              fontWeight: 'bold',
              textTransform: 'none',
              color: '#be8961',
              borderRadius: '1.5em',
              border: 'solid 5px #be8961',
              fontSize: 28,
              backgroundColor: '#f3f3f3',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            BUY NOW
            <Box
              sx={{
                display: 'block',
                position: 'absolute',
                fontSize: '36px',
                right: '15px',
                top: '-0.17em',
              }}
            >
              ›
            </Box>
          </ButtonPrimary>
        }
      />
      {hasRoleManager && (
        <>
          <br />
          <br />
          <hr />
          <Typography as="h2" sx={{ fontSize: '2em' }}>
            Administrative Functions
          </Typography>
          <Typography>
            To make TCu29 available for sale, send TCu29 tokens to: <br />
            {ADDRESS_TCU29SALE}
          </Typography>
          <br />
          <Typography>
            Pause Status: {isPaused ? 'PAUSED' : 'NOT PAUSED'}
          </Typography>
          {isPaused ? <DialogUnpause /> : <DialogPause />}
          <br />
          <br />
          <Typography>
            CZUSD to Distribute: {bnToCompact(tokenBalCzusdSaleDapp, 18, 5)}
          </Typography>
          <DialogDistribute />
          <br />
          <br />
          Current TCu29 Price: ${bnToCompact(priceTcu29, 3, 5)}
          <br />
          <DialogSetPrice
            btn={
              <ButtonPrimary
                sx={{
                  backgroundColor: '#be8961',
                  borderRadius: '1em',
                  border: 'solid 1px #ffffff',
                  color: '#ffffff',
                  display: 'inline-block',
                  fontSize: '1em',
                  width: '8em',
                  padding: '0.4em 0.25em',
                  lineHeight: '1.2em',
                  margin: 0,
                  marginRight: '1em',
                  '&:hover': {
                    backgroundColor: '#080830',
                  },
                }}
              >
                SET PRICE
              </ButtonPrimary>
            }
          />
        </>
      )}
      <br />
      <FooterArea />
    </>
  );
}
