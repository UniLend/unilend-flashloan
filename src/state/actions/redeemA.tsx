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
  message: string;
}

interface RedeemTokenBalance {
  type: ActionType.REDEEM_TOKEN_BALANCE;
  payload: any;
}

interface TransactionHash {
  type: ActionType.REDEEM_TRANSACTION_HASH;
  payload: any;
}

interface ErrorClear {
  type: ActionType.REDEEM_MESSAGE_CLEAR;
}

export type RedeemAction =
  | RedeemSuccess
  | RedeemFailed
  | RedeemTokenBalance
  | TransactionHash
  | _RedeemAction
  | ErrorClear;
