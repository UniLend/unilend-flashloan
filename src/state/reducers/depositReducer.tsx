import { ActionType } from "state/action-types";
import { DepositAction } from "state/actions/depositA";

interface DepositState {
  isDepositApproved: boolean | undefined;
  isDepositSuccess: boolean | undefined;
  depositLoading: boolean;
  depositAllowanceLoading: boolean;
  depositErrorMessage: string;
  depositIsApproving: boolean;
  depositTransactionHash: any;
  depositTransactionHashRecieved: boolean;
  depositSuccessMessage: string;
}

const initialState = {
  isDepositSuccess: undefined,
  isDepositApproved: undefined,
  depositLoading: false,
  depositAllowanceLoading: false,
  depositErrorMessage: "",
  depositIsApproving: false,
  depositTransactionHash: "",
  depositTransactionHashRecieved: false,
  depositSuccessMessage: "",
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
      };
    case ActionType.DEPOSIT_APPROVE_SUCCESS:
      return {
        ...state,
        depositIsApproving: false,
        isDepositApproved: true,
        depositAllowanceLoading: false,
      };
    case ActionType.DEPOSIT_APPROVE_FAILED:
      return {
        ...state,
        depositIsApproving: false,
        isDepositApproved: false,
        depositAllowanceLoading: false,
        depositErrorMessage: action.message ? action.message : "Approve Failed",
      };
    case ActionType.DEPOSIT_APPROVAL_STATUS:
      return {
        ...state,
        isDepositApproved: action.payload,
        depositAllowanceLoading: false,
      };
    case ActionType.DEPOSIT_TRANSACTION_HASH:
      return {
        ...state,
        depositTransactionHash: action.payload,
        depositTransactionHashRecieved: true,
      };
    case ActionType.DEPOSIT_ACTION:
      return {
        ...state,
        depositLoading: true,
        depositTransactionHash: "",
        depositTransactionHashRecieved: false,
        depositErrorMessage: "",
        depositSuccessMessage: "",
        isDepositSuccess: false,
      };
    case ActionType.DEPOSIT_SUCCESS:
      return {
        ...state,
        depositLoading: false,
        isDepositSuccess: true,
        depositSuccessMessage: "Deposited Successfully",
      };
    case ActionType.DEPOSIT_FAILED:
      return {
        ...state,
        depositLoading: false,
        isDepositSuccess: false,
        depositErrorMessage: action.message,
        depositTransactionHashRecieved: false,
      };
    case ActionType.DEPOSIT_MESSAGE_CLEAR:
      return { ...state, depositErrorMessage: "" };
    case ActionType.DEPOSIT_STATUS:
      return { ...state, isDepositSuccess: action.payload };
    default:
      return { ...state };
  }
};

export default DepositReducer;
