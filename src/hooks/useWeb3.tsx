import { useEffect } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";

export default function useWeb3() {
  const { walletConnected } = useTypedSelector((state) => state.connectWallet);
  const provider: any = new WalletConnectProvider({
    infuraId: `${process.env.REACT_APP_INFURA_ID}`,
  });
  const getWeb3 = async (walletType: string) => {
    let _web3: any;
    switch (walletType) {
      case "metamask":
        _web3 = new Web3(Web3.givenProvider);

        break;
      case "walletConnect":
        _web3 = new Web3(provider);

        break;
      default:
        break;
    }
  };
  return { provider, getWeb3 };
}
