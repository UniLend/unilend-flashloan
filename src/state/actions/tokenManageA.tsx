import { ActionType } from "state/action-types";

interface TokenDetail {
  type: ActionType.TOKEN_DETAIL;
  payload: any;
}

interface TokenListRequest {
  type: ActionType.GET_TOKEN_LIST_REQUEST;
}
interface TokenList {
  type: ActionType.GET_TOKEN_LIST;
  payload: any;
}
export type TokenAction = TokenDetail | TokenList | TokenListRequest;
