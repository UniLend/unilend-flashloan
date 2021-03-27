import { ActionType } from "state/action-types";
import { DepositAction } from "state/actions/depositA";

interface DepositState {
  isDepositApproved: boolean | undefined;
  isDepositSuccess: boolean | undefined;
  depositLoading: boolean;
  depositAllowanceLoading: boolean;
  depositErrorMessage: string;
  depositIsApproving: boolean;
}

const initialState = {
  isDepositSuccess: undefined,
  isDepositApproved: undefined,
  depositLoading: false,
  depositAllowanceLoading: false,
  depositErrorMessage: "",
  depositIsApproving:false
};

const DepositReducer = (
  state: DepositState = initialState,
  action: DepositAction
): DepositState => {
  switch (action.type) {
    case ActionType.DEPOSIT_ALLOWANCE_ACTION:
      return { ...state, depositAllowanceLoading: true };
    case ActionType.DEPOSIT_ALLOWANCE_FAILED:
      return {
        ...state,
        depositAllowanceLoading: false,
      };
    case ActionType.DEPOSIT_ALLOWANCE_SUCCESS:
      return {
        ...state,
        depositAllowanceLoading: false,
      };
    case ActionType.DEPOSIT_APPROVE_ACTION:
      return {
        ...state,
        depositIsApproving: true,
      }
    case ActionType.DEPOSIT_APPROVE_SUCCESS:
      return {
        ...state,
        depositIsApproving: false,
      }
    case ActionType.DEPOSIT_APPROVE_FAILED:
      return {
        ...state,
        depositIsApproving: false,
      }
    case ActionType.DEPOSIT_APPROVAL_STATUS:
      return {
        ...state,
        isDepositApproved: action.payload,
        depositAllowanceLoading: false,
      };
    case ActionType.DEPOSIT_ACTION:
      return { ...state, depositLoading: true, depositErrorMessage: "" };
    case ActionType.DEPOSIT_SUCCESS:
      return {
        ...state,
        depositLoading: false,
        isDepositSuccess: true,
      };
    case ActionType.DEPOSIT_FAILED:
      return {
        ...state,
        depositLoading: false,
        isDepositSuccess: false,
        depositErrorMessage: "Deposit Failed",
      };
    case ActionType.DEPOSIT_STATUS:
      return { ...state, isDepositSuccess: action.payload };
    default:
      return { ...state };
  }
};

export default DepositReducer;
