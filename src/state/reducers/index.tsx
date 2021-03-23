import { combineReducers } from "redux";
import connectWalletReducer from "./connectWalletReducer";
import DepositReducer from "./depositReducer";
import DonateReducer from "./donateReducer";
import RedeemReducer from "./redeemReducer";
import settingsReducer from "./settingsReducer";
import TokenManageReducer from "./tokenManageReducer";

const reducers = combineReducers({
  connectWallet: connectWalletReducer,
  settings: settingsReducer,
  deposit: DepositReducer,
  donate: DonateReducer,
  redeem: RedeemReducer,
  tokenManage: TokenManageReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
