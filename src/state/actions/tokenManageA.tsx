import { ActionType } from "state/action-types";

interface TokenDetail {
  type: ActionType.TOKEN_DETAIL;
  payload: any;
}

interface TokenList {
  type: ActionType.TOKEN_LIST;
  payload: any;
}
export type TokenAction = TokenDetail | TokenList;
