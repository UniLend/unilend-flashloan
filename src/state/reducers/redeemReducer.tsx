import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

interface RedeemState {
  redeemIsApproved: boolean | undefined;
  redeemLoading: boolean;
  redeemTokenBalance: any;
  redeemSuccess:boolean;
}

const initialState = {
  redeemIsApproved: undefined,
  redeemLoading: false,
  redeemTokenBalance: "",
  redeemSuccess:false
};

const RedeemReducer = (
  state: RedeemState = initialState,
  action: RedeemAction
): RedeemState => {
  switch (action.type) {
    case ActionType.REDEEM_ACTION:
      return { ...state, redeemLoading: true, redeemSuccess: false };
    case ActionType.REDEEM_SUCCESS:
      return { ...state, redeemLoading: false , redeemSuccess: true};
    case ActionType.REDEEM_FAILED:
      return { ...state, redeemLoading: false , redeemSuccess: false};
    case ActionType.REDEEM_TOKEN_BALANCE:
      return { ...state, redeemTokenBalance: action.payload };
    default:
      return { ...state };
  }
};
export default RedeemReducer;
