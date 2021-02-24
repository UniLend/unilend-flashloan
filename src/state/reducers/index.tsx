import { combineReducers } from "redux";
import connectWalletReducer from "./connectWalletReducer";
import settingsReducer from "./settingsReducer";

const reducers = combineReducers({
  connectWallet: connectWalletReducer,
  settings: settingsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
