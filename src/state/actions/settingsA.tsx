import { ActionType } from "../action-types";

interface Theme {
  type: ActionType.CURRENT_THEME;
  payload: string;
}

export type SettingAction = Theme;
