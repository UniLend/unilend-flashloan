import { ActionType } from "state/action-types";
import { DepositAction } from "state/actions/depositA";

interface DepositState {
  isDepositApproved: boolean | undefined;
  isDepositSuccess: boolean | undefined;
  depositLoading: boolean;
}

const initialState = {
  isDepositSuccess: undefined,
  isDepositApproved: undefined,
  depositLoading: false,
};

const DepositReducer = (
  state: DepositState = initialState,
  action: DepositAction
): DepositState => {
  switch (action.type) {
    case ActionType.DEPOSIT_APPROVAL_STATUS:
      return { ...state, isDepositApproved: action.payload };
    case ActionType.DEPOSIT_ACTION:
      return { ...state, depositLoading: true };
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
      };
    case ActionType.DEPOSIT_STATUS:
      return { ...state, isDepositSuccess: action.payload };
    default:
      return { ...state };
  }
};

export default DepositReducer;
