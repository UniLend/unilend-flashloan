// import BigNumber from "bignumber.js";
import { approveTokenMaximumValue, defaultGasPrice, UnilendFlashLoanCoreContract } from 'ethereum/contracts'
import { FlashloanLBCore, IERC20 } from 'ethereum/contracts/FlashloanLB'
import { web3Service } from 'ethereum/web3Service'
import { errorHandler } from 'index'
import { Dispatch } from 'redux'
import { ActionType } from 'state/action-types'
import { DepositAction } from 'state/actions/depositA'

// Allowance Should be checked to reveal the approval state of the contract
export const checkAllowance = (
  currentProvider: any,
  address: any,
  receipentAddress: string,
  selectedNetworkId: any,
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
            if (allowance === '0') {
              dispatch({
                type: ActionType.DEPOSIT_APPROVAL_STATUS,
                payload: false, // isApproved
              })
            } else {
              localStorage.setItem('isApproving', 'false')
              dispatch({
                type: ActionType.DEPOSIT_APPROVE_SUCCESS,
              })
            }
          } else {
            dispatch({
              type: ActionType.DEPOSIT_ALLOWANCE_FAILED,
            })
          }
        })
    } catch (e) {
      // errorHandler.report(e)
      dispatch({
        type: ActionType.DEPOSIT_ALLOWANCE_FAILED,
      })
    }
  }
}

// On Approve Action
export const depositApprove = (
  currentProvider: any,
  address: any,
  receipentAddress: string,
  selectedNetworkId: any,
) => {
  try {
    return async (dispatch: Dispatch<DepositAction>) => {
      dispatch({
        type: ActionType.DEPOSIT_APPROVE_ACTION,
      })
      console.log('token approval', selectedNetworkId)

      try {
        let _IERC20 = await IERC20(currentProvider, receipentAddress)
        localStorage.setItem('isApproving', 'true')
        dispatch({
          type: ActionType.DEPOSIT_APPROVAL_STATUS,
          payload: false,
        })
        _IERC20.methods
          .approve(UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId), approveTokenMaximumValue)
          .send({
            from: address,
            gasPrice: defaultGasPrice * 1e9,
          })
          .on('receipt', (res: any) => {
            localStorage.setItem('isApproving', 'false')
            dispatch({
              type: ActionType.DEPOSIT_APPROVE_SUCCESS,
            })
          })
          .on('error', (err: any, res: any) => {
            // errorHandler.report(err)
            console.log('Rejected', err, res)
            dispatch({
              type: ActionType.DEPOSIT_APPROVE_FAILED,
              payload: false,
              message: res === undefined ? 'Approval Rejected' : 'Approval Failed',
            })
          })
      } catch (e) {
        console.log('Rejected1', e)

        // errorHandler.report(e)
        dispatch({
          type: ActionType.DEPOSIT_APPROVE_FAILED,
        })
      }
    }
  } catch (error) {
    console.log('Rejected2', error)
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
      if (isEth) {
        FlashloanLBCore(currentProvider, currentNetwork)
          .methods.deposit(recieptAddress, fullAmount)
          .send({
            from: address,
            gasPrice: defaultGasPrice * 1e9,
            value: fullAmount,
          })
          .on('receipt', (res: any) => {
            dispatch({
              type: ActionType.DEPOSIT_SUCCESS,
              payload: true,
            })
          })
          .on('transactionHash', (hash: any) => {
            dispatch({
              type: ActionType.DEPOSIT_TRANSACTION_HASH,
              payload: hash,
            })
          })
          .on('error', (err: any, res: any) => {
            // errorHandler.report(err)

            console.log(err)
            dispatch({
              type: ActionType.DEPOSIT_FAILED,
              payload: false,
              message: res === undefined ? 'Transaction Rejected' : 'Transaction Failed',
            })
          })
      } else {
        FlashloanLBCore(currentProvider, currentNetwork)
          .methods.deposit(recieptAddress, fullAmount)
          .send({
            from: address,
            value: 0,
            gasPrice: defaultGasPrice * 1e9,
          })
          .on('receipt', (res: any) => {
            dispatch({
              type: ActionType.DEPOSIT_SUCCESS,
              payload: true,
            })
          })
          .on('transactionHash', (hash: any) => {
            dispatch({
              type: ActionType.DEPOSIT_TRANSACTION_HASH,
              payload: hash,
            })
          })
          .on('error', (err: any, res: any) => {
            // errorHandler.report(err)

            console.log(err)
            dispatch({
              type: ActionType.DEPOSIT_FAILED,
              payload: false,
              message: res === undefined ? 'Transaction Rejected' : 'Transaction Failed',
            })
          })
      }
    } catch (e) {
      // errorHandler.report(e)
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
