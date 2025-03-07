import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

interface RedeemState {
  redeemIsApproved: boolean | undefined;
  redeemLoading: boolean;
  redeemTokenBalance: any;
  redeemSuccess: boolean;
  redeemTransactionHash: string;
  redeemTransactionHashReceived: boolean;
  redeemErrorMessage: string;
  redeemSuccessMessage: string;
}

const initialState = {
  redeemIsApproved: undefined,
  redeemLoading: false,
  redeemTokenBalance: "",
  redeemSuccess: false,
  redeemTransactionHash: "",
  redeemTransactionHashReceived: false,
  redeemErrorMessage: "",
  redeemSuccessMessage: "",
};

const RedeemReducer = (
  state: RedeemState = initialState,
  action: RedeemAction
): RedeemState => {
  switch (action.type) {
    case ActionType.REDEEM_ACTION:
      return {
        ...state,
        redeemLoading: true,
        redeemSuccess: false,
        redeemTransactionHash: "",
        redeemTransactionHashReceived: false,
        redeemErrorMessage: "",
        redeemSuccessMessage: "",
      };
    case ActionType.REDEEM_SUCCESS:
      return {
        ...state,
        redeemLoading: false,
        redeemSuccess: true,
        redeemSuccessMessage: "Redeem Successful",
      };
    case ActionType.REDEEM_FAILED:
      return {
        ...state,
        redeemLoading: false,
        redeemSuccess: false,
        redeemTransactionHash: "",
        redeemTransactionHashReceived: false,
        redeemErrorMessage: action.message,
      };
    case ActionType.REDEEM_TOKEN_BALANCE:
      return { ...state, redeemTokenBalance: action.payload };
    case ActionType.REDEEM_TRANSACTION_HASH:
      return {
        ...state,
        redeemTransactionHash: action.payload,
        redeemTransactionHashReceived: true,
        redeemErrorMessage: "",
      };
    case ActionType.REDEEM_MESSAGE_CLEAR:
      return { ...state, redeemErrorMessage: "", redeemSuccessMessage: "" };
    default:
      return { ...state };
  }
};
export default RedeemReducer;
