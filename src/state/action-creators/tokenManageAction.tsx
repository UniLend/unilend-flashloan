import axios from "axios";
import { setTimestamp, toFixed } from "components/Helpers";
import { UnilendFlashLoanCoreContract } from "ethereum/contracts";
import { BalanceContract } from "ethereum/contracts/FlashloanLB";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";

export const fetchTokenList = (
  tokenList: any,
  networkId: any,
  currentProvider: any,
  accounts: any,
  accountBalance: any
) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    let totalTokenList: any = [];
    dispatch({ type: ActionType.GET_TOKEN_LIST_REQUEST });
    if (tokenList) {
      let _enableChecked = tokenList.some((item: any) => item.isEnabled);

      _enableChecked
        ? tokenList.forEach((item: any) => {
            if (item.isEnabled) {
              axios
                .get(item.fetchURI)
                .then((res) => {
                  if (res.data) {
                    const tokenList: any = res.data.tokens.filter(
                      (item: any) => {
                        // eslint-disable-next-line eqeqeq
                        return item.chainId == networkId;
                      }
                    );
                    let addresses = tokenList.map((item: any) => {
                      return item.address;
                    });

                    if (currentProvider) {
                      let timestamp = setTimestamp();
                      try {
                        if (accountBalance > 0) {
                          BalanceContract(currentProvider)
                            .methods.getUserBalances(
                              UnilendFlashLoanCoreContract(currentProvider),
                              accounts[0],
                              addresses,
                              timestamp
                            )
                            .call((error: any, result: any) => {
                              if (!error && result) {
                                tokenList.forEach((item: any, i: number) => {
                                  let fullAmount = toFixed(
                                    result[0][i] / Math.pow(10, item.decimals),
                                    3
                                  );
                                  let underlyingBalance = toFixed(
                                    result[1][i] / Math.pow(10, item.decimals),
                                    3
                                  );
                                  item["balance"] = fullAmount;
                                  item["underlyingBalance"] = underlyingBalance;
                                  totalTokenList.push(item);
                                  dispatch({
                                    type: ActionType.GET_TOKEN_LIST,
                                    payload: [...totalTokenList],
                                  });
                                  return item;
                                });
                              } else {
                                dispatch({
                                  type: ActionType.GET_TOKEN_LIST,
                                  payload: [],
                                });
                              }
                            });
                        } else {
                          tokenList.forEach((item: any, i: number) => {
                            item["balance"] = "";
                            totalTokenList.push(item);
                            dispatch({
                              type: ActionType.GET_TOKEN_LIST,
                              payload: [...totalTokenList],
                            });
                          });
                        }
                      } catch (e) {
                        dispatch({
                          type: ActionType.GET_TOKEN_LIST,
                          payload: [...tokenList],
                        });
                      }
                      dispatch({
                        type: ActionType.GET_TOKEN_LIST,
                        payload: [...totalTokenList],
                      });
                      // console.log(newList);
                      // if (tokenList) totalTokenList.push(...newList);
                    } else {
                      if (tokenList) totalTokenList.push(...tokenList);
                      dispatch({
                        type: ActionType.GET_TOKEN_LIST,
                        payload: [...totalTokenList],
                      });
                    }
                  } else {
                    dispatch({
                      type: ActionType.GET_TOKEN_LIST,
                      payload: [],
                    });
                  }
                })
                .catch((e: any) => {
                  dispatch({
                    type: ActionType.GET_TOKEN_LIST,
                    payload: [],
                  });
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
        if (res.data.result)
          dispatch({
            type: ActionType.SET_SEARCHED_TOKEN,
            payload: { data: res.data.result, message: null },
          });
      })
      .catch((e: any) => {
        dispatch({
          type: ActionType.SET_SEARCHED_TOKEN,
          payload: { data: null, message: "Enter valid token address" },
        });
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
