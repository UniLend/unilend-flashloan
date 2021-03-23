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
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  walletConnected: false,
  accounts: [],
  accountBalance: "0",
  userTokenBalance: "",
  poolTokenBalance: "",
  currentProvider: "",
  selectedNetworkId: 1,
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
    case ActionType.CURRENT_PROVIDER:
      return { ...state, currentProvider: action.payload };
    case ActionType.CONNECT_WALLET:
      return { ...state, loading: true, walletConnected: false };
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
    default:
      return state;
  }
};
export default connectWalletReducer;
