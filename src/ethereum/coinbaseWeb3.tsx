// TypeScript
import WalletLink from "walletlink";
import Web3 from "web3";

const APP_NAME = "UniLend Finance Interface";
const APP_LOGO_URL =
  "https://app.unilend.finance/static/media/logo.d90c2543.svg";
// const ROP_ETH_JSONRPC_URL = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
const ETH_JSONRPC_URL = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`;
const CHAIN_ID = 1;
// const ROP_CHAIN_ID = 3;

// Initialize WalletLink
export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false,
});

// Initialize a Web3 Provider object
export const CoinbaseProvider = walletLink.makeWeb3Provider(
  ETH_JSONRPC_URL,
  CHAIN_ID
);

// export const CoinbaseProvider = walletLink.makeWeb3Provider(
//   ROP_ETH_JSONRPC_URL,
//   ROP_CHAIN_ID
// );

// Initialize a Web3 object
export const CoinbaseWeb3 = new Web3(CoinbaseProvider as any);
