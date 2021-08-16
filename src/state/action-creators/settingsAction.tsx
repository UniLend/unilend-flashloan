import { errorHandler } from "index";
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
      errorHandler.report(e);

      dispatch({
        type: ActionType.CURRENT_THEME,
        payload: "dark",
      });
    }
  };
};

export const setActiveCurrency = (item: any) => {
  return async (dispatch: Dispatch<SettingAction>) => {
    dispatch({
      type: ActionType.ACTIVE_CURRENCY,
      payload: item,
    });
  };
};

export const setActiveTab = (activeTab: string | null) => ({
  type: ActionType.SET_ACTIVE_TAB,
  payload: activeTab,
});

export const setParams = (item: any) => {
  return async (dispatch: Dispatch<SettingAction>) => {
    dispatch({
      type: ActionType.PARAMS,
      payload: item,
    });
  };
};
