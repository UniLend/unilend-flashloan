import { ActionType } from "state/action-types";

interface DepositAmount {
  type: ActionType.DEPOSIT_AMOUNT;
  payload: string;
}

interface DepositApprovalStatus {
  type: ActionType.DEPOSIT_APPROVAL_STATUS;
  payload: boolean;
}

interface DepositStatus {
  type: ActionType.DEPOSIT_STATUS;
  payload: boolean;
}

interface _DepositAction {
  type: ActionType.DEPOSIT_ACTION;
}

interface DepositSuccess {
  type: ActionType.DEPOSIT_SUCCESS;
  payload: boolean;
}

interface DepositFailed {
  type: ActionType.DEPOSIT_FAILED;
  payload: boolean;
}

export type DepositAction =
  | DepositAmount
  | DepositApprovalStatus
  | DepositStatus
  | _DepositAction
  | DepositSuccess
  | DepositFailed;
