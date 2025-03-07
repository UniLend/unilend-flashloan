// import BigNumber from "bignumber.js";
import { approveTokenMaximumValue, defaultGasPrice, UnilendFlashLoanCoreContract } from 'ethereum/contracts'
import { FlashloanLBCore, IERC20 } from 'ethereum/contracts/FlashloanLB'
import { web3Service } from 'ethereum/web3Service'
import { errorHandler } from 'index'
import { Dispatch } from 'redux'
import { ActionType } from 'state/action-types'
import { DepositAction } from 'state/actions/depositA'
import { fetchBlockNumber, waitForTransaction, fetchSigner, getContract, getNetwork, getProvider } from 'wagmi/actions'
import FlashloanABI from 'ethereum/build/FlashLoanABI.json'
import { getERC20abi } from './connectWalletAction'

const { ethers } = require('ethers')

const getContractInstanceDeposite = async (contractAddress: any, abi: any, signerData: any) => {
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

// Allowance Should be checked to reveal the approval state of the contract
export const checkAllowance = (
  currentProvider: any,
  address: any,
  tokenAddress: string,
  selectedNetworkId: any,
  enteredAmount: any,
) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    // console.log("activeNetwork",activeNetwork);
    dispatch({
      type: ActionType.DEPOSIT_ALLOWANCE_ACTION,
    })
    try {
      if (tokenAddress) {
        const { chain } = getNetwork()
        const signer = await fetchSigner()
        const instance = await getContractInstanceDeposite(tokenAddress, getERC20abi(), signer)
        let allowance = await instance.allowance(address, UnilendFlashLoanCoreContract('', chain?.id))
        allowance = Number(ethers.utils.formatUnits(allowance, 18))
        if (allowance !== '0' && allowance >= Number(enteredAmount)) {
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
      }
      // let allowance
      // let _IERC20 = await IERC20(currentProvider, tokenAddress)
      // _IERC20.methods
      //   .allowance(address, UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId))
      //   .call((error: any, result: any) => {
      //     if (!error && result) {
      //       allowance = result
      //       if (allowance !== '0' && allowance >= Number(enteredAmount) * 10 ** 18) {
      //         localStorage.setItem('isApproving', 'false')
      //         dispatch({
      //           type: ActionType.DEPOSIT_APPROVE_SUCCESS,
      //         })
      //       } else {
      //         dispatch({
      //           type: ActionType.DEPOSIT_APPROVAL_STATUS,
      //           payload: false, // isApproved
      //         })
      //       }
      //     } else {
      //       dispatch({
      //         type: ActionType.DEPOSIT_ALLOWANCE_FAILED,
      //       })
      //     }
      //   })
    } catch (e) {
      errorHandler.report(e)
      dispatch({
        type: ActionType.DEPOSIT_ALLOWANCE_FAILED,
      })
    }
  }
}

// On Approve Action
export const depositApprove = (currentProvider: any, address: any, tokenAddress: string, selectedNetworkId: any) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    dispatch({
      type: ActionType.DEPOSIT_APPROVE_ACTION,
    })
    try {
      localStorage.setItem('isApproving', 'true')
      dispatch({
        type: ActionType.DEPOSIT_APPROVAL_STATUS,
        payload: false,
      })
      const signer = await fetchSigner()
      const { chain } = getNetwork()
      const instance = await getContractInstanceDeposite(tokenAddress, getERC20abi(), signer)
      const txs = await instance.approve(UnilendFlashLoanCoreContract('', chain?.id), approveTokenMaximumValue)
      console.log('APPROVE_DEPOSITE', txs)
      if (txs.hash) {
        const status = await checkTxnStatus(txs.hash)
        if (status) {
          localStorage.setItem('isApproving', 'false')
          dispatch({
            type: ActionType.DEPOSIT_APPROVE_SUCCESS,
          })
        }
      }
      // let _IERC20 = await IERC20(currentProvider, tokenAddress)
      // dispatch({
      //   type: ActionType.DEPOSIT_APPROVAL_STATUS,
      //   payload: false,
      // })
      // _IERC20.methods
      //   .approve(UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId), approveTokenMaximumValue)
      //   .send({
      //     from: address,
      //     gasPrice: defaultGasPrice * 1e9,
      //   })
      //   .on('receipt', (res: any) => {
      //     localStorage.setItem('isApproving', 'false')
      //     dispatch({
      //       type: ActionType.DEPOSIT_APPROVE_SUCCESS,
      //     })
      //   })
      //   .on('error', (err: any, res: any) => {
      //     errorHandler.report(err)

      //     dispatch({
      //       type: ActionType.DEPOSIT_APPROVE_FAILED,
      //       payload: false,
      //       message: res === undefined ? 'Approval Rejected' : 'Approval Failed',
      //     })
      //   })
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
      const { chain } = getNetwork()
      const signer = await fetchSigner()
      const instance = await getContractInstanceDeposite(
        UnilendFlashLoanCoreContract('', chain?.id),
        FlashloanABI.abi,
        signer,
      )
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
