import { Wallet } from "components/Helpers/Types";
import { useCallback } from "react";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export default function useWalletConnect() {
  const {
    walletConnected,
    accounts,
    loading,
    currentProvider,
    userTokenBalance,
    accountBalance,
    poolTokenBalance,
    poolLiquidity,
    rewardPoolBalance,
    rewardReleaseRate,
    totalDepositedTokens,
    totalTokensInRewardPool,
    activeNetWork,
    currentApy,
    networkId,
  } = useTypedSelector((state) => state.connectWallet);

  const {
    connectWalletAction,
    getUserTokenBalance,
    getPoolLiquidity,
  } = useActions();
  const handleWalletConnect = useCallback((wallet?: Wallet) => {
    console.log("CONNECTING WALLET");

    if (wallet) {
      connectWalletAction(wallet);
    } else {
      connectWalletAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    walletConnected,
    accounts,
    loading,
    currentProvider,
    userTokenBalance,
    accountBalance,
    poolTokenBalance,
    poolLiquidity,
    rewardPoolBalance,
    rewardReleaseRate,
    activeNetWork,
    networkId,
    currentApy,
    totalDepositedTokens,
    totalTokensInRewardPool,
    handleWalletConnect,
    getUserTokenBalance,
    getPoolLiquidity,
  };
}
