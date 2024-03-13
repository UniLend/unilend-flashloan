// import BigNumber from "bignumber.js";
import { approveTokenMaximumValue, defaultGasPrice, UnilendFlashLoanCoreContract } from 'ethereum/contracts'
import { EtherIERC20, FlashloanLBCore, IERC20 } from 'ethereum/contracts/FlashloanLB'
import { web3Service } from 'ethereum/web3Service'
import { errorHandler } from 'index'
import { Dispatch } from 'redux'
import { ActionType } from 'state/action-types'
import { DepositAction } from 'state/actions/depositA'
import { fetchBlockNumber, waitForTransaction, fetchSigner, getContract, getNetwork, getProvider } from 'wagmi/actions'
import FlashloanABI from 'ethereum/build/FlashLoanABI.json'
import { erc20ABI } from 'wagmi'

export const getContractInstanceDeposite = async () => {
  try {
    const signer = await fetchSigner()
    const provider = getProvider()
    const { chain } = getNetwork()
    const instance = getContract({
      address: UnilendFlashLoanCoreContract('', chain?.id),
      abi: FlashloanABI.abi,
      signerOrProvider: signer || provider,
    })
    return instance
  } catch (error) {
    throw error
  }
}

export const getEtherContract = async (address: any, abi: any, signer1: any) => {
  try {
    
    const signer = await fetchSigner()
    const provider = getProvider()

    const instance = getContract({
      address: address,
      abi: abi,
      signerOrProvider: signer1|| signer || provider,
    })
    return instance
  } catch (error) {
    throw error
  }
}

export const checkTxnStatus = async (hash: any) => {
  
  
  try {
    const receipt = await waitForTransaction({
      hash,
    })
   
    if ((receipt).status === 1) {
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

// Allowance Should be checked to reveal the approval state of the contract
export const checkAllowance = (
  currentProvider: any,
  address: any,
  receipentAddress: string,
  selectedNetworkId: any,
  enteredAmount: any,
) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    // console.log("activeNetwork",activeNetwork);
    dispatch({
      type: ActionType.DEPOSIT_ALLOWANCE_ACTION,
    })
    try {
      let allowance
      let _IERC20 = await IERC20(currentProvider, receipentAddress)
      _IERC20.methods
        .allowance(address, UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId))
        .call((error: any, result: any) => {
          if (!error && result) {
            allowance = result
            if (allowance !== '0' && allowance >= Number(enteredAmount) * 10 ** 18) {
              localStorage.setItem('isApproving', 'false')
              dispatch({
                type: ActionType.DEPOSIT_APPROVE_SUCCESS,
              })
            } else {
              dispatch({
                type: ActionType.DEPOSIT_APPROVAL_STATUS,
                payload: false, // isApproved
              })
            }
          } else {
            dispatch({
              type: ActionType.DEPOSIT_ALLOWANCE_FAILED,
            })
          }
        })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.DEPOSIT_ALLOWANCE_FAILED,
      })
    }
  }
}
export function fixed2Decimals(amount: any, decimals = 18) {
  const amt = amount?._hex ? amount?._hex : amount
  const dec = decimals

  return (Number(amt) * 10 ** Number(dec)).toString()
}
// On Approve Action
export const depositApprove = (
  currentProvider: any,
  address: any,
  receipentAddress: string,
  selectedNetworkId: any,
  amount: any,
  decimal: any,
) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    dispatch({
      type: ActionType.DEPOSIT_APPROVE_ACTION,
    })
    try {
      // const ERC20 = await EtherIERC20(currentProvider, receipentAddress);
      const signer = await fetchSigner()
      const erc20 = await getEtherContract(receipentAddress, erc20ABI, signer)
      //  let _IERC20 = await IERC20(currentProvider, receipentAddress)
   

      localStorage.setItem('isApproving', 'true')
      dispatch({
        type: ActionType.DEPOSIT_APPROVAL_STATUS,
        payload: false,
      })
      const { hash } = await erc20.approve(
        UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId),
        fixed2Decimals(amount, decimal),
      )

      if (hash) {
        const status = await checkTxnStatus(hash)
        if (status) {
          dispatch({
            type: ActionType.DEPOSIT_APPROVE_SUCCESS,
          })
        }
      }
      // .on('receipt', (res: any) => {
      //   localStorage.setItem('isApproving', 'false')
      //   dispatch({
      //     type: ActionType.DEPOSIT_APPROVE_SUCCESS,
      //   })
      // })
      // .on('error', (err: any, res: any) => {
      //   errorHandler.report(err)

      //   dispatch({
      //     type: ActionType.DEPOSIT_APPROVE_FAILED,
      //     payload: false,
      //     message: res === undefined ? 'Approval Rejected' : 'Approval Failed',
      //   })
      // })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.DEPOSIT_APPROVE_FAILED,
      })
    }
  }
}
export const setDepositSuccess = () => {
  return async (dispatch: Dispatch<DepositAction>) => {
    dispatch({
      type: ActionType.DEPOSIT_SUCCESS,
      payload: true,
    })
  }
}

export const handleDeposit = (
  currentProvider: any,
  depositAmount: any,
  address: string,
  recieptAddress: string,
  isEth: boolean,
  decimal: any,
  currentNetwork: any,
) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    dispatch({
      type: ActionType.DEPOSIT_ACTION,
    })
    try {
      let fullAmount = web3Service.getValue(isEth, currentProvider, depositAmount, decimal)
      const instance = await getContractInstanceDeposite()
      if (isEth) {
        const txs = await instance.deposit(recieptAddress, fullAmount, {
          value: fullAmount,
        })
        if (txs?.hash) {
          dispatch({
            type: ActionType.DEPOSIT_TRANSACTION_HASH,
            payload: txs.hash,
          })
          const status = await checkTxnStatus(txs.hash)
          if (status) {
            dispatch({
              type: ActionType.DEPOSIT_SUCCESS,
              payload: true,
            })
          }
        }
        // FlashloanLBCore(currentProvider, currentNetwork)
        //   .methods.deposit(recieptAddress, fullAmount)
        //   .send({
        //     from: address,
        //     gasPrice: defaultGasPrice * 1e9,
        //     value: fullAmount,
        //   })
        //   .on('receipt', (res: any) => {
        //     dispatch({
        //       type: ActionType.DEPOSIT_SUCCESS,
        //       payload: true,
        //     })
        //   })
        //   .on('transactionHash', (hash: any) => {
        //     dispatch({
        //       type: ActionType.DEPOSIT_TRANSACTION_HASH,
        //       payload: hash,
        //     })
        //   })
        //   .on('error', (err: any, res: any) => {
        //     errorHandler.report(err)

        //     console.log(err)
        //     dispatch({
        //       type: ActionType.DEPOSIT_FAILED,
        //       payload: false,
        //       message: res === undefined ? 'Transaction Rejected' : 'Transaction Failed',
        //     })
        //   })
      } else {
        const txs = await instance.deposit(recieptAddress, fullAmount)
        if (txs?.hash) {
          dispatch({
            type: ActionType.DEPOSIT_TRANSACTION_HASH,
            payload: txs.hash,
          })
          const status = await checkTxnStatus(txs.hash)
          if (status) {
            dispatch({
              type: ActionType.DEPOSIT_SUCCESS,
              payload: true,
            })
          }
        }
        // FlashloanLBCore(currentProvider, currentNetwork)
        //   .methods.deposit(recieptAddress, fullAmount)
        //   .send({
        //     from: address,
        //     value: 0,
        //     gasPrice: defaultGasPrice * 1e9,
        //   })
        //   .on('receipt', (res: any) => {
        //     dispatch({
        //       type: ActionType.DEPOSIT_SUCCESS,
        //       payload: true,
        //     })
        //   })
        //   .on('transactionHash', (hash: any) => {
        //     dispatch({
        //       type: ActionType.DEPOSIT_TRANSACTION_HASH,
        //       payload: hash,
        //     })
        //   })
        //   .on('error', (err: any, res: any) => {
        //     errorHandler.report(err)
        //     alert('error')
        //     console.log(err)
        //     dispatch({
        //       type: ActionType.DEPOSIT_FAILED,
        //       payload: false,
        //       message: res === undefined ? 'Transaction Rejected' : 'Transaction Failed',
        //     })
        //   })
      }
    } catch (e) {
      dispatch({
        type: ActionType.DEPOSIT_FAILED,
        payload: false,
        message: 'Transaction Failed',
      })
    }
  }
}
export const clearDepositError = () => {
  return async (dispatch: Dispatch<DepositAction>) => {
    dispatch({
      type: ActionType.DEPOSIT_MESSAGE_CLEAR,
    })
  }
}
