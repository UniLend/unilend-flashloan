import { ActionType } from "../action-types";

interface AccountBalance {
  type: ActionType.ACCOUNT_BALANCE;
  payload: any;
}

interface CurrentProvider {
  type: ActionType.CURRENT_PROVIDER;
  payload: string;
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
  type: ActionType.USER_TOKEN_BALANCE;
  userTokenBalance: any;
}

interface PoolTokenBalance {
  type: ActionType.POOL_TOKEN_BALANCE;
  payload: any;
}

interface walletDisconnect {
  type: ActionType.WALLET_DISCONNECT;
}

interface getPoolLiquidity {
  type: ActionType.POOL_LIQUIDITY;
  payload: any;
}

interface RewardBalance {
  type: ActionType.REWARD_POOL_BALANCE;
  payload: any;
}

interface RewardRelease {
  type: ActionType.REWARD_RELEASE_RATE;
  payload: any;
}

interface ActiveNetwork {
  type: ActionType.ACTIVE_NETWORK;
  payload: any;
  networkId: any;
}

interface currentApy {
  type: ActionType.CURRENT_APY;
  payload: any;
}

interface getTotalTokensInRewardPool {
  type: ActionType.TOTAL_TOKENS_IN_REWARD_POOL;
  payload: any;
}
interface getTotalDepositedTokens {
  type: ActionType.TOTAL_DEPOSITION_TOKENS;
  payload: any;
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

export type Action =
  | CurrentProvider
  | ConnectWalletAction
  | ConnectWalletSuccessAction
  | ConnectWalletErrorAction
  | AccountBalance
  | UserTokenBalance
  | setSelectedNetworkId
  | PoolTokenBalance
  | getPoolLiquidity
  | walletDisconnect
  | RewardBalance
  | RewardRelease
  | ActiveNetwork
  | currentApy
  | getTotalDepositedTokens
  | getTotalTokensInRewardPool
  | fullAccountBalance
  | fullUserTokenBalance
  | fullPoolTokenBalance;
