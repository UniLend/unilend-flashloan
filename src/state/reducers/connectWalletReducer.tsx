import { Action } from "state/actions/connectWalletA";
import { ActionType } from "../action-types";

interface ConnectWalletState {
  loading: boolean;
  error: string | null;
  data: string[];
  walletConnected: boolean;
  accounts: string[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
  walletConnected: false,
  accounts: [],
};

const connectWalletReducer = (
  state: ConnectWalletState = initialState,
  action: Action
): ConnectWalletState => {
  switch (action.type) {
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
    default:
      return state;
  }
};
export default connectWalletReducer;
