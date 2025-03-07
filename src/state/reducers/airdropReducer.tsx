import { ActionType } from "state/action-types";
import { AirdropAction } from "state/actions/airdropA";

interface AirdropState {
  airdropLoading: boolean;
  airdropSuccessMessage: string;
  airdropSuccess: boolean;
  airdropTransactionHash: string;
  airdropTransactionHashReceived: boolean;
  airdropErrorMessage: string;
}

const initialState = {
  airdropLoading: false,
  airdropSuccess: false,
  airdropSuccessMessage: "",
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
        airdropSuccessMessage: "",
      };
    case ActionType.AIRDROP_SUCCESS:
      return {
        ...state,
        airdropLoading: false,
        airdropSuccess: true,
        airdropSuccessMessage: "Airdrop Successful",
      };
    case ActionType.AIRDROP_FAILED:
      return {
        ...state,
        airdropLoading: false,
        airdropSuccess: false,
        airdropTransactionHashReceived: false,
        airdropErrorMessage: action.message,
        airdropSuccessMessage: "",
      };
    case ActionType.AIRDROP_TRANSACTION_HASH:
      return {
        ...state,
        airdropTransactionHash: action.payload,
        airdropTransactionHashReceived: true,
      };
    case ActionType.AIRDROP_MESSAGE_CLEAR:
      return { ...state, airdropErrorMessage: "", airdropSuccessMessage: "" };
    default:
      return { ...state };
  }
};

export default AirdropReducer;
