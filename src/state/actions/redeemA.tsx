import { ActionType } from "state/action-types";

interface _RedeemAction {
  type: ActionType.REDEEM_ACTION;
}
interface RedeemSuccess {
  type: ActionType.REDEEM_SUCCESS;
  payload: string;
}

interface RedeemFailed {
  type: ActionType.REDEEM_FAILED;
  payload: string;
}

interface RedeemTokenBalance {
  type: ActionType.REDEEM_TOKEN_BALANCE;
  payload: any;
}

export type RedeemAction =
  | RedeemSuccess
  | RedeemFailed
  | RedeemTokenBalance
  | _RedeemAction;
