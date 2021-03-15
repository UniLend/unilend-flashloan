import { ActionType } from "state/action-types";

interface DepositAmount {
  type: ActionType.DEPOSIT_AMOUNT;
  payload: string;
}

interface DepositApprovalStatus {
  type: ActionType.DEPOSIT_APPROVAL_STATUS;
  payload: boolean;
}

export type DepositAction = DepositAmount | DepositApprovalStatus;
