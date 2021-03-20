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
    const data = {
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [`${address}`],
      id: 1,
    };
    axios
      .post(
        "https://eth-mainnet.alchemyapi.io/v2/maI7ecducWmnh8z5s2B1H2G4KzHkHMtb",
        JSON.stringify(data)
      )
      .then((res: any) => {
        if (res.data.result) dispatch({ type: ActionType.SET_SEARCHED_TOKEN, payload: { data: res.data.result, message: null } });
      })
      .catch((e: any) => {
        console.log(e);
        dispatch({ type: ActionType.SET_SEARCHED_TOKEN, payload: { data: null, message: "Enter valid token address" } });
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
  return async (dispatch: Dispatch<TokenAction>) => { };
};
