import {
    Button,
    DialogContent,
    Slider,
    TextField,
    Typography,
  } from '@mui/material';
  import Dialog from '@mui/material/Dialog';
  import { Box } from '@mui/system';
  import { BigNumber, ethers } from 'ethers';
  import { parseEther } from 'ethers/lib/utils.js';
  import { cloneElement, useState } from 'react';
  import { useAccount, useBalance, useContractRead } from 'wagmi';
  import IERC20Abi from '../../abi/IERC20.json';
  import Tcu29SaleAbi from '../../abi/Tcu29Sale.json';
  import { ADDRESS_TCU29SALE, ADDRESS_TCU29, ADDRESS_CZUSD,ADDRESS_USDT } from '../../constants/addresses';
  import { bnToCompact } from '../../utils/bnToFixed';
  import EtherTextField from '../elements/EtherTextField';
  import DialogTransaction from '../styled/DialogTransaction';
import ButtonPrimary from '../styled/ButtonPrimary';
  
  export default function DialogBuyTcu29({
    btn,
    sx,
  }) {
    const { address, isConnecting, isDisconnected } = useAccount();

    const priceTcu29 = BigNumber.from("8436");
  
    const [open, setOpen] = useState(false);
    const [inputWad, setInputWad] = useState(parseEther('0'));
  
    const [isCzusd, setIsCzusd] = useState(false);
  
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
        !tokenBalIsLoadingCzusd && !tokenBalIsErrorCzusd && !!tokenBalDataCzusd?.value
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
        !tokenBalIsLoadingTcu29 && !tokenBalIsErrorTcu29 && !!tokenBalDataTcu29?.value
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
        <Dialog onClose={handleClose} open={open} sx={sx}>
          <DialogContent
            sx={{
              padding: '1em',
              background: 'white',
              border: 'solid 4px #5D2410',
              borderRadius: '10px',
              color: 'black',
            }}
          >
            <Button
              onClick={() => {
                setIsCzusd(false);
                setInputWad(BigNumber.from(0));
              }}
              sx={{
                backgroundColor: '#5D2410',
                borderRadius:'1em',
                border:'solid 1px #ede8e6',
                color:'#ede8e6',
                display: 'inline-block',
                fontSize: '1em',
                width: '6em',
                padding: '0.4em 0.25em',
                lineHeight: '1.2em',
                margin: 0,
                marginRight:'1em',
                '&:hover': {
                  backgroundColor: '#5D2410',
                }
              }}
            >
              USDT
            </Button>
            <Button
              onClick={() => {
                setIsCzusd(true);
                setInputWad(BigNumber.from(0));
              }}
              sx={{
                backgroundColor: '#5D2410',
                borderRadius:'1em',
                border:'solid 1px #ede8e6',
                color:'#ede8e6',
                display: 'inline-block',
                fontSize: '1em',
                width: '6em',
                padding: '0.4em 0.25em',
                lineHeight: '1.2em',
                margin: 0,
                '&:hover': {
                  backgroundColor: '#5D2410',
                }
              }}
            >
              CZUSD
            </Button>
            <Box
              sx={{
                position: 'relative',
                border: 'solid 3px #5D2410',
                borderRadius: '8px 8px 0px 0px',
                textAlign: 'right',
                paddingBottom: '0.5em',
                maxWidth: '17em',
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
                src={"./images/tokens/"+(isCzusd ? "czusd.svg" : "usdt.svg")}
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
              <Button
                onClick={() =>
                    isCzusd ? setInputWad(tokenBalCzusd) : setInputWad(tokenBalUsdt)
                }
                variant="text"
                sx={{
                  minWidth: '0',
                  width: '3em',
                  fontSize: '0.8em',
                  marginLeft: '0.5em',
                  marginRight: '1em',
                  padding: '0.25em 0em 0.1em 0em',
                  lineHeight: '1em',
                  color: 'white',
                  backgroundColor: '#5D2410',
                  position: 'relative',
                  top: '-0.15em',
                  display: 'inline-block',
                  '&:hover': {
                    backgroundColor: '#080830',
                  },
                }}
              >
                MAX
              </Button>
            </Box>
            <Box
              sx={{
                position: 'relative',
                border: 'solid 3px #5D2410',
                borderTop: '0px',
                borderRadius: '0px 0px 8px 8px',
                textAlign: 'right',
                paddingTop: '0.5em',
                paddingRight: '1em',
              }}
            >
              <Typography
                sx={{
                  display: 'block',
                  width: '100%',
                  fontSize: '1.5em',
                  textAlign: 'right',
                  position: 'relative',
                  right: '1.5em',
                }}
              >
                {bnToCompact(
                  inputWad.mul(1000).div(priceTcu29).add(tokenBalTcu29),
                  18,
                  5
                )}
              </Typography>
              <Typography
                sx={{
                  display: 'block',
                  width: '100%',
                  fontSize: '1em',
                  textAlign: 'right',
                }}
              >
                NEW TCU29 BALANCE{' '}
              </Typography>
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
              <Box
                sx={{
                  position: 'absolute',
                  color: '#5D2410',
                  right: '4.5em',
                  top: '-1em',
                  textAlign: 'center',
                  padding: '0.25em',
                  lineHeight: '1em',
                  backgroundColor: 'white',
                  borderRadius: '2em',
                  border: 'solid 2px #5D2410',
                }}
              >
                ▼
              </Box>
            </Box>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={(val) => val + '%'}
              onChange={(e, newValue) => {
                setInputWad(
                  (isCzusd ? tokenBalCzusd : tokenBalUsdt).mul(newValue).div(100)
                );
              }}
              sx={{
                color:"#5D2410"
              }}
            />
            <br />
            <Button
              onClick={handleClose}
              variant="text"
              sx={{
                  backgroundColor: '#5D2410',
                  borderRadius:'1em',
                  border:'solid 1px #ede8e6',
                  color:'#ede8e6',
                  display: 'inline-block',
                  fontSize: '0.75em',
                  width: '8em',
                  padding: '0.4em 0.25em',
                  lineHeight: '1.2em',
                  margin: 0,
                  marginRight:'1em',
                  marginTop:'0.66em',
                  '&:hover': {
                    backgroundColor: '#5D2410',
                  }
                }}
            >
              <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
                EXIT
              </Typography>
            </Button>
            {inputWad.gt(isCzusd ? allowanceCzusd : allowanceUsdt) ? (
              <DialogTransaction
                title={'APPROVE ' + isCzusd ? "CZUSD" : "USDT"}
                btn={
                  <Button
                    onClick={() => {
                      handleConfirmed();
                    }}
                    variant="text"
                    sx={{
                        backgroundColor: '#5D2410',
                        borderRadius:'1em',
                        border:'solid 1px #ede8e6',
                        color:'#ede8e6',
                        display: 'inline-block',
                        fontSize: '0.75em',
                        width: '12em',
                        padding: '0.4em 0.25em',
                        lineHeight: '1.2em',
                        margin: 0,
                        marginLeft:'1em',
                        marginTop:'0.66em',
                        '&:hover': {
                          backgroundColor: '#5D2410',
                        }
                      }}
                  >
                    <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
                      APPROVE
                    </Typography>
                  </Button>
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
                    color: '#5D2410',
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
                <Typography sx={{ fontSize: '1.25em', lineHeight: '1em' }}>
                  Send an Approve transaction to your wallet that will allow you
                  to buy TCu29 that are immediately transferred to your Wallet. 
                  For Metamask, its recommended to use the default approve. That way,
                  you only have to do this once!
                </Typography>
              </DialogTransaction>
            ) : (
              <DialogTransaction
                title="Purchase TCu29"
                btn={
                  <ButtonPrimary
                    onClick={() => {
                      handleConfirmed();
                    }}
                    variant="text"
                    sx={{
                        backgroundColor: '#5D2410',
                        borderRadius:'1em',
                        border:'solid 1px #ede8e6',
                        color:'#ede8e6',
                        display: 'inline-block',
                        fontSize: '0.75em',
                        width: '12em',
                        padding: '0.4em 0.25em',
                        lineHeight: '1.2em',
                        margin: 0,
                        marginLeft:'1em',
                        marginTop:'0.66em',
                        '&:hover': {
                          backgroundColor: '#5D2410',
                        }
                      }}
                  >
                    <Typography sx={{ fontSize: '2em', lineHeight: '1em' }}>
                      BUY
                    </Typography>
                  </ButtonPrimary>
                }
                address={ADDRESS_TCU29SALE}
                abi={Tcu29SaleAbi}
                functionName={isCzusd ? 'buyTCu29Czusd' : 'buyTCu29Usdt'}
                args={[inputWad?.toString(),address]}
              >
                <Typography sx={{ fontSize: '1.25em', lineHeight: '1em' }}>
                  <br />
                  AMOUNTS:
                  <br />
                  - {bnToCompact(inputWad, 18, 5)} {isCzusd ? "CZUSD" : "USDT"}
                  <br/>
                  + {inputWad.mul(1000).div(priceTcu29)}
                </Typography>
              </DialogTransaction>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }
  