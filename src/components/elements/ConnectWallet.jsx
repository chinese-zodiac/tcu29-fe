import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react';
import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export default function ConnectWallet() {
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
      <Box>
        <Box>
          {!!address ? (
            <>
              <Tooltip title="Open Wallet Settings">
                <Button
                  onClick={() => web3ModalOpen({ view: 'Account' })}
                  sx={{
                    textTransform: 'unset',
                    color: '#ede8e6',
                    fontSize: 28,
                    fontWeight:'bold',
                    WebkitTextStroke: '1px #2b2421',
                    paddingLeft: '1em',
                    paddingRight: '1em',
                    border: 'solid 1px #ede8e6',
                    borderRadius: '0.9em',
                    backgroundColor: '#9E5635',
                    width: '8em',
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
                      border: 'solid 1px #ede8e6',
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
                    fontWeight: 'bold',
                    color: '#ede8e6',
                    WebkitTextStroke: '1px #2b2421',
                    borderRadius: '0.9em',
                    border: 'solid 1px #ede8e6',
                    fontSize: 28,
                    backgroundColor: '#9E5635',
                    '&:hover': {
                      backgroundColor: '#080830',
                    },
                  }}
                >
                  Connect{' '}
                  <Box
                    as="img"
                    src="./images/wallet.svg"
                    sx={{
                      display: 'inline-block',
                      maxWidth: 28,
                      marginLeft: 1,
                      position: 'relative',
                      top: '-3px',
                    }}
                  />
                </Button>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
