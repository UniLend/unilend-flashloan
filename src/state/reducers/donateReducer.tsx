import { ActionType } from "state/action-types";
import { DonateAction } from "state/actions/donateA";

interface DonateState {
  donateContractAddress: string;
  donateIsApproved: boolean | undefined;
  donateLoading: boolean;
  donateAllowanceLoading: boolean;
}

const initialState = {
  donateContractAddress: "",
  donateIsApproved: undefined,
  donateLoading: false,
  donateAllowanceLoading: false,
};

const DonateReducer = (
  state: DonateState = initialState,
  action: DonateAction
): DonateState => {
  switch (action.type) {
    case ActionType.DONATE_ALLOWANCE_ACTION:
      return { ...state, donateAllowanceLoading: true };
    case ActionType.DONATE_ALLOWANCE_FAILED:
      return { ...state, donateAllowanceLoading: false };
    case ActionType.DONATE_ALLOWANCE_SUCCESS:
      return { ...state, donateAllowanceLoading: false };
    case ActionType.GET_DONATION_CONTRACT:
      return { ...state, donateContractAddress: action.payload };
    case ActionType.DONATE_ACTION:
      return {
        ...state,
        donateLoading: true,
      };
    case ActionType.DONATE_SUCCESS:
      return {
        ...state,
        donateLoading: false,
      };
    case ActionType.DONATE_FAILED:
      return {
        ...state,
        donateLoading: false,
      };
    case ActionType.DONATE_APPROVAL_STATUS:
      return {
        ...state,
        donateIsApproved: action.payload,
        donateAllowanceLoading: false,
      };
    default:
      return { ...state };
  }
};

export default DonateReducer;
