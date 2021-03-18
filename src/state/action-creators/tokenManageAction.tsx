import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";

export const fetchTokenList = () => {
  return async (dispatch: Dispatch<TokenAction>) => {
    dispatch({ type: ActionType.GET_TOKEN_LIST_REQUEST });
    let URL = "https://www.gemini.com/uniswap/manifest.json";
    axios
      .get(URL)
      .then((res) => {
        if (res.data) {
          const tokenList = res.data.tokens;
          dispatch({
            type: ActionType.GET_TOKEN_LIST,
            payload: tokenList,
          });
        } else
          dispatch({
            type: ActionType.GET_TOKEN_LIST,
            payload: [],
          });
      })
      .catch((e: any) => {
        console.log(e);
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
