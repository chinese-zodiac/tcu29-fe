import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';
import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export default function ConnectWallet(sx) {
  const {
    isOpen: web3ModalIsOpen,
    open: web3ModalOpen,
    close: web3ModalClose,
  } = useWeb3Modal();
  const { open, selectedNetworkId } = useWeb3ModalState();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          display: 'block',
          right: '1em',
        }}
      >
        <Box>
          {!!address ? (
            <>
              <Tooltip title="Open Wallet Settings">
                <Button
                  onClick={() => web3ModalOpen({ view: 'Account' })}
                  sx={{
                    width: '8em',
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
                  <Avatar
                    alt={address}
                    src={makeBlockie(address)}
                    sx={{
                      mr: 1,
                      height: 'auto',
                      width: '0.9em',
                      border: 'solid 3px #be8961',
                    }}
                  />
                  0x...{address.substring(36)}
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Login Your Wallet">
                <Button
                  onClick={() => web3ModalOpen({ view: 'Connect' })}
                  sx={{
                    width: '8em',
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
                  Connect{' '}
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
                </Button>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
