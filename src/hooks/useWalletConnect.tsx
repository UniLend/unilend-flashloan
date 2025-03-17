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
    userTokenBalanceLoading,
    accountBalance,
    accountBalanceLoading,
    poolTokenBalance,
    poolTokenBalanceLoading,
    poolLiquidity,
    poolLiquidityLoading,
    rewardPoolBalance,
    rewardPoolBalanceLoading,
    rewardReleaseRate,
    rewardReleaseRateLoading,
    totalDepositedTokens,
    totalDepositedTokensLoading,
    walletProvider,
    connectedWallet,
    totalTokensInRewardPool,
    totalTokensInRewardPoolLoading,
    selectedNetworkId,
    fullUserTokenBalance,
    fullPoolTokenBalance,
    fullPoolUTokenBalance,
    activeNetWork,
    currentApy,
    currentApyLoading,
    networkId,
  } = useTypedSelector((state) => state.connectWallet);

  const {
    connectWalletAction,
    getUserTokenBalance,
    getPoolLiquidity,
  } = useActions();
  
  const handleWalletConnect = useCallback(
    (wallet?: Wallet) => {
      console.log("CONNECTING WALLET");
      if (wallet) {
        connectWalletAction(selectedNetworkId, wallet);
      } else {
        connectWalletAction(selectedNetworkId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletConnected, selectedNetworkId]
  );

  return {
    walletConnected,
    accounts,
    loading,
    currentProvider,
    userTokenBalance,
    accountBalance,
    poolTokenBalance,
    poolLiquidity,
    selectedNetworkId,
    rewardPoolBalance,
    rewardReleaseRate,
    activeNetWork,
    walletProvider,
    connectedWallet,
    networkId,
    accountBalanceLoading,
    userTokenBalanceLoading,
    poolLiquidityLoading,
    poolTokenBalanceLoading,
    rewardPoolBalanceLoading,
    rewardReleaseRateLoading,
    currentApyLoading,
    totalDepositedTokensLoading,
    totalTokensInRewardPoolLoading,
    fullUserTokenBalance,
    fullPoolTokenBalance,
    fullPoolUTokenBalance,
    currentApy,
    totalDepositedTokens,
    totalTokensInRewardPool,
    handleWalletConnect,
    getUserTokenBalance,
    getPoolLiquidity,
  };
}
