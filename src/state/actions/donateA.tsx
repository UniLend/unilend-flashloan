import { ActionType } from "state/action-types";

interface DonateSuccess {
  type: ActionType.DONATE_SUCCESS;
  payload: string;
}

interface DonateFailed {
  type: ActionType.DONATE_FAILED;
  payload: string;
}

export type DonateAction = DonateSuccess | DonateFailed;
