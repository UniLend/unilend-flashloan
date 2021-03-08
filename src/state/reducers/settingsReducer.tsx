import { ActionType } from "../action-types";
import { SettingAction } from "../actions/settingsA";

interface SettingsState {
  theme: string;
  activeTab: string | null;
}

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  activeTab: localStorage.getItem("activeTab")
    ? localStorage.getItem("activeTab")
    : "deposit",
};

const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingAction
): SettingsState => {
  switch (action.type) {
    case ActionType.CURRENT_THEME:
      return { ...state, theme: action.payload };
    case ActionType.SET_ACTIVE_TAB:
      localStorage.setItem(
        "activeTab",
        action.payload ? action.payload : "deposit"
      );
      return {
        ...state,
        activeTab: action.payload ? action.payload : "deposit",
      };
    default:
      return state;
  }
};
export default settingsReducer;
