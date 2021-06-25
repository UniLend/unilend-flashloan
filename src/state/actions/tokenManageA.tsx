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

interface setSearchedToken {
  type: ActionType.SET_SEARCHED_TOKEN;
  payload: { data: any; message: string | null };
}

interface setTokenPersist {
  type: ActionType.SET_TOKEN_PERSIST;
  payload: any;
}

interface setCustomTokens {
  type: ActionType.SET_CUSTOM_TOKENS;
  payload: any;
  calc: any;
}

interface setCustomTokenPersist {
  type: ActionType.SET_CUSTOM_TOKEN_PERSIST;
  payload: any;
}

export type TokenAction =
  | TokenDetail
  | TokenList
  | TokenListRequest
  | TokenListToggle
  | setSearchedToken
  | setTokenPersist
  | setCustomTokens
  | setCustomTokenPersist;
