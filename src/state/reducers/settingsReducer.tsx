import { ActionType } from "../action-types";
import { SettingAction } from "../actions/settingsA";

interface SettingsState {
  theme: string;
}

const initialState = {
  theme: localStorage.getItem("theme") || "light",
};

const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingAction
): SettingsState => {
  switch (action.type) {
    case ActionType.CURRENT_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};
export default settingsReducer;
