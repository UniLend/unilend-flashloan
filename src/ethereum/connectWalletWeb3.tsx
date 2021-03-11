import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
let connectWalletWeb3: any;

const connectWalletProvider: any = new WalletConnectProvider({
  infuraId: `${process.env.REACT_APP_INFURA_ID}`,
});

connectWalletWeb3 = new Web3(connectWalletProvider);

// eslint-disable-next-line import/no-anonymous-default-export
export default { connectWalletWeb3, connectWalletProvider };
