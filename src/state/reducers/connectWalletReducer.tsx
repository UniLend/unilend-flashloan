import web3 from "ethereum/web3";
import { Action } from "state/actions/connectWalletA";
import { ActionType } from "../action-types";

interface ConnectWalletState {
  loading: boolean;
  error: string | null;
  data: string[];
  walletConnected: boolean;
  accounts: string[];
  accountBalance: string;
  userTokenBalance: any;
  currentProvider: string;
  selectedNetworkId: number;
  poolTokenBalance: any;
  poolLiquidity: any;
  rewardPoolBalance: any;
  rewardReleaseRate: any;
  activeNetWork: any;
  networkId: any;
  currentApy: any;
  totalTokensInRewardPool: any;
  totalDepositedTokens: any;
  fullAccountBalance: any;
  fullUserTokenBalance: any;
  fullPoolTokenBalance: any;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  walletConnected: false,
  accounts: [],
  accountBalance: "",
  userTokenBalance: "",
  poolTokenBalance: "",
  currentProvider: web3,
  selectedNetworkId: 1,
  poolLiquidity: "",
  rewardPoolBalance: "",
  rewardReleaseRate: "",
  activeNetWork: "",
  networkId: "1",
  currentApy: "",
  totalTokensInRewardPool: "",
  totalDepositedTokens: "",
  fullAccountBalance: "",
  fullUserTokenBalance: "",
  fullPoolTokenBalance: "",
};

const connectWalletReducer = (
  state: ConnectWalletState = initialState,
  action: Action
): ConnectWalletState => {
  switch (action.type) {
    case ActionType.ACCOUNT_BALANCE:
      return { ...state, accountBalance: action.payload };
    case ActionType.USER_TOKEN_BALANCE:
      return { ...state, userTokenBalance: action.userTokenBalance };
    case ActionType.POOL_TOKEN_BALANCE:
      return { ...state, poolTokenBalance: action.payload };
    case ActionType.POOL_LIQUIDITY:
      return { ...state, poolLiquidity: action.payload };
    case ActionType.REWARD_RELEASE_RATE:
      return { ...state, rewardReleaseRate: action.payload };
    case ActionType.CURRENT_PROVIDER:
      return { ...state, currentProvider: action.payload };
    case ActionType.REWARD_POOL_BALANCE:
      return { ...state, rewardPoolBalance: action.payload };
    case ActionType.CURRENT_APY:
      return { ...state, currentApy: action.payload };
    case ActionType.TOTAL_DEPOSITION_TOKENS:
      return { ...state, totalDepositedTokens: action.payload };
    case ActionType.TOTAL_TOKENS_IN_REWARD_POOL:
      return { ...state, totalTokensInRewardPool: action.payload };
    case ActionType.FULL_AMOUNT_BALANCE:
      return { ...state, fullAccountBalance: action.payload };
    case ActionType.FULL_USER_TOKEN_BALANCE:
      return { ...state, fullUserTokenBalance: action.payload };
    case ActionType.FULL_POOL_TOKEN_BALANCE:
      return { ...state, fullPoolTokenBalance: action.payload };
    case ActionType.CONNECT_WALLET:
      return { ...state, loading: true, walletConnected: false };
    case ActionType.ACTIVE_NETWORK:
      return {
        ...state,
        activeNetWork: action.payload,
        networkId: action.networkId,
      };
    // case ActionType.DISCONNECT_WALLET:
    //   return {...state, walletConnected: false, accounts: []}
    case ActionType.CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
        walletConnected: true,
        error: null,
      };
    case ActionType.CONNECT_WALLET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
        walletConnected: false,
      };
    case ActionType.SELECTED_NETWORK_ID:
      return {
        ...state,
        selectedNetworkId: action.networkId ? action.networkId : 1,
      };
    case ActionType.WALLET_DISCONNECT:
      return {
        ...state,
        loading: false,
        error: null,
        data: [],
        walletConnected: false,
        accounts: [],
        accountBalance: "",
        userTokenBalance: "",
        poolTokenBalance: "",
        currentProvider: web3,
      };
    default:
      return state;
  }
};
export default connectWalletReducer;
