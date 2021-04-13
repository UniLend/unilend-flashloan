import { combineReducers } from "redux";
import AirdropReducer from "./airdropReducer";
import connectWalletReducer from "./connectWalletReducer";
import DepositReducer from "./depositReducer";
import DonateReducer from "./donateReducer";
import EthereumReducer from "./ethereumReducer";
import PoolReducer from "./poolReducer";
import RedeemReducer from "./redeemReducer";
import settingsReducer from "./settingsReducer";
import TokenManageReducer from "./tokenManageReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

// const persistedReducer = persistReducer<any, any>(persistConfig, reducers);
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["setting"],
};
const settingPersistConfig = {
  key: "setting",
  storage,
};
const settingsPR = persistReducer(settingPersistConfig, settingsReducer);
const reducers = combineReducers({
  connectWallet: connectWalletReducer,
  settings:
    // settingsPR,
    settingsReducer,
  deposit: DepositReducer,
  donate: DonateReducer,
  redeem: RedeemReducer,
  airdrop: AirdropReducer,
  tokenManage: TokenManageReducer,
  ethereum: EthereumReducer,
  pool: PoolReducer,
});

export default persistReducer(rootPersistConfig, reducers);

export type RootState = ReturnType<typeof reducers>;
