import { ActionType } from "state/action-types";

interface TokenDetail {
  type: ActionType.TOKEN_DETAIL;
  payload: any;
}

interface TokenListRequest {
  type: ActionType.GET_TOKEN_LIST_REQUEST;
}

interface TokenListToggle {
  type: ActionType.TOKEN_LIST_TOGGLE;
  payload: number;
}
interface TokenList {
  type: ActionType.GET_TOKEN_LIST;
  payload: any;
}

interface SearchedToken {
  type: ActionType.SEARCHED_TOKEN;
  payload: any;
}

export type TokenAction =
  | TokenDetail
  | TokenList
  | TokenListRequest
  | TokenListToggle
  | SearchedToken;
