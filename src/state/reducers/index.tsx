import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";

const reducers = combineReducers({
  settings: settingsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
