import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";

interface TokenGroupList {
  id: number;
  name: string;
  icon: any;
  token: number;
  fetchURI: string;
  isEnabled: boolean;
}
interface TokenManageState {
  tokenList: {
    isRequesting: boolean;
    payload: Array<object> | [];
  };
  tokenGroupList: TokenGroupList[];
  searchedToken: {
    payload: any;
    message: string | null;
  };
}

const initialState = {
  searchedToken: {
    payload: null,
    message: null,
  },
  tokenList: {
    isRequesting: false,
    payload: [],
  },
  tokenGroupList: [
    {
      id: 1,
      name: "Unilend Token List",
      icon: "https://assets.coingecko.com/coins/images/12819/small/UniLend_Finance_logo_PNG.png",
      token: 1,
      fetchURI: "https://unilend.finance/list.json",
      isEnabled: true,
    },
    {
      id: 2,
      name: "CoinGecko",
      icon: "https://www.coingecko.com/assets/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png",
      token: 4480,
      fetchURI: "https://tokens.coingecko.com/uniswap/all.json",
      isEnabled: true,
    },
  ],
};

const TokenManageReducer = (
  state: TokenManageState = initialState,
  action: TokenAction
): TokenManageState => {
  switch (action.type) {
    case ActionType.GET_TOKEN_LIST_REQUEST: {
      state = {
        ...state,
        tokenList: {
          isRequesting: true,
          payload: [],
        },
      };
      break;
    }
    case ActionType.GET_TOKEN_LIST: {
      state = {
        ...state,
        tokenList: {
          isRequesting: false,
          payload: action.payload ? action.payload : [],
        },
      };
      break;
    }
    case ActionType.TOKEN_LIST_TOGGLE: {
      let array_copy: any = state.tokenGroupList.map((item) => {
        if (item.id === action.payload) {
          item["isEnabled"] = !item.isEnabled;
        }
        return item;
      });
      state = {
        ...state,
        tokenGroupList: [...array_copy],
      };
      break;
    }
    case ActionType.SET_SEARCHED_TOKEN: {
      const { data, message } = action.payload;

      state = {
        ...state,
        searchedToken: {
          payload: data ? data : null,
          message: message ? message : null,
        },
      };
      break;
    }
    default:
      break;
  }
  return state;
};

export default TokenManageReducer;
