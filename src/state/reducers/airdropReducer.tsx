import { ActionType } from "state/action-types";
import { AirdropAction } from "state/actions/airdropA";

interface AirdropState {
  airdropLoading: boolean;
  airdropSuccess:boolean;
}

const initialState = {
  airdropLoading: false,
  airdropSuccess:false
};

const AirdropReducer = (
  state: AirdropState = initialState,
  action: AirdropAction
): AirdropState => {
  switch (action.type) {
    case ActionType.AIRDROP_ACTION:
      return { ...state, airdropLoading: true , airdropSuccess:false};
    case ActionType.AIRDROP_SUCCESS:
      return { ...state, airdropLoading: false, airdropSuccess:true };
    case ActionType.AIRDROP_FAILED:
      return { ...state, airdropLoading: false, airdropSuccess:false };
    default:
      return { ...state };
  }
};

export default AirdropReducer;
