import { Wallet } from "components/Helpers/Types";
import { web3Service } from "ethereum/web3Service";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { Action } from "state/actions/connectWalletA";
import CWweb3 from "ethereum/connectWalletWeb3";
import { CoinbaseProvider, CoinbaseWeb3 } from "ethereum/coinbaseWeb3";
import { formaticWeb3 } from "ethereum/formatic";
import { portisWeb3 } from "ethereum/portis";
import web3 from "ethereum/web3";
import { bscWeb3 } from "ethereum/bscWeb3";
import { BscConnector } from "@binance-chain/bsc-connector";
import {
  ERC20,
  FlashloanLBCore,
  FlashLoanPool,
  IERC20,
  UnilendFDonation,
  uUFTIERC20,
} from "ethereum/contracts/FlashloanLB";
import { UnilendFlashLoanCoreContract } from "ethereum/contracts";

export const setSelectedNetworkId = (selectedNetworkId: number) => ({
  type: ActionType.SELECTED_NETWORK_ID,
  networkId: selectedNetworkId,
});

async function handleWalletConnect(wallet: Wallet, dispatch: Dispatch<Action>) {
  let accounts: any;
  let connectedWallet = JSON.stringify(wallet);
  localStorage.setItem("walletConnected", connectedWallet);
  switch (wallet.name) {
    case "metamask":
      //// Ethererum ////
      accounts = await web3Service.getAccounts();
      if (window && !(window as any).ethereum.selectedAddress) {
        (window as any).ethereum.enable().then(() => {
          web3Service.getAccounts().then((res: any) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...res],
            });
          });
        });
      } else {
        dispatch({
          type: ActionType.CONNECT_WALLET_SUCCESS,
          payload: [...accounts],
        });
      }

      break;
    case "binaceWallet":
      try {
        // Binance //////

        const bsc = new BscConnector({
          supportedChainIds: [56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
        });
        await bsc.activate();
        let accounts = await bsc.getAccount();
        console.log(await bsc.getChainId());
        if (accounts) {
          dispatch({
            type: ActionType.CONNECT_WALLET_SUCCESS,
            payload: [accounts],
          });
        }

        const provider = (window as any).ethereum;
        if (provider) {
          const chainId = 56;
          console.log(`0x${chainId.toString(16)}`);
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: "Binance Smart Chain Mainnet",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "bnb",
                    decimals: 18,
                  },
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com/"],
                },
              ],
            });
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        } else {
          console.error(
            "Can't setup the BSC network on metamask because window.ethereum is undefined"
          );
          return false;
        }
      } catch (e) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: e.message,
        });
      }
      break;
    case "walletConnect":
      try {
        let provider: any = CWweb3.connectWalletProvider;
        await provider.enable();
        accounts = await CWweb3.connectWalletWeb3.eth.getAcoounts();
        dispatch({
          type: ActionType.CONNECT_WALLET_SUCCESS,
          payload: [...accounts],
        });
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
    case "CoinbaseWallet":
      try {
        CoinbaseProvider.enable()
          .then((accounts: string[]) => {
            console.log(`User's address is ${accounts[0]}`);
            CoinbaseWeb3.eth.defaultAccount = accounts[0];
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...accounts],
            });
          })
          .catch((err) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: err.message,
            });
          });
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
    case "Formatic":
      try {
        let web3: any = formaticWeb3;
        console.log(
          web3.currentProvider
            .enable()
            .then((res: any) => {
              let address: string[];

              address = res;
              dispatch({
                type: ActionType.CONNECT_WALLET_SUCCESS,
                payload: [...address],
              });
            })
            .catch((err: any) => {
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: err.message,
              });
            })
        );
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
    case "Portis":
      try {
        portisWeb3.eth.getAccounts((error, accounts) => {
          if (!error) {
            let address: string[];
            address = accounts;
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...address],
            });
          } else {
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: error.message,
            });
          }
        });
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
    default:
      accounts = await web3Service.getAccounts();
      if (window && !(window as any).ethereum.selectedAddress) {
        (window as any).ethereum.enable();
        console.log("accounts", accounts);
        dispatch({
          type: ActionType.CONNECT_WALLET_SUCCESS,
          payload: [...accounts],
        });
      } else {
        dispatch({
          type: ActionType.CONNECT_WALLET_SUCCESS,
          payload: [...accounts],
        });
      }
      break;
  }
}

export const networkSwitchHandling = () => {
  return async (dispatch: Dispatch<Action>) => {
    // if (accs == 1) {
    //
    //         accsName = 'Mainnet';
    //       } else if (accs == 42) {
    //         this.isNotNetwork = true;
    //         accsName = 'Kovan';
    //       } else if (accs == 3) {
    //
    //         accsName = 'Ropsten';
    //       } else if (accs == 4) {
    //
    //         accsName = 'RinkeBy';
    //       }else if (accs == 5){
    //
    //         accsName = 'Goerli';
    //       }else{
    //
    //         accsName = 'Localhost';
    //       }
    (window as any).ethereum
      .request({ method: "net_version" })
      .then((accs: any) => {
        if (accs) {
          console.log("Accs", accs);
          let accsName;
          if (accs == 1) {
            accsName = "Mainnet";
          } else if (accs == 42) {
            accsName = "Kovan";
          } else if (accs == 3) {
            accsName = "Ropsten";
          } else if (accs == 4) {
            accsName = "RinkeBy";
          } else if (accs == 5) {
            accsName = "Goerli";
          } else {
            accsName = "Localhost";
          }
          dispatch({
            type: ActionType.ACTIVE_NETWORK,
            payload: accsName,
            networkId: accs,
          });
          // that.messageService.setconnectedNetwork(accs);
          // resolve(accs);
        }
      })
      .catch(function (err: any) {
        // reject({});
      });
  };
};

export const getAccountBalance = (selectedAccount: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let balance = await web3Service.getBalance(selectedAccount);
      let ethBal = web3Service.getWei(balance, "ether");
      let ethBalDeci = parseFloat(ethBal).toFixed(4);
      dispatch({
        type: ActionType.ACCOUNT_BALANCE,
        payload: ethBalDeci,
      });
    } catch (e) {
      dispatch({
        type: ActionType.ACCOUNT_BALANCE,
        payload: "",
      });
    }
  };
};

export const getUserTokenBalance = (
  currentProvider: any,
  accounts: any,
  reciepentAddress: string,
  decimal: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let _IERC20 = IERC20(currentProvider, reciepentAddress);
      _IERC20.methods.balanceOf(accounts).call((e: any, r: any) => {
        if (!e) {
          let amount = parseFloat(r);

          let fullAmount = (amount / Math.pow(10, decimal)).toFixed(4);
          dispatch({
            type: ActionType.USER_TOKEN_BALANCE,
            userTokenBalance: fullAmount,
          });
        }
      });
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: ActionType.USER_TOKEN_BALANCE,
        userTokenBalance: "",
      });
    }
  };
};

export const getPoolTokenBalance = (
  currentProvider: any,
  accounts: string,
  assertAddress: any,
  reciepentAddress: any,
  decimal: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // uUFTIERC20(currentProvider, assertAddress)
      //   .methods.balanceOf(accounts)
      //   .call((e: any, r: any) => {
      //     if (!e) {
      //       let fullAmount = currentProvider.utils.fromWei(r);
      //       dispatch({
      //         type: ActionType.POOL_TOKEN_BALANCE,
      //         payload: fullAmount,
      //       });
      //     }
      //   });
      FlashLoanPool(currentProvider, assertAddress)
        .methods.balanceOfUnderlying(accounts)
        .call((e: any, r: any) => {
          if (!e) {
            let amount = parseFloat(r);

            let fullAmount = (amount / Math.pow(10, decimal)).toFixed(4);

            dispatch({
              type: ActionType.POOL_TOKEN_BALANCE,
              payload: r > 0 ? fullAmount : 0,
            });
          }
        });
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: ActionType.POOL_TOKEN_BALANCE,
        payload: "",
      });
    }
  };
};

export const getRewardPoolBalance = (
  currentProvider: any,
  donateContract: string,
  reciepentAddress: string,
  decimal: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      UnilendFDonation(currentProvider, donateContract)
        .methods.balanceOfToken(reciepentAddress)
        .call((e: any, r: any) => {
          if (!e) {
            let fullAmount = r > 0 ? (r / Math.pow(10, decimal)).toFixed(4) : 0;
            dispatch({
              type: ActionType.REWARD_POOL_BALANCE,
              payload: fullAmount,
            });
          } else {
            dispatch({
              type: ActionType.REWARD_POOL_BALANCE,
              payload: "",
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
};
export const balanceReset = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REWARD_POOL_BALANCE,
      payload: "",
    });
    dispatch({
      type: ActionType.REWARD_RELEASE_RATE,
      payload: "",
    });
    dispatch({
      type: ActionType.POOL_LIQUIDITY,
      payload: "",
    });
    dispatch({
      type: ActionType.POOL_TOKEN_BALANCE,
      payload: "",
    });
    dispatch({
      type: ActionType.USER_TOKEN_BALANCE,
      userTokenBalance: "",
    });
    dispatch({
      type: ActionType.ACCOUNT_BALANCE,
      payload: "",
    });
  };
};
export const getRewardReleaseRate = (
  currentProvider: any,
  donateContract: string,
  reciepentAddress: string,
  decimal: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    UnilendFDonation(currentProvider, donateContract)
      .methods.getReleaseRate(reciepentAddress)
      .call((e: any, r: any) => {
        if (!e) {
          let amount = parseFloat(r);

          let fullAmountPerSec = amount / Math.pow(10, decimal);
          let fullAmount = (fullAmountPerSec * (60 * 60 * 24)).toFixed(2);
          dispatch({
            type: ActionType.REWARD_RELEASE_RATE,
            payload: fullAmount,
          });
        } else {
          dispatch({
            type: ActionType.REWARD_RELEASE_RATE,
            payload: "",
          });
        }
      });
  };
};

export const getPoolLiquidity = (
  currentProvider: any,
  reciepentAddress: any,
  isEth: boolean,
  decimal: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      if (isEth) {
        web3Service
          .getBalance(UnilendFlashLoanCoreContract(currentProvider))
          .then((res: any) => {
            let amount = web3Service.getWei(res, "ether");
            dispatch({
              type: ActionType.POOL_LIQUIDITY,
              payload: amount,
            });
          })
          .catch((e: any) => {
            dispatch({
              type: ActionType.POOL_LIQUIDITY,
              payload: "",
            });
          });
      } else {
        let _IERC20 = IERC20(currentProvider, reciepentAddress);
        _IERC20.methods
          .balanceOf(UnilendFlashLoanCoreContract(currentProvider))
          .call((e: any, r: any) => {
            if (!e) {
              let amount = r;

              let fullAmount = (amount / Math.pow(10, decimal)).toFixed(4);
              dispatch({
                type: ActionType.POOL_LIQUIDITY,
                payload: fullAmount,
              });
            } else {
              dispatch({
                type: ActionType.POOL_LIQUIDITY,
                payload: "",
              });
            }
          });
      }
    } catch (e: any) {
      console.log(e);
      // });
    }
  };
};

export const connectWalletAction = (wallet?: Wallet) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CONNECT_WALLET,
    });
    try {
      // let accounts = await (window as any).BinanceChain.request({
      //   method: "eth_accounts",
      // });
      // dispatch({
      //   type: ActionType.CONNECT_WALLET_SUCCESS,
      //   payload: [...accounts],
      // });
      // console.log(accounts);
      if (wallet) {
        let currentProvider: any;
        switch (wallet.name) {
          case "metamask":
            currentProvider = web3;
            break;
          case "walletConnect":
            currentProvider = CWweb3.connectWalletWeb3;
            break;
          case "CoinbaseWallet":
            currentProvider = CoinbaseWeb3;
            break;
          case "Formatic":
            currentProvider = formaticWeb3;
            break;
          case "Portis":
            currentProvider = portisWeb3;
            break;
          case "binaceWallet":
            currentProvider = bscWeb3;
        }
        dispatch({
          type: ActionType.CURRENT_PROVIDER,
          payload: currentProvider,
        });
        handleWalletConnect(wallet, dispatch);
      }
    } catch (err) {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: err.message,
      });
    }
  };
};

export const walletDisconnect = () => {
  return async (dispatch: Dispatch<Action>) => {
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("isApproving");
    localStorage.removeItem("donateApproval");
    dispatch({
      type: ActionType.WALLET_DISCONNECT,
    });
  };
};
