import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { bsc } from 'viem/chains';
import { WagmiConfig } from 'wagmi';

//WAGMI + WALLETCONNECT
if (!import.meta.env.VITE_WALLETCONNECT_CLOUD_ID) {
  throw new Error('You need to provide WALLETCONNECT_CLOUD_ID env variable');
}
const projectId = import.meta.env.VITE_WALLETCONNECT_CLOUD_ID;
const chains = [bsc];
const metadata = {
  name: 'TCu29 Sale Dapp',
  description: 'Buy TCu29 tokens, each backed by 1 pound of physical copper. RWA copper backed blockchain tokens suitable for every portfolio.',
  url: 'https://tcu29.cz.cash',
  icons: ['https://tcu29.cz.cash/images/logo.png'],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function App({ children }) {
  return (
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
  );
}

export default App;
