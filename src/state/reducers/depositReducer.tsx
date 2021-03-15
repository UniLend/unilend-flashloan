import { ActionType } from "state/action-types";
import { DepositAction } from "state/actions/depositA";

interface DepositState {
  isDepositApproved: boolean | undefined;
}

const initialState = {
  isDepositApproved: undefined,
};

const DepositReducer = (
  state: DepositState = initialState,
  action: DepositAction
): DepositState => {
  switch (action.type) {
    case ActionType.DEPOSIT_APPROVAL_STATUS:
      return { ...state, isDepositApproved: action.payload };
    default:
      return { ...state };
  }
};

export default DepositReducer;
