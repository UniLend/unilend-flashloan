// import BigNumber from "bignumber.js";
import { defaultGasPrice, UnilendFlashLoanCoreContract } from 'ethereum/contracts'
import { FlashloanLBCore, uUFTIERC20 } from 'ethereum/contracts/FlashloanLB'
import { web3Service } from 'ethereum/web3Service'
import { errorHandler } from 'index'
import { Dispatch } from 'redux'
import { ActionType } from 'state/action-types'
import { RedeemAction } from 'state/actions/redeemA'
import { fetchBlockNumber, waitForTransaction, fetchSigner, getContract, getNetwork, getProvider } from 'wagmi/actions'
import FlashloanABI from 'ethereum/build/FlashLoanABI.json'
import { getERC20abi } from './connectWalletAction'

const { ethers } = require('ethers')

export const setRedeemSuccess = () => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({ type: ActionType.REDEEM_SUCCESS, payload: 'success' })
  }
}

const getContractInstanceRedeem = async (contractAddress: any, abi: any, signerData: any) => {
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

export const handleRedeem = (
  currentProvider: any,
  redeemAmount: any,
  accounts: string,
  tokenAddress: string,
  isEth: boolean,
  decimal: any,
  isRedeemMax: boolean,
  fullPoolUTokenBalance: any,
  flashLoanContract: any,
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({ type: ActionType.REDEEM_ACTION, payload: 'success' })
    try {
      let fullAmount = web3Service.getValue(isEth, currentProvider, redeemAmount, decimal)
      let uFullAmount = web3Service.getValue(isEth, currentProvider, fullPoolUTokenBalance, decimal)
      const { chain } = getNetwork()
      const signer = await fetchSigner()
      const instance = await getContractInstanceRedeem(
        UnilendFlashLoanCoreContract('', chain?.id),
        FlashloanABI.abi,
        signer,
      )
      if (isRedeemMax) {
        const txs = await instance.redeem(tokenAddress, uFullAmount)

        if (txs.hash) {
          dispatch({
            type: ActionType.REDEEM_TRANSACTION_HASH,
            payload: txs.hash,
          })
          const status = await checkTxnStatus(txs.hash)
          if (status) {
            dispatch({ type: ActionType.REDEEM_SUCCESS, payload: 'success' })
          }
        }
        // FlashloanLBCore(currentProvider)
        //   .methods.redeem(tokenAddress, uFullAmount)
        //   .send({
        //     from: accounts,
        //     gasPrice: defaultGasPrice * 1e9,
        //   })
        //   .on('receipt', (res: any) => {
        //     dispatch({ type: ActionType.REDEEM_SUCCESS, payload: 'success' })
        //   })
        //   .on('transactionHash', (hash: any) => {
        //     dispatch({
        //       type: ActionType.REDEEM_TRANSACTION_HASH,
        //       payload: hash,
        //     })
        //   })
        //   .on('error', (err: any, res: any) => {
        //     errorHandler.report(err)
        //     dispatch({
        //       type: ActionType.REDEEM_FAILED,
        //       message: res === undefined ? 'Transaction Rejected' : 'Transaction Failed',
        //     })
        //   })
      } else {
        const txs = await instance.redeemUnderlying(tokenAddress, fullAmount)

        if (txs.hash) {
          dispatch({
            type: ActionType.REDEEM_TRANSACTION_HASH,
            payload: txs.hash,
          })
          const status = await checkTxnStatus(txs.hash)
          if (status) {
            dispatch({ type: ActionType.REDEEM_SUCCESS, payload: 'success' })
          }
        }
        // FlashloanLBCore(currentProvider)
        //   .methods.redeemUnderlying(tokenAddress, fullAmount)
        //   .send({
        //     gasPrice: defaultGasPrice * 1e9,
        //     from: accounts,
        //   })
        //   .on('receipt', (res: any) => {
        //     dispatch({ type: ActionType.REDEEM_SUCCESS, payload: 'success' })
        //   })
        //   .on('transactionHash', (hash: any) => {
        //     dispatch({
        //       type: ActionType.REDEEM_TRANSACTION_HASH,
        //       payload: hash,
        //     })
        //   })
        //   .on('error', (err: any, res: any) => {
        //     errorHandler.report(err)

        //     dispatch({
        //       type: ActionType.REDEEM_FAILED,
        //       message: res === undefined ? 'Transaction Rejected' : 'Transaction Failed',
        //     })
        //   })
      }
    } catch (e) {
      dispatch({
        type: ActionType.REDEEM_FAILED,
        message: 'Transaction Failed',
      })
    }
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

export const getRedeemTokenBalance = (currentProvider: any, accounts: string, assertAddress: any) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      // const signer = await fetchSigner()
      // const instance = await getContractInstanceRedeem(assertAddress, getERC20abi(), signer)
      // const balance = await instance.balanceOf(accounts)
      // const redeemTokenBalance = ethers.utils.formatEther(balance, 18)
      // if (balance) {
      //   dispatch({
      //     type: ActionType.REDEEM_TOKEN_BALANCE,
      //     payload: redeemTokenBalance,
      //   })
      // }
      uUFTIERC20(currentProvider, assertAddress)
        .methods.balanceOf(accounts)
        .call((e: any, r: any) => {
          if (!e) {
            dispatch({
              type: ActionType.REDEEM_TOKEN_BALANCE,
              payload: currentProvider.utils.fromWei(r),
            })
          }
        })
    } catch (e: any) {
      dispatch({
        type: ActionType.REDEEM_TOKEN_BALANCE,
        payload: '',
      })
    }
  }
}

export const clearRedeemError = () => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({
      type: ActionType.REDEEM_MESSAGE_CLEAR,
    })
  }
}
