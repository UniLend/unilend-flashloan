import { ActionType } from "state/action-types";
import { AirdropAction } from "state/actions/airdropA";

interface AirdropState {
  airdropLoading: boolean;
}

const initialState = {
  airdropLoading: false,
};

const AirdropReducer = (
  state: AirdropState = initialState,
  action: AirdropAction
): AirdropState => {
  switch (action.type) {
    case ActionType.AIRDROP_ACTION:
      return { ...state, airdropLoading: true };
    case ActionType.AIRDROP_SUCCESS:
      return { ...state, airdropLoading: false };
    case ActionType.AIRDROP_FAILED:
      return { ...state, airdropLoading: false };
    default:
      return { ...state };
  }
};

export default AirdropReducer;
