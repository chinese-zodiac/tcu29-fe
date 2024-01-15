
import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import ConnectWallet from '../components/elements/ConnectWallet';
import { Typography,TextField, Box } from '@mui/material';
import FooterArea from '../components/layouts/FooterArea';
import { LINK_OPERATOR_INFO } from '../constants/links';
import Grid2 from '@mui/material/Unstable_Grid2';
import DialogBuyTcu29 from '../components/elements/DialogBuyTcu29';
import ButtonPrimary from "../components/styled/ButtonPrimary"

export default function Home() {
    const { address, isConnecting, isDisconnected } = useAccount();

    return (
        <>
        <Typography as="h1" sx={{fontSize:'2em'}}>
            TCu29 Sale Dapp
        </Typography>
        <Typography as="p" sx={{maxWidth:'360px',marginLeft:'auto',marginRight:'auto',marginBottom:'1em',}}>
        Buy TCu29 tokens, each backed by 1 pound of physical copper. RWA copper backed blockchain tokens suitable for every portfolio.
        <br/>Learn more at <Typography as='a' href={LINK_OPERATOR_INFO} target="_blank"
      rel="noreferrer" sx={{color:"#ede8e6"}}>tempestascoins.io</Typography>
        </Typography>
        <ConnectWallet />
        <br/>
        <Grid2 container spacing={1} columns={2}>
            <Grid2  xs={1} sx={{textAlign:'right'}}>
                TCu29 Price:
            </Grid2>
            <Grid2 xs={1} sx={{textAlign:'left'}}>
                $8.346
            </Grid2>
            <Grid2  xs={1} sx={{textAlign:'right'}}>
                Purchasable:
            </Grid2>
            <Grid2 xs={1} sx={{textAlign:'left'}}>
                200.00M ($1.600B)
            </Grid2>
            <Grid2  xs={1} sx={{textAlign:'right'}}>
                Your TCu29:
            </Grid2>
            <Grid2 xs={1} sx={{textAlign:'left'}}>
                10.00M ($8.000M)
            </Grid2>
        </Grid2>
        <DialogBuyTcu29
                btn={
                  <ButtonPrimary
                    sx={{
                      backgroundColor: '#5D2410',
                      borderRadius:'1em',
                      border:'solid 1px #ede8e6',
                      display: 'inline-block',
                      fontSize: '1.5em',
                      width: '11em',
                      padding: '0.4em 0.25em',
                      lineHeight: '1.2em',
                      color:'#ede8e6',
                      margin: 0,
                      marginTop:'0.66em',
                      '&:hover': {
                        backgroundColor: '#5D2410',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        backgroundImage: "url('./logo.png')",
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        width: '1em',
                        height: '1em',
                        margin: '0',
                        marginRight: '0.25em',
                        position: 'relative',
                        top: '0.15em',
                        display: 'inline-block',
                      }}
                    />
                    BUY TCU29
                  </ButtonPrimary>
                }
              />
        <br/>
        <FooterArea />
        </>
    )
}