import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";

interface TokenManageState {
  searchedToken: any;
}

const initialState = {
  searchedToken: null,
};

const TokenManageReducer = (
  state: TokenManageState = initialState,
  action: TokenAction
): TokenManageState => {
  switch (action.type) {
    case ActionType.TOKEN_DETAIL:
      return { ...state, searchedToken: action.payload };
    default:
      return { ...state };
  }
};

export default TokenManageReducer;
