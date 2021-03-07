import { ActionType } from "../action-types";
import { SettingAction } from "../actions/settingsA";

interface SettingsState {
  theme: string;
  activeTab: string;
}

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  activeTab: "deposit",
};

const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingAction
): SettingsState => {
  switch (action.type) {
    case ActionType.CURRENT_THEME:
      return { ...state, theme: action.payload };
    case ActionType.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload ? action.payload : "deposit",
      };
    default:
      return state;
  }
};
export default settingsReducer;
