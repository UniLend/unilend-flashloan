import { UnilendFlashLoanCoreContract, defaultGasPrice } from 'ethereum/contracts'
import { ERC20, FlashloanLBCore } from 'ethereum/contracts/FlashloanLB'
import { Dispatch } from 'redux'
import { ActionType } from 'state/action-types'
import { PoolAction } from 'state/actions/PoolA'
import { fetchSigner, getContract, getNetwork, getProvider, waitForTransaction } from 'wagmi/actions'
import ERC20ABI from 'ethereum/build/ERC20.json'
import FlashloanABI from 'ethereum/build/FlashLoanABI.json'

const getContractInstance = async (contractAddress: any, abi: any, signerData: any) => {
  try {
    let signer = signerData
    if (signer === null) {
      signer = await fetchSigner()
    }
    const provider = getProvider()
    const instance = getContract({
      address: contractAddress,
      abi,
      signerOrProvider: signer || provider,
    })
    return instance
  } catch (error) {
    throw error
  }
}

export const createPool = (currentProvider: any, _reserve: string, address: string) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    dispatch({
      type: ActionType.IS_POOL_CREATION_LOADING,
      payload: true,
    })
    try {
      const { chain } = getNetwork()
      const signer = await fetchSigner()
      const instance = await getContractInstance(UnilendFlashLoanCoreContract('', chain?.id), FlashloanABI.abi, signer)
      const txs = await instance.createPool(_reserve)
      if (txs.hash) {
        const status = await checkTxnStatus(txs.hash)
        if (status) {
          dispatch({
            type: ActionType.IS_POOL_CREATED,
            payload: true,
          })
          dispatch({
            type: ActionType.IS_POOL_CREATION_LOADING,
            payload: false,
          })
        }
        window.location.reload()
      }
    } catch (error) {
      dispatch({
        type: ActionType.IS_POOL_CREATION_LOADING,
        payload: false,
      })
    }
    // FlashloanLBCore(currentProvider)
    //   .methods.createPool(_reserve)
    //   .send({
    //     from: address,
    //     gasPrice: defaultGasPrice * 1e9,
    //   })
    //   .on('receipt', (res: any) => {
    //     dispatch({
    //       type: ActionType.IS_POOL_CREATED,
    //       payload: true,
    //     })
    //     dispatch({
    //       type: ActionType.IS_POOL_CREATION_LOADING,
    //       payload: false,
    //     })
    //   })
    //   .on('PoolCreated', (res: any) => {})
    //   .catch((e: any) => {
    //     console.log('Importing Failed')
    //     dispatch({
    //       type: ActionType.IS_POOL_CREATION_LOADING,
    //       payload: false,
    //     })
    //   })
  }
}

const checkTxnStatus = async (hash: any) => {
  try {
    const receipt = waitForTransaction({
      hash,
    })

    if ((await receipt).status === 1) {
      return true
    } else {
      setTimeout(async () => {
        checkTxnStatus(hash)
      }, 1000)
    }
  } catch (error) {
    setTimeout(async () => {
      checkTxnStatus(hash)
    }, 1000)
  }
}
export const getPool = (address: any, currentProvider: any, accounts: any, flashLoanContract: any) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    dispatch({
      type: ActionType.GETTING_POOL,
    })

    try {
      const res = await flashLoanContract.Pools(address)
      dispatch({
        type: ActionType.ASSERT_ADDRESS,
        payload: res,
      })

      if (res === '0x0000000000000000000000000000000000000000') {
        // alert("Pool not Created");
        dispatch({
          type: ActionType.IS_POOL_CREATED,
          payload: false,
        })
      } else {
        const signer = await fetchSigner()
        const instance = await getContractInstance(res, ERC20ABI, signer)
        const symbol = await instance.symbol()
        dispatch({
          type: ActionType.POOL_TOKEN_NAME,
          payload: symbol,
        })
        dispatch({
          type: ActionType.IS_POOL_CREATED,
          payload: true,
        })
        // ERC20(currentProvider, res)
        //   .methods.symbol()
        //   .call((err: Error, res: any) => {
        //     if (!err && res) {
        //       dispatch({
        //         type: ActionType.POOL_TOKEN_NAME,
        //         payload: res,
        //       })
        //       dispatch({
        //         type: ActionType.IS_POOL_CREATED,
        //         payload: true,
        //       })
        //     } else {
        //       dispatch({
        //         type: ActionType.POOL_FAILED,
        //       })
        //     }
        //   })
      }
    } catch (error) {
      dispatch({
        type: ActionType.POOL_FAILED,
      })
    }

    // FlashloanLBCore(currentProvider)
    //   .methods.Pools(address)
    //   .call((err: any, res: any) => {
    //     console.log("FlashloanLBCore", err,  res, address, currentProvider);
    //     if (!err) {
    //       dispatch({
    //         type: ActionType.ASSERT_ADDRESS,
    //         payload: res,
    //       })
    //       if (res === '0x0000000000000000000000000000000000000000') {
    //         // alert("Pool not Created");
    //         dispatch({
    //           type: ActionType.IS_POOL_CREATED,
    //           payload: false,
    //         })
    //       } else {
    //         ERC20(currentProvider, res)
    //           .methods.symbol()
    //           .call((err: Error, res: any) => {
    //             if (!err && res) {
    //               dispatch({
    //                 type: ActionType.POOL_TOKEN_NAME,
    //                 payload: res,
    //               })
    //               dispatch({
    //                 type: ActionType.IS_POOL_CREATED,
    //                 payload: true,
    //               })
    //             } else {
    //               dispatch({
    //                 type: ActionType.POOL_FAILED,
    //               })
    //             }
    //           })
    //       }
    //     } else {
    //       dispatch({
    //         type: ActionType.POOL_FAILED,
    //       })
    //     }
    //   })
  }
}

export const handleImportAction = (searchedToken: any) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    var a: any = []
    let storedArr = localStorage.getItem('sessionImportedToken')
    if (storedArr) {
      a = JSON.parse(storedArr) || []
      a.push(searchedToken)
    }
    // Alert the array value
    alert(a)
    localStorage.setItem('sessionImportedToken', JSON.stringify(a))
  }
}
