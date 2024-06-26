import { Slider, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import { BigNumber, ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import { cloneElement, useState } from 'react';
import { useAccount, useBalance, useContractRead } from 'wagmi';
import IERC20Abi from '../../abi/IERC20.json';
import Tcu29SaleAbi from '../../abi/Tcu29Sale.json';
import {
  ADDRESS_TCU29SALE,
  ADDRESS_TCU29,
  ADDRESS_CZUSD,
  ADDRESS_USDT,
} from '../../constants/addresses';
import { bnToCompact } from '../../utils/bnToFixed';
import EtherTextField from '../elements/EtherTextField';
import DialogTransaction from '../styled/DialogTransaction';

export default function DialogBuyTcu29({ btn }) {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [open, setOpen] = useState(false);
  const [inputWad, setInputWad] = useState(parseEther('0'));

  const [isCzusd, setIsCzusd] = useState(false);

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

  const {
    data: dataAllowanceUsdt,
    isError: isErrorAllowanceUsdt,
    isLoading: isLoadingAllowanceUsdt,
  } = useContractRead({
    address: ADDRESS_USDT,
    abi: IERC20Abi,
    functionName: 'allowance',
    watch: true,
    args: [address, ADDRESS_TCU29SALE],
    enabled: !!address,
  });

  const allowanceUsdt =
    !isLoadingAllowanceUsdt && !isErrorAllowanceUsdt && !!dataAllowanceUsdt
      ? dataAllowanceUsdt
      : parseEther('0');

  const {
    data: dataAllowanceCzusd,
    isError: isErrorAllowanceCzusd,
    isLoading: isLoadingAllowanceCzusd,
  } = useContractRead({
    address: ADDRESS_CZUSD,
    abi: IERC20Abi,
    functionName: 'allowance',
    watch: true,
    args: [address, ADDRESS_TCU29SALE],
    enabled: !!address,
  });

  const allowanceCzusd =
    !isLoadingAllowanceCzusd && !isErrorAllowanceCzusd && !!dataAllowanceCzusd
      ? dataAllowanceCzusd
      : parseEther('0');

  const {
    data: tokenBalDataUsdt,
    isError: tokenBalIsErrorUsdt,
    isLoading: tokenBalIsLoadingUsdt,
  } = useBalance({
    address: address,
    token: ADDRESS_USDT,
    watch: true,
    enabled: !!address,
  });

  const tokenBalUsdt =
    !tokenBalIsLoadingUsdt && !tokenBalIsErrorUsdt && !!tokenBalDataUsdt?.value
      ? BigNumber.from(tokenBalDataUsdt?.value ?? 0)
      : parseEther('0');

  const {
    data: tokenBalDataCzusd,
    isError: tokenBalIsErrorCzusd,
    isLoading: tokenBalIsLoadingCzusd,
  } = useBalance({
    address: address,
    token: ADDRESS_CZUSD,
    watch: true,
    enabled: !!address,
  });

  const tokenBalCzusd =
    !tokenBalIsLoadingCzusd &&
    !tokenBalIsErrorCzusd &&
    !!tokenBalDataCzusd?.value
      ? BigNumber.from(tokenBalDataCzusd?.value ?? 0)
      : parseEther('0');

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
      : parseEther('0');

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
      <Dialog onClose={handleClose} open={open}>
        <div className="tempestas-contentblock--modal">
          <div className="tempestas-contentblock--flex evenly">
            <button
              onClick={() => {
                setIsCzusd(false);
                setInputWad(BigNumber.from(0));
              }}
              className="primary-btn"
            >
              USDT
              <Box
                as="img"
                src="./images/tokens/usdt.svg"
                sx={{
                  width: '1em',
                  height: '1em',
                }}
              />
            </button>
            <button
              onClick={() => {
                setIsCzusd(true);
                setInputWad(BigNumber.from(0));
              }}
              className="primary-btn"
            >
              CZUSD
              <Box
                as="img"
                src="./images/tokens/czusd.svg"
                sx={{
                  width: '1em',
                  height: '1em',
                }}
              />
            </button>
          </div>
          <div className="tempestas-contentblock--flex top">
            <Box
              sx={{
                position: 'relative',
                textAlign: 'right',
                paddingBottom: '0.5em',
                width: '50%',
              }}
            >
              <EtherTextField
                decimals={18}
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
                        width: '80%',
                        display: 'inline-block',
                      },
                    }}
                    {...props}
                  />
                )}
              />
              <Box
                as="img"
                src={'./images/tokens/' + (isCzusd ? 'czusd.svg' : 'usdt.svg')}
                sx={{
                  position: 'absolute',
                  width: '2.5em',
                  height: ' 2.5em',
                  right: '0.3em',
                  top: '0.3em',
                }}
              />
              <Typography sx={{ display: 'inline-block' }}>
                {isCzusd ? 'CZUSD' : 'USDT'} BALANCE:{' '}
                {bnToCompact(isCzusd ? tokenBalCzusd : tokenBalUsdt, 18, 5)}
              </Typography>
              <button
                onClick={() =>
                  isCzusd
                    ? setInputWad(tokenBalCzusd)
                    : setInputWad(tokenBalUsdt)
                }
                className="secondary-btn xs-btn"
              >
                MAX
              </button>
            </Box>
            <Box
              sx={{
                position: 'relative',
                textAlign: 'right',
                paddingBottom: '0.5em',
                width: '50%',
              }}
            >
              <TextField
                variant="standard"
                disabled
                sx={{
                  padding: '0.25em',
                  width: '90%',
                  '& .MuiInputBase-input': {
                    fontSize: '1.5em',
                    color: 'black',
                    textAlign: 'right',
                    width: '80%',
                    display: 'inline-block',
                  },
                }}
                value={bnToCompact(
                  inputWad ? inputWad.mul(1000).div(priceTcu29) : 0,
                  18,
                  5
                )}
              />
              <Box
                as="img"
                src="./images/tokens/tcu29.png"
                sx={{
                  position: 'absolute',
                  width: '2.5em',
                  height: ' 2.5em',
                  right: '0.3em',
                  top: '0.3em',
                }}
              />
              <Typography sx={{ display: 'inline-block' }}>
                TCU29 TO PURCHASE
              </Typography>
            </Box>
          </div>
          <div className="tempestas-contentblock--flex">
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={(val) => val + '%'}
              onChange={(e, newValue) => {
                setInputWad(
                  (isCzusd ? tokenBalCzusd : tokenBalUsdt)
                    .mul(newValue)
                    .div(100)
                );
              }}
              sx={{
                color: '#06a69e',
              }}
            />
          </div>
          <div className="tempestas-contentblock--flex end">
            <button onClick={handleClose} className="secondary-btn">
              EXIT
            </button>
            {inputWad.gt(isCzusd ? allowanceCzusd : allowanceUsdt) ? (
              <DialogTransaction
                title={'APPROVE ' + (isCzusd ? 'CZUSD' : 'USDT')}
                btn={
                  <button
                    onClick={() => {
                      handleConfirmed();
                    }}
                    className="primary-btn"
                  >
                    APPROVE
                  </button>
                }
                address={isCzusd ? ADDRESS_CZUSD : ADDRESS_USDT}
                abi={IERC20Abi}
                functionName="approve"
                args={[
                  ADDRESS_TCU29SALE,
                  ethers.constants.MaxUint256?.toString(),
                ]}
              >
                <Typography
                  sx={{
                    fontSize: '1em',
                    lineHeight: '1em',
                    marginBottom: '0.5em',
                    color: '#06a69e',
                  }}
                >
                  TO
                </Typography>
                <Typography
                  sx={{
                    fontSize: '2em',
                    lineHeight: '1em',
                    marginBottom: '0.75em',
                  }}
                >
                  BUY TCU29
                </Typography>
                <Typography sx={{ fontSize: '1em', lineHeight: '1em' }}>
                  Send an Approve transaction to your wallet that will allow you
                  to buy TCu29 that are immediately transferred to your Wallet.
                  For Metamask, its recommended to use the default approve. That
                  way, you only have to do this once!
                </Typography>
              </DialogTransaction>
            ) : (
              <DialogTransaction
                title="Purchase TCu29"
                btn={
                  <button
                    onClick={() => {
                      handleConfirmed();
                    }}
                    className="primary-btn"
                  >
                    BUY
                  </button>
                }
                address={ADDRESS_TCU29SALE}
                abi={Tcu29SaleAbi}
                functionName={isCzusd ? 'buyTCu29Czusd' : 'buyTCu29Usdt'}
                args={[inputWad?.toString(), address]}
              >
                <Typography sx={{ fontSize: '1em', lineHeight: '1em' }}>
                  <br />
                  AMOUNTS:
                  <br />-{bnToCompact(inputWad, 18, 5)}{' '}
                  {isCzusd ? 'CZUSD' : 'USDT'}
                  <br />+
                  {bnToCompact(inputWad.mul(1000).div(priceTcu29), 18, 5)} TCU29
                </Typography>
              </DialogTransaction>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}
