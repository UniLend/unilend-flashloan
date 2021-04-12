import { ActionType } from "../action-types";

interface AccountBalance {
  type: ActionType.ACCOUNT_BALANCE_SUCCESS;
  payload: any;
  fullAccountBalance: any;
}

interface AccountBalanceAction {
  type: ActionType.ACCOUNT_BALANCE_ACTION;
}

interface AccountBalanceFailed {
  type: ActionType.ACCOUNT_BALANCE_FAILED;
}
interface CurrentProvider {
  type: ActionType.CURRENT_PROVIDER;
  payload: string;
  provider: any;
}
interface ConnectWalletAction {
  type: ActionType.CONNECT_WALLET;
}

interface ConnectWalletSuccessAction {
  type: ActionType.CONNECT_WALLET_SUCCESS;
  payload: string[];
}

interface ConnectWalletErrorAction {
  type: ActionType.CONNECT_WALLET_ERROR;
  payload: string;
}

interface setSelectedNetworkId {
  type: ActionType.SELECTED_NETWORK_ID;
  networkId: number;
}

interface UserTokenBalance {
  type: ActionType.USER_TOKEN_BALANCE_SUCCESS;
  userTokenBalance: any;
  fullUserTokenBalance: any;
}
interface UserTokenBalanceAction {
  type: ActionType.USER_TOKEN_BALANCE_ACTION;
}

interface UserTokenBalanceFailed {
  type: ActionType.USER_TOKEN_BALANCE_FAILED;
}
interface PoolTokenBalance {
  type: ActionType.POOL_TOKEN_BALANCE_SUCCESS;
  payload: any;
}
interface PoolTokenBalanceAction {
  type: ActionType.POOL_TOKEN_BALANCE_ACTION;
}

interface PoolTokenBalanceFailed {
  type: ActionType.POOL_TOKEN_BALANCE_FAILED;
}
interface walletDisconnect {
  type: ActionType.WALLET_DISCONNECT;
}

interface getPoolLiquidity {
  type: ActionType.POOL_LIQUIDITY_SUCCESS;
  payload: any;
}
interface getPoolLiquidityAction {
  type: ActionType.POOL_LIQUIDITY_ACTION;
}

interface getPoolLiquidityFailed {
  type: ActionType.POOL_LIQUIDITY_FAILED;
}
interface RewardBalance {
  type: ActionType.REWARD_POOL_BALANCE_SUCCESS;
  payload: any;
}
interface RewardBalanceAction {
  type: ActionType.REWARD_POOL_BALANCE_ACTION;
}

interface RewardBalanceFailed {
  type: ActionType.REWARD_POOL_BALANCE_FAILED;
}
interface RewardRelease {
  type: ActionType.REWARD_RELEASE_RATE_SUCCESS;
  payload: any;
}
interface RewardReleaseAction {
  type: ActionType.REWARD_RELEASE_RATE_ACTION;
}

interface RewardReleaseFailed {
  type: ActionType.REWARD_RELEASE_RATE_FAILED;
}
interface ActiveNetwork {
  type: ActionType.ACTIVE_NETWORK;
  payload: any;
  networkId: any;
}

interface currentApy {
  type: ActionType.CURRENT_APY_SUCCESS;
  payload: any;
}
interface currentApyAction {
  type: ActionType.CURRENT_APY_ACTION;
}
interface currentApyFailed {
  type: ActionType.CURRENT_APY_FAILED;
}
interface getTotalTokensInRewardPool {
  type: ActionType.TOTAL_TOKENS_IN_REWARD_POOL_SUCCESS;
  payload: any;
}
interface getTotalTokensInRewardPoolAction {
  type: ActionType.TOTAL_TOKENS_IN_REWARD_POOL_ACTION;
}
interface getTotalTokensInRewardPoolFailed {
  type: ActionType.TOTAL_TOKENS_IN_REWARD_POOL_FAILED;
}
interface getTotalDepositedTokens {
  type: ActionType.TOTAL_DEPOSITION_TOKENS_SUCCESS;
  payload: any;
}
interface getTotalDepositedTokensAction {
  type: ActionType.TOTAL_DEPOSITION_TOKENS_ACTION;
}
interface getTotalDepositedTokensFailed {
  type: ActionType.TOTAL_DEPOSITION_TOKENS_FAILED;
}
interface fullAccountBalance {
  type: ActionType.FULL_AMOUNT_BALANCE;
  payload: any;
}

interface fullUserTokenBalance {
  type: ActionType.FULL_USER_TOKEN_BALANCE;
  payload: any;
}

interface fullPoolTokenBalance {
  type: ActionType.FULL_POOL_TOKEN_BALANCE;
  payload: any;
}

interface ConnectedWallet {
  type: ActionType.CONNECTED_WALLET;
  payload: any;
}

interface BalanceReset {
  type: ActionType.BALANCE_RESET;
}

export type Action =
  | CurrentProvider
  | ConnectWalletAction
  | ConnectWalletSuccessAction
  | ConnectWalletErrorAction
  | AccountBalance
  | AccountBalanceAction
  | AccountBalanceFailed
  | UserTokenBalance
  | UserTokenBalanceAction
  | UserTokenBalanceFailed
  | setSelectedNetworkId
  | PoolTokenBalance
  | PoolTokenBalanceAction
  | PoolTokenBalanceFailed
  | getPoolLiquidity
  | getPoolLiquidityAction
  | getPoolLiquidityFailed
  | walletDisconnect
  | RewardBalance
  | RewardBalanceAction
  | RewardBalanceFailed
  | RewardRelease
  | RewardReleaseAction
  | RewardReleaseFailed
  | ActiveNetwork
  | currentApy
  | currentApyAction
  | currentApyFailed
  | getTotalDepositedTokens
  | getTotalDepositedTokensAction
  | getTotalDepositedTokensFailed
  | getTotalTokensInRewardPool
  | getTotalTokensInRewardPoolAction
  | getTotalTokensInRewardPoolFailed
  | fullAccountBalance
  | fullUserTokenBalance
  | fullPoolTokenBalance
  | ConnectedWallet
  | BalanceReset;
