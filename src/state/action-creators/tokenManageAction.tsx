import axios from "axios";
import { setTimestamp, toFixed } from "components/Helpers";
import { UnilendFlashLoanCoreContract } from "ethereum/contracts";
import { BalanceContract } from "ethereum/contracts/FlashloanLB";
import { errorHandler } from "index";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { TokenAction } from "state/actions/tokenManageA";
import { v4 as uuidv4 } from "uuid";

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
        console.log(res);
        if (res?.data?.result)
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

// export const fetchTokenList = (
//   tokenList: any,
//   networkId: any,
//   currentProvider: any,
//   accounts: any,
//   accountBalance: any,
//   selectedNetworkId: any
// ) => {
//   return async (dispatch: Dispatch<TokenAction>) => {
//     let timestamp = setTimestamp();
//     let totalTokenList: any = [];
//     // dispatch({ type: ActionType.GET_TOKEN_LIST_REQUEST });
//     if (tokenList) {
//       console.log(tokenList);
//       let _enableChecked = tokenList.some((item: any) => item.isEnabled);

//       _enableChecked
//         ? tokenList.forEach((token: any, i: any) => {
//             if (token.isEnabled) {
//               console.log(token);
//               axios.get(`${token.fetchURI}?t=${timestamp}`).then((res) => {
//                 let tokens = [...res.data.tokens];
//                 if (res.data) {
//                   const tokenList: any = tokens.filter((item: any) => {
//                     // eslint-disable-next-line eqeqeq
//                     return item.chainId == networkId;
//                   });
//                   let addresses = tokenList.map((item: any) => {
//                     return item.address;
//                   });
//                   totalTokenList.push(...tokenList);
//                   console.log(totalTokenList);

//                 }
//               });
//               if (i === tokenList.length - 1) {
//                 dispatch({
//                   type: ActionType.GET_TOKEN_LIST,
//                   payload: totalTokenList,
//                 });
//               }
//             }
//           })
//         : dispatch({
//             type: ActionType.GET_TOKEN_LIST,
//             payload: [],
//           });
//     }
//   };
// };

export const fetchTokenList = (
  tokenList: any,
  networkId: any,
  currentProvider: any,
  accounts: any,
  accountBalance: any,
  selectedNetworkId: any
) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    let timestamp = setTimestamp();
    let totalTokenList: any = [];
    dispatch({ type: ActionType.GET_TOKEN_LIST_REQUEST });
    if (tokenList) {
      let _enableChecked = tokenList.some((item: any) => item.isEnabled);

      _enableChecked
        ? tokenList.forEach((item: any) => {
            if (item.isEnabled) {
              axios
                .get(`${item.fetchURI}?t=${timestamp}`)
                .then((res) => {
                  let tokens = [...res.data.tokens];

                  if (res.data) {
                    const tokenList: any = tokens.filter((item: any) => {
                      // eslint-disable-next-line eqeqeq
                      return item.chainId == networkId;
                    });
                    let addresses = tokenList.map((item: any) => {
                      return item.address;
                    });

                    if (currentProvider) {
                      let timestamp = setTimestamp();
                      try {
                        if (accountBalance > 0) {
                          BalanceContract(currentProvider)
                            .methods.getUserBalances(
                              UnilendFlashLoanCoreContract(
                                currentProvider,
                                selectedNetworkId
                              ),
                              accounts[0],
                              addresses,
                              timestamp
                            )
                            .call((error: any, result: any) => {
                              console.log(error, result);
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
                                  console.log(totalTokenList);
                                  if (i === tokenList.length - 1) {
                                    console.log("The end", totalTokenList);
                                    dispatch({
                                      type: ActionType.GET_TOKEN_LIST,
                                      payload: totalTokenList,
                                    });
                                  }
                                  return totalTokenList;
                                });
                              } else {
                                dispatch({
                                  type: ActionType.GET_TOKEN_LIST,
                                  payload: [],
                                });
                              }
                            });
                        } else {
                          console.log("else");
                          // tokenList.forEach((item: any, i: number) => {
                          //   item["balance"] = "";
                          //   totalTokenList.push(item);
                          // });
                          dispatch({
                            type: ActionType.GET_TOKEN_LIST,
                            payload: tokenList,
                          });
                        }
                      } catch (e) {
                        errorHandler.report(e);

                        dispatch({
                          type: ActionType.GET_TOKEN_LIST,
                          payload: tokenList,
                        });
                      }
                      // dispatch({
                      //   type: ActionType.GET_TOKEN_LIST,
                      //   payload: totalTokenList,
                      // });
                    } else {
                      if (tokenList) totalTokenList.push(...tokenList);
                      dispatch({
                        type: ActionType.GET_TOKEN_LIST,
                        payload: totalTokenList,
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

export const handleTokenPersist = (token: any) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    let _allToken: any = [];

    if (localStorage.getItem("tokenGroup")) {
      let tg: any = localStorage.getItem("tokenGroup");
      let parsed = JSON.parse(tg);
      console.log("parsed", parsed);
      dispatch({
        type: ActionType.SET_TOKEN_PERSIST,
        payload: parsed,
      });
    } else {
      // localStorage.getItem("tokenGroup");
      token.forEach((item) => {
        axios.get(item.url).then((res) => {
          console.log("token", res);
          _allToken.push({
            id: uuidv4(),
            name: res.data.name,
            icon: res.data.logoURI,
            token: res.data.tokens.length,
            fetchURI: item.url,
            isEnabled: item.isEnabled,
          });
          dispatch({
            type: ActionType.SET_TOKEN_PERSIST,
            payload: _allToken,
          });
        });
      });
    }
  };
};

export const handleCustomTokens = () => {
  return async (dispatch: Dispatch<TokenAction>) => {
    if (localStorage.getItem("customTokens")) {
      let _parsed: any = localStorage.getItem("customTokens");
      console.log("Parsed", _parsed);
      dispatch({
        type: ActionType.SET_CUSTOM_TOKEN_PERSIST,
        payload: JSON.parse(_parsed),
      });
    }
  };
};

export const setCustomToken = (tokens: any, type: any) => {
  return async (dispatch: Dispatch<TokenAction>) => {
    dispatch({
      type: ActionType.SET_CUSTOM_TOKENS,
      payload: tokens,
      calc: type,
    });
  };
};

export const removeCustomToken = () => {
  return async (dispatch: Dispatch<TokenAction>) => {};
};

export const resetCustomToken = () => {
  return async (dispatch: Dispatch<TokenAction>) => {
    dispatch({
      type: ActionType.SET_CUSTOM_TOKEN_PERSIST,
      payload: [],
    });
  };
};
