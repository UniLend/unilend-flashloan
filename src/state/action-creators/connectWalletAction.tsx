import { Wallet } from 'components/Helpers/Types'
import { web3Service } from 'ethereum/web3Service'
import { Dispatch } from 'redux'
import { ActionType } from 'state/action-types'
import { Action } from 'state/actions/connectWalletA'
import CWweb3 from 'ethereum/connectWalletWeb3'
import { CoinbaseProvider, CoinbaseWeb3 } from 'ethereum/coinbaseWeb3'
// import { fm, formaticWeb3 } from 'ethereum/formatic'
// import { portis, portisWeb3 } from "ethereum/portis";
import web3 from 'ethereum/web3'
// import { bscWeb3 } from "ethereum/bscWeb3";
// import { BscConnector } from "@binance-chain/bsc-connector";
import { FlashloanLBCore, IERC20, UnilendFDonation } from 'ethereum/contracts/FlashloanLB'
import { UnilendFlashLoanCoreContract } from 'ethereum/contracts'
import { setTimestamp, toFixed } from 'components/Helpers'
import BigNumber from 'bignumber.js'
import { maticWeb3 } from 'ethereum/maticWeb3'
import { errorHandler } from 'index'
import { bscWeb3 } from 'ethereum/bscWeb3'
import { BscConnector } from '@binance-chain/bsc-connector'
import { IFrameProvider, ledgerWeb3 } from 'ethereum/ledgerWeb3'
import Web3 from 'web3'
// import { isMobile } from "react-device-detect";
// import { maticWeb3 } from "ethereum/maticWeb3";

export const setSelectedNetworkId = (selectedNetworkId: number) => ({
  type: ActionType.SELECTED_NETWORK_ID,
  networkId: selectedNetworkId,
})

export const checkNet = (net: any) => {
  switch (net) {
    case 1:
      return 'Mainnet'
    case 42:
      return 'Kovan'
    case 3:
      return 'Ropsten'
    case 4:
      return 'RinkeBy'
    case 5:
      return 'Goerli'
    case 56:
      return 'Binance Mainnet'
    case 97:
      return 'Binance Testnet'
    case 80001:
      return 'Mumbai Testnet'
    case 137:
      return 'Matic Mainnet'
    case 1285:
      return 'Moonriver'
    case 1287:
      return 'Moonbase Alpha'
    default:
      return 'Localhost'
  }
}

export const networkSwitchHandling = (currentProvider?: any, id?: any) => {
  return async (dispatch: Dispatch<Action>) => {
    await currentProvider.eth.net.getId().then((res: any) => {
      let accsName = checkNet(res)
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: accsName,
        networkId: res,
      })
    })
    if (id) {
      let accsName = checkNet(id)
      dispatch({
        type: ActionType.ACTIVE_NETWORK,
        payload: accsName,
        networkId: id,
      })
    }
  }
}

const metamaskEventHandler = (dispatch: any, provider: any) => {
  provider.on('chainChanged', (chainId: any) => {
    window.location.reload()
  })
  provider.on('accountsChanged', function (accounts: string) {
    if (accounts) {
      dispatch({
        type: ActionType.CONNECT_WALLET_SUCCESS,
        payload: [accounts[0]],
      })
    }
  })
  provider.on('message', (message: any) => {
    // console.log(message);
  })
  provider.on('disconnect', (code: number, reason: string) => {
    dispatch({
      type: ActionType.WALLET_DISCONNECT,
    })
  })
}

const handleMetamask = (accounts: any, dispatch: any, currentProvider: any, provider: any) => {
  if (provider) {
    provider
      .enable()
      .then(() => {
        currentProvider.eth
          .getAccounts()
          .then((res: any) => {
            console.log('getAccounts', res)
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...res],
            })
            getAccountBalance(res[0], currentProvider)
            metamaskEventHandler(dispatch, provider)
          })
          .catch((e: any) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: e.message,
            })
          })
      })
      .catch((e: any) => {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: e.message,
        })
      })
  } else {
    metamaskEventHandler(dispatch, provider)
    dispatch({
      type: ActionType.CONNECT_WALLET_SUCCESS,
      payload: [...accounts],
    })
  }
}

async function handleWalletConnect(
  currentProviders: any,
  provider: any,
  networkType: any,
  wallet: Wallet,
  dispatch: Dispatch<Action>,
) {
  try {
    let accounts: any
    let connectedWallet = JSON.stringify(wallet)
    localStorage.setItem('walletConnected', connectedWallet)
    dispatch({
      type: ActionType.CONNECTED_WALLET,
      payload: connectedWallet,
    })
    switch (wallet.name) {
      case 'metamask':
        //// Ethererum ////
        if (!(window as any).coin98) {
          if (networkType === 1) {
            // try {
            //   accounts = await web3Service.getAccounts(currentProviders)
            //   handleMetamask(accounts, dispatch, currentProviders, provider)
            // } catch (e) {
            //   errorHandler.report(e)
            //   console.log(e)
            // }
            try {
              accounts = await web3Service.getAccounts(currentProviders)
              if ((window as any).ethereum) {
                const provider = (window as any).ethereum
                const chainId = 1
                try {
                  await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                  })
                  accounts = await web3Service.getAccounts(currentProviders)
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                  return true
                } catch (error: any) {
                  if (error.code == 4902) {
                    try {
                      await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: 'Ethereum Mainnet',
                            nativeCurrency: {
                              name: 'Ether',
                              symbol: 'ETH',
                              decimals: 18,
                            },
                            rpcUrls: [
                              'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
                              'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
                              'https://api.mycryptoapi.com/eth',
                              'https://cloudflare-eth.com',
                            ],
                            blockExplorerUrls: ['https://etherscan.io'],
                          },
                        ],
                      })
                      accounts = await web3Service.getAccounts(currentProviders)

                      // if (accounts) {
                      handleMetamask(accounts, dispatch, currentProviders, provider)
                      // }

                      return true
                    } catch (error) {
                      errorHandler.report(error)

                      console.error(error)

                      return false
                    }
                  }
                }
              } else {
                console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
                dispatch({
                  type: ActionType.CONNECT_WALLET_ERROR,
                  payload: 'Connection Failed',
                })
                return false
              }
            } catch (e) {
              errorHandler.report(e)
              console.log(e)
            }
          } else if (networkType === 2) {
            try {
              accounts = await web3Service.getAccounts(currentProviders)
              if ((window as any).ethereum) {
                const provider = (window as any).ethereum
                const chainId = 56
                try {
                  await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                  })

                  accounts = await web3Service.getAccounts(currentProviders)
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                  return true
                } catch (error: any) {
                  if (error.code == 4902) {
                    try {
                      await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: 'Smart Chain',
                            nativeCurrency: {
                              name: 'BNB',
                              symbol: 'bnb',
                              decimals: 18,
                            },
                            rpcUrls: ['https://bsc-dataseed.binance.org/'],
                            blockExplorerUrls: ['https://bscscan.com/'],
                          },
                        ],
                      })
                      accounts = await web3Service.getAccounts(currentProviders)

                      // if (accounts) {
                      handleMetamask(accounts, dispatch, currentProviders, provider)
                      // }

                      return true
                    } catch (error) {
                      errorHandler.report(error)

                      console.error(error)

                      return false
                    }
                  }
                }
              } else {
                console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
                dispatch({
                  type: ActionType.CONNECT_WALLET_ERROR,
                  payload: 'Connection Failed',
                })
                return false
              }
            } catch (e) {
              errorHandler.report(e)
              console.log(e)
            }
          } else if (networkType === 3) {
            try {
              if ((window as any).ethereum) {
                const provider = (window as any).ethereum
                const chainId = 137
                try {
                  await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                  })

                  accounts = await web3Service.getAccounts(currentProviders)
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                  return true
                } catch (error: any) {
                  if (error.code == 4902) {
                    try {
                      await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: 'Polygon Mainnet',
                            nativeCurrency: {
                              name: 'POL',
                              symbol: 'POL',
                              decimals: 18,
                            },
                            rpcUrls: ['https://polygon-rpc.com'],
                            blockExplorerUrls: ['https://polygonscan.com'],
                          },
                        ],
                      })
                      accounts = await web3Service.getAccounts(currentProviders)
                      handleMetamask(accounts, dispatch, currentProviders, provider)
                      return true
                    } catch (e) {
                      errorHandler.report(e)
                      console.error(e)
                      return false
                    }
                  }
                }
              } else {
                if ((window as any).ethereum) {
                  accounts = await web3Service.getAccounts(currentProviders)

                  // if (accounts) {
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                }
                console.error("Can't setup the Matic network on metamask because window.ethereum is undefined")
                dispatch({
                  type: ActionType.CONNECT_WALLET_ERROR,
                  payload: 'Connection Failed',
                })
                return false
              }
            } catch (e: any) {
              errorHandler.report(e)
              console.log(e)
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: e.message,
              })
            }
          } else if (networkType === 4) {
            try {
              if ((window as any).ethereum) {
                const provider = (window as any).ethereum
                const chainId = 1287
                // const chainId = 1285
                try {
                  await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                  })

                  accounts = await web3Service.getAccounts(currentProviders)
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                  return true
                } catch (error: any) {
                  if (error.code == 4902) {
                    try {
                      await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          // testnet
                          {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: 'Moonbase Alpha',
                            nativeCurrency: {
                              name: 'Moonbase Alpha',
                              symbol: 'DEV',
                              decimals: 18,
                            },
                            rpcUrls: ['https://rpc.testnet.moonbeam.network'],
                            blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network/'],
                          },
                        ],
                      })
                      accounts = await web3Service.getAccounts(currentProviders)
                      handleMetamask(accounts, dispatch, currentProviders, provider)
                      return true
                    } catch (e) {
                      errorHandler.report(e)
                      console.error(e)
                      return false
                    }
                  }
                }
              } else {
                if ((window as any).ethereum) {
                  accounts = await web3Service.getAccounts(currentProviders)
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                }
                console.error("Can't setup the Moonriver network on metamask because window.ethereum is undefined")
                dispatch({
                  type: ActionType.CONNECT_WALLET_ERROR,
                  payload: 'Connection Failed',
                })
                return false
              }
            } catch (e: any) {
              errorHandler.report(e)
              console.log(e)
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: e.message,
              })
            }
          } else if (networkType === 5) {
            try {
              if ((window as any).ethereum) {
                const provider = (window as any).ethereum
                const chainId = 1285
                try {
                  await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${chainId.toString(16)}` }],
                  })

                  accounts = await web3Service.getAccounts(currentProviders)
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                  return true
                } catch (error: any) {
                  if (error.code == 4902) {
                    try {
                      await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          // ------- mainnet
                          {
                            chainId: `0x${chainId.toString(16)}`,
                            chainName: 'Moonriver',
                            nativeCurrency: {
                              name: 'Moonriver',
                              symbol: 'MOVR',
                              decimals: 18,
                            },
                            rpcUrls: ['https://rpc.moonriver.moonbeam.network'],
                            blockExplorerUrls: ['https://blockscout.moonriver.moonbeam.network/'],
                          },
                        ],
                      })
                      accounts = await web3Service.getAccounts(currentProviders)
                      handleMetamask(accounts, dispatch, currentProviders, provider)
                      return true
                    } catch (e) {
                      errorHandler.report(e)
                      console.error(e)
                      return false
                    }
                  }
                }
              } else {
                if ((window as any).ethereum) {
                  accounts = await web3Service.getAccounts(currentProviders)
                  handleMetamask(accounts, dispatch, currentProviders, provider)
                }
                console.error("Can't setup the Moonriver network on metamask because window.ethereum is undefined")
                dispatch({
                  type: ActionType.CONNECT_WALLET_ERROR,
                  payload: 'Connection Failed',
                })
                return false
              }
            } catch (e: any) {
              errorHandler.report(e)
              console.log(e)
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: e.message,
              })
            }
          }
        } else {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: 'error',
          })
        }
        break
      case 'binanceWallet':
        try {
          if ((window as any).BinanceChain) {
            const bsc = new BscConnector({
              supportedChainIds: [56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
            })

            // invoke method on bsc e.g.
            await bsc.activate()
            let accounts: any = await bsc.getAccount()
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [accounts],
            })
            await bsc.getChainId()
          } else {
            console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: 'Connection Failed',
            })
            return false
          }
        } catch (e: any) {
          errorHandler.report(e)
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: e.message,
          })
        }
        break
      case 'walletConnect':
        try {
          let provider: any = CWweb3.connectWalletProvider
          await provider.enable().then((response: any) => {
            metamaskEventHandler(dispatch, CWweb3.connectWalletProvider)
          })
          await CWweb3.connectWalletWeb3.eth.getAccounts().then((res: any) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...res],
            })
          })

          // const chainId = await web3.eth.chainId();
          // console.log(accounts, networkId, "ss", chainId);
        } catch (err: any) {
          errorHandler.report(err)

          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          })
        }
        break
      case 'ledger':
        try {
          let provider: any = IFrameProvider
          await provider.enable().then((response: any) => {
            metamaskEventHandler(dispatch, IFrameProvider)
          })
          await ledgerWeb3.eth.getAccounts().then((res: any) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...res],
            })
          })

          // const chainId = await web3.eth.chainId();
          // console.log(accounts, networkId, "ss", chainId);
        } catch (err: any) {
          errorHandler.report(err)

          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          })
        }
        break
      case 'CoinbaseWallet':
        try {
          CoinbaseProvider.enable()
            .then((accounts: string[]) => {
              CoinbaseWeb3.eth.defaultAccount = accounts[0]
              dispatch({
                type: ActionType.CONNECT_WALLET_SUCCESS,
                payload: [...accounts],
              })
              metamaskEventHandler(dispatch, CoinbaseProvider)
              CoinbaseWeb3.eth
                .getBalance(accounts[0])
                .then((res: any) => {
                  let ethBal = web3Service.getWei(res, 'ether', CoinbaseWeb3)
                  let ethBalDeci = toFixed(parseFloat(ethBal), 3)
                  dispatch({
                    type: ActionType.ACCOUNT_BALANCE_SUCCESS,
                    payload: ethBalDeci,
                    fullAccountBalance: ethBal,
                  })
                })
                .catch((e: any) => {
                  dispatch({
                    type: ActionType.ACCOUNT_BALANCE_SUCCESS,
                    payload: '',
                    fullAccountBalance: '',
                  })
                })
            })
            .catch((err) => {
              errorHandler.report(err)

              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: err.message,
              })
            })
        } catch (err: any) {
          errorHandler.report(err)

          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          })
        }
        break
      // case 'Fortmatic':
      //   try {
      //     let web3: any = formaticWeb3
      //     // console.log(
      //     web3.currentProvider
      //       .enable()
      //       .then((res: any) => {
      //         let address: string[]
      //         address = res
      //         dispatch({
      //           type: ActionType.CONNECT_WALLET_SUCCESS,
      //           payload: [...address],
      //         })
      //         metamaskEventHandler(dispatch, provider.getProvider())
      //         getAccountBalance(address[0], currentProviders)
      //       })
      //       .catch((err: any) => {
      //         dispatch({
      //           type: ActionType.CONNECT_WALLET_ERROR,
      //           payload: err.message,
      //         })
      //       })
      //     // );
      //   } catch (err: any) {
      //     errorHandler.report(err)

      //     dispatch({
      //       type: ActionType.CONNECT_WALLET_ERROR,
      //       payload: err.message,
      //     })
      //   }
      //   break
      case 'Portis':
        try {
          // if (wallet.name === "Portis" && !isMobile) {
          //   portisWeb3.eth.getAccounts((error, accounts) => {
          //     if (!error) {
          //       let address: string[];
          //       address = accounts;
          //       portis.onActiveWalletChanged((walletAddress: any) => {
          //         dispatch({
          //           type: ActionType.CONNECT_WALLET_SUCCESS,
          //           payload: [...address],
          //         });
          //         getAccountBalance(walletAddress[0]);
          //       });
          //       portis.onError((error: any) => {
          //         // console.log("error", error);
          //       });
          //       portis.onLogin(
          //         (walletAddress: any, email: any, reputation: any) => {
          //           // console.log(walletAddress, email, reputation);
          //           getAccountBalance(walletAddress);
          //         }
          //       );
          //       portis.onLogout(() => {
          //         dispatch({
          //           type: ActionType.WALLET_DISCONNECT,
          //         });
          //       });
          //       dispatch({
          //         type: ActionType.CONNECT_WALLET_SUCCESS,
          //         payload: [...address],
          //       });
          //     } else {
          //       dispatch({
          //         type: ActionType.CONNECT_WALLET_ERROR,
          //         payload: error.message,
          //       });
          //     }
          //   });
          // }
        } catch (err: any) {
          errorHandler.report(err)
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: err.message,
          })
        }
        break
      case 'coin98':
        if ((window as any).coin98) {
          try {
            accounts = await web3Service.getAccounts(currentProviders)
            handleMetamask(accounts, dispatch, currentProviders, provider)
          } catch (e) {
            errorHandler.report(e)
            console.log(e)
          }
        } else {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: 'error',
          })
        }
        break
      case 'ONTO':
        if ((window as any).onto) {
          try {
            accounts = await currentProviders.eth.requestAccounts()
            // .getAccounts(currentProviders)
            console.log('ACCOCUNTS', accounts)
            handleMetamask(accounts, dispatch, currentProviders, provider)
          } catch (e) {
            errorHandler.report(e)
            console.log(e)
          }
        } else {
          dispatch({
            type: ActionType.CONNECT_WALLET_ERROR,
            payload: 'error',
          })
        }
        break
      default:
        accounts = await web3Service.getAccounts(currentProviders)
        if (window && !(window as any).ethereum.selectedAddress) {
          ;(window as any).ethereum.enable()
          dispatch({
            type: ActionType.CONNECT_WALLET_SUCCESS,
            payload: [...accounts],
          })
        } else {
          dispatch({
            type: ActionType.CONNECT_WALLET_SUCCESS,
            payload: [...accounts],
          })
        }
        break
    }
  } catch (e: any) {
    errorHandler.report(e)
    dispatch({
      type: ActionType.CONNECT_WALLET_ERROR,
      payload: e.message,
    })
  }
}

export const getAccountBalance = (selectedAccount: string, currentProvider: any, networkId?: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let balance: any
      if (networkId && networkId === 2) {
        balance = await (window as any).BinanceChain.request({
          method: 'eth_getBalance',
          params: [selectedAccount, 'latest'],
        })
      } else {
        // console.log('cur prov', currentProvider)
        // balance = await web3Service.getBalance(selectedAccount)
        // if (currentProvider === CoinbaseWeb3) {
        balance = await currentProvider.eth.getBalance(selectedAccount)
        // }
      }
      let ethBal = web3Service.getWei(balance, 'ether', currentProvider)
      let ethBalDeci = toFixed(parseFloat(ethBal), 3)
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: ethBalDeci,
        fullAccountBalance: ethBal,
      })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.ACCOUNT_BALANCE_SUCCESS,
        payload: '',
        fullAccountBalance: '',
      })
      dispatch({
        type: ActionType.WALLET_DISCONNECT,
      })
    }
  }
}

export const getUserTokenBalance = (
  currentProvider: any,
  accounts: any,
  reciepentAddress: string,
  assertAddress: string,
  decimal: any,
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USER_TOKEN_BALANCE_ACTION,
    })
    try {
      let _IERC20 = IERC20(currentProvider, reciepentAddress)
      _IERC20.methods.balanceOf(accounts).call((e: any, r: any) => {
        if (!e) {
          let amount = r
          const decimalAmount = new BigNumber(amount).dividedBy(Math.pow(10, decimal)).toString()
          let fullAmount = new BigNumber(decimalAmount).toFixed(3, 1).toString()
          dispatch({
            type: ActionType.USER_TOKEN_BALANCE_SUCCESS,
            userTokenBalance: fullAmount,
            fullUserTokenBalance: decimalAmount,
          })
        } else {
          dispatch({
            type: ActionType.USER_TOKEN_BALANCE_FAILED,
          })
        }
      })
    } catch (e: any) {
      dispatch({
        type: ActionType.USER_TOKEN_BALANCE_SUCCESS,
        userTokenBalance: '',
        fullUserTokenBalance: '',
      })
    }
  }
}
export const getPooluTokenBalance = (
  currentProvider: any,
  accounts: string,
  reciepentAddress: string,
  decimal: any,
  currentNetwork: any,
) => {
  return async (dispatch: Dispatch<Action>) => {
    FlashloanLBCore(currentProvider, currentNetwork)
      .methods.getPools([reciepentAddress])
      .call((err: any, res: any) => {
        if (!err && res) {
          // let assertAddress = res[0];
          let _IERC20 = IERC20(currentProvider, res[0])

          _IERC20.methods.balanceOf(accounts).call((e: any, r: any) => {
            if (!e) {
              let amount = r
              const fullAmount = new BigNumber(amount).dividedBy(Math.pow(10, decimal)).toString()
              dispatch({
                type: ActionType.FULL_POOL_U_TOKEN_BALANCE,
                payload: fullAmount,
              })
            } else {
              dispatch({
                type: ActionType.FULL_POOL_U_TOKEN_BALANCE,
                payload: '',
              })
            }
          })
        } else {
          dispatch({
            type: ActionType.FULL_POOL_U_TOKEN_BALANCE,
            payload: '',
          })
        }
      })
  }
}
export const getPoolTokenBalance = (
  currentProvider: any,
  accounts: string,
  assertAddress: any,
  reciepentAddress: any,
  decimal: any,
  currentNetwork: any,
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let timestamp = setTimestamp()

      // FlashLoanPool(currentProvider, assertAddress)
      //   .methods.balanceOfUnderlying(accounts)
      FlashloanLBCore(currentProvider, currentNetwork)
        .methods.balanceOfUnderlying(reciepentAddress, accounts, timestamp)
        .call((e: any, r: any) => {
          if (!e) {
            let amount = r
            // let decimalAmount = amount / Math.pow(10, decimal);
            // const ten: any = new BigNumber(10);
            const decimalAmount = new BigNumber(amount).dividedBy(Math.pow(10, decimal)).toString()
            let fullAmount = new BigNumber(decimalAmount).toFixed(3, 1).toString()
            dispatch({
              type: ActionType.POOL_TOKEN_BALANCE_SUCCESS,
              payload: r > 0 ? fullAmount : 0,
            })
            dispatch({
              type: ActionType.FULL_POOL_TOKEN_BALANCE,
              payload: decimalAmount,
            })
          } else {
            dispatch({
              type: ActionType.POOL_TOKEN_BALANCE_SUCCESS,
              payload: '',
            })
            dispatch({
              type: ActionType.FULL_POOL_TOKEN_BALANCE,
              payload: '',
            })
          }
        })
    } catch (e: any) {
      dispatch({
        type: ActionType.POOL_TOKEN_BALANCE_SUCCESS,
        payload: '',
      })
      dispatch({
        type: ActionType.FULL_POOL_TOKEN_BALANCE,
        payload: '',
      })
    }
  }
}

export const getRewardPoolBalance = (
  currentProvider: any,
  donateContract: string,
  reciepentAddress: string,
  decimal: any,
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      UnilendFDonation(currentProvider, donateContract)
        .methods.balanceOfToken(reciepentAddress)
        .call((e: any, r: any) => {
          if (!e) {
            let fullAmount = r > 0 ? toFixed(r / Math.pow(10, decimal), 3) : 0
            dispatch({
              type: ActionType.REWARD_POOL_BALANCE_SUCCESS,
              payload: fullAmount,
            })
          } else {
            dispatch({
              type: ActionType.REWARD_POOL_BALANCE_SUCCESS,
              payload: '',
            })
          }
        })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.REWARD_POOL_BALANCE_SUCCESS,
        payload: '',
      })
    }
  }
}
export const balanceReset = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BALANCE_RESET,
    })
  }
}
export const getCurrentAPY = (
  currentProvider: any,
  donateContract: string,
  reciepentAddress: string,
  decimal: any,
  totalDepositedTokens: any,
  totalTokensInRewardPool: any,
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CURRENT_APY_ACTION,
    })
    try {
      UnilendFDonation(currentProvider, donateContract)
        .methods.getReleaseRate(reciepentAddress)
        .call((e: any, r: any) => {
          if (!e) {
            let amount = parseFloat(r)
            let fullAmountPerSec = amount / Math.pow(10, 18)
            let _totalTokenInRewardPool = totalTokensInRewardPool / Math.pow(10, decimal)
            let _totalDepositedToken = totalDepositedTokens / Math.pow(10, decimal)
            let fullAmount: any = 0
            if (_totalDepositedToken > 0 && _totalTokenInRewardPool > 0) {
              fullAmount = toFixed(
                fullAmountPerSec * (60 * 60 * 24 * 365.25) * (_totalTokenInRewardPool / _totalDepositedToken),
                2,
              )
            }

            dispatch({
              type: ActionType.CURRENT_APY_SUCCESS,
              payload: fullAmount,
            })
          } else {
            dispatch({
              type: ActionType.CURRENT_APY_FAILED,
            })
          }
        })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.CURRENT_APY_FAILED,
      })
    }
  }
}

export const getTotalDepositedTokens = (currentProvider: any, recipientAddress: any, selectedNetworkId: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      IERC20(currentProvider, recipientAddress)
        .methods.balanceOf(UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId))
        .call((err: any, res: any) => {
          if (!err) {
            dispatch({
              type: ActionType.TOTAL_DEPOSITION_TOKENS_SUCCESS,
              payload: res,
            })
          } else {
            dispatch({
              type: ActionType.TOTAL_DEPOSITION_TOKENS_SUCCESS,
              payload: '',
            })
          }
        })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.TOTAL_DEPOSITION_TOKENS_SUCCESS,
        payload: '',
      })
    }
  }
}

export const getTotalTokensInRewardPool = (currentProvider: any, recipientAddress: any, donationAddress: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      IERC20(currentProvider, recipientAddress)
        .methods.balanceOf(donationAddress)
        .call((err: any, res: any) => {
          if (!err) {
            dispatch({
              type: ActionType.TOTAL_TOKENS_IN_REWARD_POOL_SUCCESS,
              payload: res,
            })
          } else {
            dispatch({
              type: ActionType.TOTAL_TOKENS_IN_REWARD_POOL_SUCCESS,
              payload: '',
            })
          }
        })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.TOTAL_TOKENS_IN_REWARD_POOL_SUCCESS,
        payload: '',
      })
    }
  }
}
export const getRewardReleaseRatePerDay = (
  currentProvider: any,
  donateContract: string,
  reciepentAddress: string,
  decimal: any,
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      UnilendFDonation(currentProvider, donateContract)
        .methods.getReleaseRate(reciepentAddress)
        .call((e: any, r: any) => {
          if (!e) {
            let amount = parseFloat(r)

            let fullAmountPerSec = amount / Math.pow(10, 18)
            let fullAmount = toFixed(fullAmountPerSec * (60 * 60 * 24), 2)
            dispatch({
              type: ActionType.REWARD_RELEASE_RATE_SUCCESS,
              payload: fullAmount,
            })
          } else {
            dispatch({
              type: ActionType.REWARD_RELEASE_RATE_SUCCESS,
              payload: '',
            })
          }
        })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.REWARD_RELEASE_RATE_SUCCESS,
        payload: '',
      })
    }
  }
}

export const getPoolLiquidity = (
  currentProvider: any,
  reciepentAddress: any,
  isEth: boolean,
  decimal: any,
  currentNetwork: any,
) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      if (isEth) {
        currentProvider.eth
          .getBalance(UnilendFlashLoanCoreContract(currentProvider, currentNetwork))
          .then((res: any) => {
            let amount = web3Service.getWei(res, 'ether', currentProvider)
            dispatch({
              type: ActionType.POOL_LIQUIDITY_SUCCESS,
              payload: amount,
            })
          })
          .catch((e: any) => {
            dispatch({
              type: ActionType.POOL_LIQUIDITY_SUCCESS,
              payload: '',
            })
          })
      } else {
        let timestamp = setTimestamp()
        FlashloanLBCore(currentProvider, currentNetwork)
          .methods.poolBalanceOfUnderlying(reciepentAddress, timestamp)
          .call((e: any, r: any) => {
            if (!e) {
              let amount = r

              let fullAmount = toFixed(amount / Math.pow(10, decimal), 3)
              dispatch({
                type: ActionType.POOL_LIQUIDITY_SUCCESS,
                payload: fullAmount,
              })
            } else {
              dispatch({
                type: ActionType.POOL_LIQUIDITY_SUCCESS,
                payload: '',
              })
            }
          })
      }
    } catch (e: any) {
      dispatch({
        type: ActionType.POOL_LIQUIDITY_SUCCESS,
        payload: '',
      })
    }
  }
}

export const connectWalletAction = (networkType: any, wallet?: Wallet) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CONNECT_WALLET,
    })
    try {
      if (wallet) {
        let currentProvider: any
        let provider: any
        let EthProvider = (window as any).ethereum
        switch (wallet.name) {
          case 'metamask':
            currentProvider = web3
            provider = EthProvider
            break
          case 'walletConnect':
            currentProvider = CWweb3.connectWalletWeb3
            provider = CWweb3.connectWalletProvider
            break
          case 'CoinbaseWallet':
            currentProvider = CoinbaseWeb3
            provider = EthProvider
            break
          // case 'Fortmatic':
          //   currentProvider = formaticWeb3
          //   provider = fm
          //   break
          case 'ledger':
            currentProvider = ledgerWeb3
            provider = IFrameProvider
            break
          case 'Portis':
            // if (wallet.name === "Portis" && !isMobile) {
            //   currentProvider = portisWeb3;
            //   provider = portis;
            // }
            break
          case 'binanceWallet':
            currentProvider = bscWeb3
            provider = (window as any).BinanceChain
            break
          case 'maticWallet':
            currentProvider = maticWeb3
            provider = EthProvider
            break
          case 'coin98':
            currentProvider = web3
            provider = EthProvider
            break
          case 'Onto':
            currentProvider = new Web3((window as any).onto)
            provider = (window as any).onto
            break
          default:
            currentProvider = web3
            provider = EthProvider
        }
        dispatch({
          type: ActionType.CURRENT_PROVIDER,
          payload: currentProvider,
          provider: provider,
        })
        // if (walletConnected) {
        handleWalletConnect(currentProvider, provider, networkType, wallet, dispatch)
        // }
      }
    } catch (err: any) {
      errorHandler.report(err)

      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: err.message,
      })
    }
  }
}

export const walletDisconnect = (walletProvider: any) => {
  return async (dispatch: Dispatch<Action>) => {
    localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id')
    localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret  ')
    localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked')
    localStorage.removeItem('walletConnected')
    // if (walletProvider === (window as any).ethereum) {
    //   const walletAddress = await walletProvider.request({
    //     method: "eth_requestAccounts",
    //     params: [
    //       {
    //         eth_accounts: {},
    //       },
    //     ],
    //   });

    //   // if (!walletAddress) {
    //   await walletProvider.request({
    //     method: "wallet_requestPermissions",
    //     params: [
    //       {
    //         eth_accounts: {},
    //       },
    //     ],
    //   });
    //   // }
    // }
    // await walletProvider.disconnect();
    dispatch({
      type: ActionType.WALLET_DISCONNECT,
    })
  }
}
