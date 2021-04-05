import { ActionType } from "state/action-types";
import { AirdropAction } from "state/actions/airdropA";

interface AirdropState {
  airdropLoading: boolean;
  airdropSuccess: boolean;
  airdropTransactionHash: string;
  airdropTransactionHashReceived: boolean;
  airdropErrorMessage: string;
}

const initialState = {
  airdropLoading: false,
  airdropSuccess: false,
  airdropTransactionHash: "",
  airdropTransactionHashReceived: false,
  airdropErrorMessage: "",
};

const AirdropReducer = (
  state: AirdropState = initialState,
  action: AirdropAction
): AirdropState => {
  switch (action.type) {
    case ActionType.AIRDROP_ACTION:
      return {
        ...state,
        airdropLoading: true,
        airdropSuccess: false,
        airdropTransactionHashReceived: false,
        airdropTransactionHash: "",
        airdropErrorMessage: "",
      };
    case ActionType.AIRDROP_SUCCESS:
      return { ...state, airdropLoading: false, airdropSuccess: true };
    case ActionType.AIRDROP_FAILED:
      return {
        ...state,
        airdropLoading: false,
        airdropSuccess: false,
        airdropTransactionHashReceived: false,
        airdropErrorMessage: action.message,
      };
    case ActionType.AIRDROP_TRANSACTION_HASH:
      return {
        ...state,
        airdropTransactionHash: action.payload,
        airdropTransactionHashReceived: true,
      };
    default:
      return { ...state };
  }
};

export default AirdropReducer;
