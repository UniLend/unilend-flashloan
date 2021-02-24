import { useCallback, useEffect } from "react";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export default function useWalletConnect<T>() {
  const { walletConnected, accounts } = useTypedSelector(
    (state) => state.connectWallet
  );

  const { connectWalletAction } = useActions();
  const handleWalletConnect = useCallback(() => {
    console.log("CONNECTING WALLET");
    connectWalletAction();
  }, []);

  //   useEffect(() => {
  //     console.log(accounts);
  //     return () => {};
  //   }, [accounts]);

  return { walletConnected, accounts, handleWalletConnect };
}
