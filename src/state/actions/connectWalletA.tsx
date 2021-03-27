import { ActionType } from "../action-types";

interface AccountBalance {
  type: ActionType.ACCOUNT_BALANCE;
  payload: string;
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
  | ActiveNetwork;
