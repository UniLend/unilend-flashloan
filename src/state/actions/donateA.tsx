import { ActionType } from "state/action-types";

interface _DonateAction {
  type: ActionType.DONATE_ACTION;
}

interface DonateSuccess {
  type: ActionType.DONATE_SUCCESS;
  payload: boolean;
}

interface DonateFailed {
  type: ActionType.DONATE_FAILED;
  payload: boolean;
}

interface DonateContract {
  type: ActionType.GET_DONATION_CONTRACT;
  payload: string;
}

interface DonateApprovalStatus {
  type: ActionType.DONATE_APPROVAL_STATUS;
  payload: boolean;
}

interface AllowanceAction {
  type: ActionType.DONATE_ALLOWANCE_ACTION;
}

interface AllowanceSuccess {
  type: ActionType.DONATE_ALLOWANCE_SUCCESS;
}

interface AllowanceFailed {
  type: ActionType.DONATE_ALLOWANCE_FAILED;
}

interface ApproveAction {
  type: ActionType.DONATE_APPROVE_ACTION;
}

interface ApproveSuccess {
  type: ActionType.DONATE_APPROVE_SUCCESS;
}

interface ApproveFailed {
  type: ActionType.DONATE_APPROVE_FAILED;
}

export type DonateAction =
  | _DonateAction
  | DonateSuccess
  | DonateFailed
  | DonateContract
  | DonateApprovalStatus
  | AllowanceAction
  | AllowanceSuccess
  | AllowanceFailed
  | ApproveAction
  | ApproveSuccess
  | ApproveFailed;
