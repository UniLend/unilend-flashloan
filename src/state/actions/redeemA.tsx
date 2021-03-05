import { ActionType } from "state/action-types";

interface RedeemSuccess {
    type: ActionType.REDEEM_SUCCESS,
    payload: string
}

interface RedeemFailed {
    type: ActionType.REDEEM_FAILED,
    payload: string
}

export type RedeemAction = RedeemSuccess | RedeemFailed;
