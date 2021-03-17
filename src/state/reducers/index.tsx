import { combineReducers } from "redux";
import connectWalletReducer from "./connectWalletReducer";
import DepositReducer from "./depositReducer";
import DonateReducer from "./donateReducer";
import settingsReducer from "./settingsReducer";
import TokenManageReducer from "./tokenManageReducer";

const reducers = combineReducers({
  connectWallet: connectWalletReducer,
  settings: settingsReducer,
  deposit: DepositReducer,
  donate: DonateReducer,
  tokenManage: TokenManageReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
