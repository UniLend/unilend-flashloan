import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  rabbyWallet,
  trustWallet,
  coin98Wallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

// import { coinbaseWallet, metaMask } from 'wagmi/connectors';

const projectId = "YOUR_PROJECT_ID";
const appName = "RainbowKit demo";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
        rabbyWallet,
        coin98Wallet,
        trustWallet,
      ],
    },
  ],
  {
    projectId,
    appName,
  }
);

export const wagmiConfig = createConfig({
  connectors: [...connectors],
  chains: [mainnet, polygon, optimism, arbitrum, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  multiInjectedProviderDiscovery: false,
  ssr: true,
});


