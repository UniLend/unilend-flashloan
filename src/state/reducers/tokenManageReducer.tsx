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
  searchedToken: any;
  tokenList: {
    isRequesting: boolean;
    payload: Array<object> | [];
  };
  tokenGroupList: TokenGroupList[];
}

const initialState = {
  searchedToken: null,
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
    case ActionType.TOKEN_DETAIL:
      state = { ...state, searchedToken: action.payload };
      break;
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
    case ActionType.SEARCHED_TOKEN: {
      //       URL: https://eth-mainnet.alchemyapi.io/v2/your-api-key
      // RequestType: POST
      // Body:
      // {
      //     "jsonrpc":"2.0",
      //     "method":"alchemy_getTokenMetadata",
      //     "params":["0x1985365e9f78359a9B6AD760e32412f4a445E862"],
      //     "id":1
      // }
      axios
        .post(
          "https://eth-kovan.alchemyapi.io/v2/maI7ecducWmnh8z5s2B1H2G4KzHkHMtb",
          {
            jsonrpc: "2.0",
            method: "alchemy_getTokenMetadata",
            params: action.payload,
            id: 1,
          }
        )
        .then((res: any) => {
          console.log(res);
        });
      break;
    }
    default:
      break;
  }
  return state;
};

export default TokenManageReducer;
