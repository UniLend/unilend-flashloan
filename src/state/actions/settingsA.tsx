import { ActionType } from "../action-types";

interface Theme {
  type: ActionType.CURRENT_THEME;
  payload: string;
}

interface ActiveTab {
  type: string;
  payload: string;
}
export type SettingAction = Theme | ActiveTab;
