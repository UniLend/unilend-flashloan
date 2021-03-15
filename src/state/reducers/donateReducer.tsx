import { ActionType } from "state/action-types";
import { DonateAction } from "state/actions/donateA";

interface DonateState {
  donateContractAddress: string;
  donateIsApproved: boolean | undefined;
}

const initialState = {
  donateContractAddress: "",
  donateIsApproved: undefined,
};

const DonateReducer = (
  state: DonateState = initialState,
  action: DonateAction
): DonateState => {
  switch (action.type) {
    case ActionType.GET_DONATION_CONTRACT:
      return { ...state, donateContractAddress: action.payload };
    case ActionType.DONATE_APPROVAL_STATUS:
      return { ...state, donateIsApproved: action.payload };
    default:
      return { ...state };
  }
};

export default DonateReducer;
