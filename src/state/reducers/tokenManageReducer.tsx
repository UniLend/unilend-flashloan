import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";
import AaveIcon from "assets/download.svg";
import axios from "axios";

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
    message: null
  },
  tokenList: {
    isRequesting: false,
    payload: [],
  },
  tokenGroupList: [
    {
      id: 1,
      name: "Gemini Token List",
      icon: "https://gemini.com/static/images/loader.png",
      token: 21,
      fetchURI: "https://www.gemini.com/uniswap/manifest.json",
      isEnabled: true,
    },
    {
      id: 2,
      name: "CMC DeFi",
      icon:
        "https://cloudflare-ipfs.com/ipfs/QmQAGtNJ2rSGpnP6dh6PPKNSmZL8RTZXmgFwgTdy5Nz5mx/",
      token: 144,
      fetchURI:
        "https://wispy-bird-88a7.uniswap.workers.dev/?url=http://defi.cmc.eth.link",
      isEnabled: false,
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
          message: message ? message : null
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
