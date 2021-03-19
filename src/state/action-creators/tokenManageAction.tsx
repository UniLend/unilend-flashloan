import axios from "axios";
import { AnyNsRecord } from "node:dns";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";

export const fetchTokenList = (tokenList: any) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    let totalTokenList: any = [];
    dispatch({ type: ActionType.GET_TOKEN_LIST_REQUEST });
    if (tokenList) {
      let _enableChecked = tokenList.some((item: any) => item.isEnabled);
      console.log(_enableChecked);
      _enableChecked
        ? tokenList.forEach((item: any) => {
            if (item.isEnabled) {
              axios
                .get(item.fetchURI)
                .then((res) => {
                  if (res.data) {
                    const tokenList: any = res.data.tokens;
                    if (tokenList) totalTokenList.push(...tokenList);
                  }
                  dispatch({
                    type: ActionType.GET_TOKEN_LIST,
                    payload: [...totalTokenList],
                  });
                })
                .catch((e: any) => {
                  console.log(e);
                });
            }
          })
        : dispatch({
            type: ActionType.GET_TOKEN_LIST,
            payload: [],
          });
    }
  };
};

export const handleTokenListToggle = (id: number) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    console.log(id);
    dispatch({
      type: ActionType.TOKEN_LIST_TOGGLE,
      payload: id,
    });
  };
};

export const searchToken = (address: string) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    dispatch({
      type: ActionType.SEARCHED_TOKEN,
      payload: ["0x1985365e9f78359a9B6AD760e32412f4a445E862"],
    });
  };
};

export const resetList = () => {
  return async (dispatch: Dispatch<TokenAction>) => {
    dispatch({
      type: ActionType.GET_TOKEN_LIST,
      payload: [],
    });
  };
};

export const getErcTokenDetail = () => {
  return async (dispatch: Dispatch<TokenAction>) => {};
};
