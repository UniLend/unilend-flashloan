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
  accountBalanceLoading: boolean;
  userTokenBalance: any;
  userTokenBalanceLoading: boolean;
  currentProvider: string;
  selectedNetworkId: number;
  poolTokenBalance: any;
  poolTokenBalanceLoading: boolean;
  poolLiquidity: any;
  poolLiquidityLoading: any;
  rewardPoolBalance: any;
  rewardPoolBalanceLoading: boolean;
  rewardReleaseRate: any;
  rewardReleaseRateLoading: boolean;
  activeNetWork: any;
  networkId: any;
  currentApy: any;
  currentApyLoading: any;
  totalTokensInRewardPool: any;
  totalTokensInRewardPoolLoading: boolean;
  totalDepositedTokens: any;
  totalDepositedTokensLoading: boolean;
  fullAccountBalance: any;
  fullUserTokenBalance: any;
  fullPoolTokenBalance: any;
  walletProvider: any;
  connectedWallet: any;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  walletConnected: false,
  connectedWallet: localStorage.getItem("walletConnected"),
  accounts: [],
  accountBalance: "",
  accountBalanceLoading: false,
  userTokenBalance: "",
  userTokenBalanceLoading: false,
  poolTokenBalance: "",
  poolTokenBalanceLoading: false,
  currentProvider: web3,
  selectedNetworkId: localStorage.getItem("activeNetworkId")
    ? parseInt(localStorage.getItem("activeNetworkId") || "1")
    : 1,
  poolLiquidity: "",
  poolLiquidityLoading: false,
  rewardPoolBalance: "",
  rewardPoolBalanceLoading: false,
  rewardReleaseRate: "",
  rewardReleaseRateLoading: false,
  activeNetWork: "",
  networkId: "1",
  currentApy: "",
  currentApyLoading: false,
  totalTokensInRewardPool: "",
  totalTokensInRewardPoolLoading: false,
  totalDepositedTokens: "",
  totalDepositedTokensLoading: false,
  fullAccountBalance: "",
  fullUserTokenBalance: "",
  fullPoolTokenBalance: "",
  walletProvider: (window as any).ethereum,
};

const connectWalletReducer = (
  state: ConnectWalletState = initialState,
  action: Action
): ConnectWalletState => {
  switch (action.type) {
    // action
    case ActionType.CONNECT_WALLET:
      return { ...state, loading: true, walletConnected: false };
    case ActionType.ACCOUNT_BALANCE_ACTION:
      return {
        ...state,
        accountBalanceLoading: true,
      };
    case ActionType.USER_TOKEN_BALANCE_ACTION:
      return {
        ...state,
        userTokenBalanceLoading: true,
      };
    case ActionType.POOL_TOKEN_BALANCE_ACTION:
      return {
        ...state,
        poolTokenBalanceLoading: true,
      };
    case ActionType.POOL_LIQUIDITY_ACTION:
      return {
        ...state,
        poolLiquidityLoading: true,
      };
    case ActionType.REWARD_POOL_BALANCE_ACTION:
      return {
        ...state,
        rewardPoolBalanceLoading: true,
      };
    case ActionType.REWARD_RELEASE_RATE_ACTION:
      return {
        ...state,
        rewardReleaseRateLoading: true,
      };
    case ActionType.CURRENT_APY_ACTION:
      return {
        ...state,
        currentApyLoading: true,
      };
    case ActionType.TOTAL_DEPOSITION_TOKENS_ACTION:
      return {
        ...state,
        totalDepositedTokensLoading: true,
      };
    case ActionType.TOTAL_TOKENS_IN_REWARD_POOL_ACTION:
      return {
        ...state,
        totalTokensInRewardPoolLoading: true,
      };

    // successs
    case ActionType.ACCOUNT_BALANCE_SUCCESS:
      return {
        ...state,
        accountBalance: action.payload,
        accountBalanceLoading: false,
        fullAccountBalance: action.fullAccountBalance,
      };
    case ActionType.USER_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        userTokenBalance: action.userTokenBalance,
        userTokenBalanceLoading: false,
        fullUserTokenBalance: action.fullUserTokenBalance,
      };
    case ActionType.POOL_TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        poolTokenBalance: action.payload,
        poolTokenBalanceLoading: false,
      };
    case ActionType.POOL_LIQUIDITY_SUCCESS:
      return {
        ...state,
        poolLiquidity: action.payload,
        poolLiquidityLoading: false,
      };
    case ActionType.REWARD_RELEASE_RATE_SUCCESS:
      return {
        ...state,
        rewardReleaseRate: action.payload,
        rewardReleaseRateLoading: false,
      };

    case ActionType.REWARD_POOL_BALANCE_SUCCESS:
      return {
        ...state,
        rewardPoolBalance: action.payload,
        rewardPoolBalanceLoading: false,
      };
    case ActionType.CURRENT_APY_SUCCESS:
      return { ...state, currentApy: action.payload, currentApyLoading: false };
    case ActionType.TOTAL_DEPOSITION_TOKENS_SUCCESS:
      return {
        ...state,
        totalDepositedTokens: action.payload,
        totalDepositedTokensLoading: false,
      };
    case ActionType.TOTAL_TOKENS_IN_REWARD_POOL_SUCCESS:
      return {
        ...state,
        totalTokensInRewardPool: action.payload,
        totalTokensInRewardPoolLoading: false,
      };
    case ActionType.CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
        walletConnected: true,
        error: null,
      };

    // failed

    case ActionType.CONNECT_WALLET_ERROR:
      localStorage.removeItem("walletConnected");
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
        walletConnected: false,
        currentProvider: web3,
      };

    case ActionType.ACCOUNT_BALANCE_FAILED:
      return {
        ...state,
        accountBalance: "",
        fullAccountBalance: "",
        accountBalanceLoading: false,
      };

    case ActionType.USER_TOKEN_BALANCE_FAILED:
      return {
        ...state,
        userTokenBalanceLoading: false,
      };
    case ActionType.POOL_TOKEN_BALANCE_FAILED:
      return {
        ...state,
        poolTokenBalanceLoading: false,
      };
    case ActionType.POOL_LIQUIDITY_FAILED:
      return {
        ...state,
        poolLiquidityLoading: false,
      };
    case ActionType.REWARD_POOL_BALANCE_FAILED:
      return {
        ...state,
        rewardPoolBalanceLoading: false,
      };
    case ActionType.REWARD_RELEASE_RATE_FAILED:
      return {
        ...state,
        rewardReleaseRateLoading: false,
      };
    case ActionType.CURRENT_APY_FAILED:
      return {
        ...state,
        currentApyLoading: false,
      };
    case ActionType.TOTAL_DEPOSITION_TOKENS_FAILED:
      return {
        ...state,
        totalDepositedTokensLoading: false,
      };
    case ActionType.TOTAL_TOKENS_IN_REWARD_POOL_FAILED:
      return {
        ...state,
        totalTokensInRewardPoolLoading: false,
      };

    case ActionType.FULL_USER_TOKEN_BALANCE:
      return { ...state, fullUserTokenBalance: action.payload };
    case ActionType.FULL_POOL_TOKEN_BALANCE:
      return { ...state, fullPoolTokenBalance: action.payload };
    case ActionType.CONNECTED_WALLET:
      return { ...state, connectedWallet: action.payload };
    case ActionType.CURRENT_PROVIDER:
      return {
        ...state,
        currentProvider: action.payload,
        walletProvider: action.provider,
      };

    case ActionType.ACTIVE_NETWORK:
      return {
        ...state,
        activeNetWork: action.payload,
        networkId: action.networkId,
      };

    case ActionType.SELECTED_NETWORK_ID:
      localStorage.setItem("activeNetworkId", action.networkId.toString());
      return {
        ...state,
        selectedNetworkId: action.networkId ? action.networkId : 1,
      };
    case ActionType.BALANCE_RESET:
      return {
        ...state,
        rewardPoolBalance: "",
        rewardReleaseRate: "",
        poolLiquidity: "",
        poolTokenBalance: "",
        userTokenBalance: "",
        totalDepositedTokens: "",
        totalTokensInRewardPool: "",
        currentApy: "",
      };
    case ActionType.WALLET_DISCONNECT:
      localStorage.removeItem("walletconnect");
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
        connectedWallet: "",
        walletProvider: (window as any).ethereum,
      };
    default:
      return state;
  }
};
export default connectWalletReducer;
