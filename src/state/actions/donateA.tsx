import { ActionType } from "state/action-types";

interface DonateSuccess {
  type: ActionType.DONATE_SUCCESS;
  payload: string;
}

interface DonateFailed {
  type: ActionType.DONATE_FAILED;
  payload: string;
}

interface DonateContract {
  type: ActionType.GET_DONATION_CONTRACT;
  payload: string;
}

interface DonateApprovalStatus {
  type: ActionType.DONATE_APPROVAL_STATUS;
  payload: boolean;
}

export type DonateAction =
  | DonateSuccess
  | DonateFailed
  | DonateContract
  | DonateApprovalStatus;
