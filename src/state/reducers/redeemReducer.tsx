import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

interface RedeemState {
  redeemIsApproved: boolean | undefined;
  redeemLoading: boolean;
  redeemTokenBalance: any;
}

const initialState = {
  redeemIsApproved: undefined,
  redeemLoading: false,
  redeemTokenBalance: "",
};

const RedeemReducer = (
  state: RedeemState = initialState,
  action: RedeemAction
): RedeemState => {
  switch (action.type) {
    case ActionType.REDEEM_ACTION:
      return { ...state, redeemLoading: true };
    case ActionType.REDEEM_SUCCESS:
      return { ...state, redeemLoading: false };
    case ActionType.REDEEM_FAILED:
      return { ...state, redeemLoading: false };
    case ActionType.REDEEM_TOKEN_BALANCE:
      return { ...state, redeemTokenBalance: action.payload };
    default:
      return { ...state };
  }
};
export default RedeemReducer;
