import { ActionType } from "../action-types";

interface Theme {
  type: ActionType.CURRENT_THEME;
  payload: string;
}

interface ActiveTab {
  type: string;
  payload: string;
}

interface ActiveCurrency {
  type: string;
  payload: any;
}

interface Params {
  type: string;
  payload: any;
}

export type SettingAction = Theme | ActiveTab | ActiveCurrency | Params;
