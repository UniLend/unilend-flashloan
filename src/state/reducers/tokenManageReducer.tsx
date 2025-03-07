import { ActionType } from 'state/action-types'
import { TokenAction } from 'state/actions/tokenManageA'

// interface TokenGroupList {
//   id: number;
//   name: string;
//   icon: any;
//   token: number;
//   fetchURI: string;
//   isEnabled: boolean;
// }

interface TokenManageState {
  tokenList: {
    isRequesting: boolean
    payload: Array<object> | []
  }
  tokenByUrl: any
  tokenGroupList: any
  searchedToken: {
    isRequesting: boolean | any
    payload: any
    message: string | null
  }
  customTokens: any
}

const initialState = {
  searchedToken: {
    isRequesting: false,
    payload: null,
    message: null,
  },
  tokenList: {
    isRequesting: false,
    payload: [],
  },
  tokenByUrl: [
    {
      url: 'https://unilend.finance/list.json',
      isEnabled: true,
    },
    { url: 'https://tokens.coingecko.com/uniswap/all.json', isEnabled: false },
  ],
  tokenGroupList: [
    // {
    //   id: 1,
    //   name: "Unilend Token List",
    //   icon: "https://assets.coingecko.com/coins/images/12819/small/UniLend_Finance_logo_PNG.png",
    //   token: 1,
    //   fetchURI: "https://unilend.finance/list.json",
    //   isEnabled: true,
    // },
  ],
  customTokens: [],
}

const TokenManageReducer = (state: TokenManageState = initialState, action: TokenAction): TokenManageState => {
  switch (action.type) {
    case ActionType.GET_TOKEN_LIST_REQUEST: {
      state = {
        ...state,
        tokenList: {
          isRequesting: true,
          payload: [],
        },
      }
      break
    }
    case ActionType.SET_CUSTOM_TOKENS: {
      let updatedState
      if (action.calc === 'add') {
        updatedState = [...state.customTokens, action.payload]
        localStorage.setItem('customTokens', JSON.stringify(updatedState))
      } else if (action.calc === 'delete') {
        let _tokens = [...state.customTokens]
        updatedState = _tokens.filter((item) => item.address !== action.payload)
        localStorage.setItem('customTokens', JSON.stringify(updatedState))
      }
      state = {
        ...state,
        customTokens: updatedState,
      }
      break
    }
    case ActionType.SET_TOKEN_PERSIST: {
      state = {
        ...state,
        tokenGroupList: action.payload,
      }
      break
    }
    case ActionType.SET_CUSTOM_TOKEN_PERSIST: {
      state = {
        ...state,
        customTokens: action.payload,
      }
      break
    }
    case ActionType.GET_TOKEN_LIST: {
      state = {
        ...state,
        tokenList: {
          isRequesting: false,
          payload: action.payload,
        },
      }
      break
    }
    case ActionType.TOKEN_LIST_TOGGLE: {
      let array_copy: any = state.tokenGroupList.map((item) => {
        if (item.id === action.payload) {
          item['isEnabled'] = !item.isEnabled
        }
        return item
      })
      localStorage.setItem('tokenGroup', JSON.stringify(array_copy))
      state = {
        ...state,
        tokenGroupList: [...array_copy],
      }
      break
    }
    case ActionType.SET_SEARCHED_TOKEN: {
      const { data, message, loading } = action.payload

      state = {
        ...state,
        searchedToken: {
          isRequesting: loading,
          payload: data ? data : null,
          message: message ? message : null,
        },
      }
      break
    }
    default:
      break
  }
  return state
}

export default TokenManageReducer
