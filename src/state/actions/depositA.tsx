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

interface AllowanceAction {
  type: ActionType.DEPOSIT_ALLOWANCE_ACTION;
}

interface AllowanceSuccess {
  type: ActionType.DEPOSIT_ALLOWANCE_SUCCESS;
}

interface AllowanceFailed {
  type: ActionType.DEPOSIT_ALLOWANCE_FAILED;
}

interface ApproveAction {
  type:ActionType.DEPOSIT_APPROVE_ACTION;
}

interface ApproveSuccess {
  type:ActionType.DEPOSIT_APPROVE_SUCCESS;
}

interface ApproveFailed {
  type:ActionType.DEPOSIT_APPROVE_FAILED;
}

export type DepositAction =
  | DepositAmount
  | DepositApprovalStatus
  | DepositStatus
  | _DepositAction
  | DepositSuccess
  | DepositFailed
  | AllowanceAction
  | AllowanceSuccess
  | AllowanceFailed
  | ApproveAction
  | ApproveSuccess
  | ApproveFailed;
