import { ActionType } from "state/action-types";

interface DepositAmount {
  type: ActionType.DEPOSIT_AMOUNT;
  payload: string;
}

export type DepositAction = DepositAmount;
