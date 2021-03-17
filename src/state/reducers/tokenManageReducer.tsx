import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";

interface TokenManageState {
  searchedToken: any;
  tokenList: {
    isRequesting: boolean,
    payload: Array<object> | []
  }
}

const initialState = {
  searchedToken: null,
  tokenList: {
    isRequesting: false,
    payload: []
  }
};

const TokenManageReducer = (
  state: TokenManageState = initialState,
  action: TokenAction
): TokenManageState => {
  switch (action.type) {
    case ActionType.TOKEN_DETAIL:
      state = { ...state, searchedToken: action.payload };
      break;
    case ActionType.GET_TOKEN_LIST_REQUEST: {
      state = {
        ...state,
        tokenList: {
          isRequesting: true,
          payload: []
        }
      };
      break;
    }
    case ActionType.GET_TOKEN_LIST: {
      state = {
        ...state,
        tokenList: {
          isRequesting: false,
          payload: action.payload ? action.payload : []
        }
      };
      break;
    }
    default:
      break;
  }
  return state;
};

export default TokenManageReducer;
