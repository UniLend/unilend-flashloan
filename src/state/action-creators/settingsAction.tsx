import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { SettingAction } from "../actions/settingsA";

export const themeChange = (currTheme: string) => {
  return async (dispatch: Dispatch<SettingAction>) => {
    try {
      if (currTheme === "dark") {
        localStorage.setItem("theme", "light");
        dispatch({
          type: ActionType.CURRENT_THEME,
          payload: "light",
        });
      } else if (currTheme === "light") {
        localStorage.setItem("theme", "dark");
        dispatch({
          type: ActionType.CURRENT_THEME,
          payload: "dark",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const setActiveCurrency = (item: any) => {
  return async (dispatch: Dispatch<SettingAction>) => {
    try {
      dispatch({
        type: ActionType.ACTIVE_CURRENCY,
        payload: item,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const setActiveTab = (activeTab: string | null) => ({
  type: ActionType.SET_ACTIVE_TAB,
  payload: activeTab,
});
