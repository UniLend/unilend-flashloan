import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";

export const fetchTokenList = () => {
  return async (dispatch: Dispatch<TokenAction>) => {
    let URL = "https://www.gemini.com/uniswap/manifest.json";
    axios
      .get(URL)
      .then((response) => {
        dispatch({
          type: ActionType.TOKEN_LIST,
          payload: response,
        });
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
};
