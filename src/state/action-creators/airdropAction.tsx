import { defaultGasPrice, UnilendFlashLoanCoreContract } from 'ethereum/contracts'
import { IERC20 } from 'ethereum/contracts/FlashloanLB'
import { web3Service } from 'ethereum/web3Service'
import { errorHandler } from 'index'
import { Dispatch } from 'react'
import { ActionType } from 'state/action-types'
import { AirdropAction } from 'state/actions/airdropA'
import { fetchSigner, getContract, getNetwork, getProvider, waitForTransaction } from 'wagmi/dist/actions'
import IERC20ABI from 'ethereum/build/IERC20.json'

export const setAirdropSuccess = () => {
  return async (dispatch: Dispatch<AirdropAction>) => {
    dispatch({
      type: ActionType.AIRDROP_SUCCESS,
    })
  }
}

const getContractInstanceAirdrop = async (contractAddress: any, abi: any, signerData: any) => {
  try {
    let signer = signerData
    if (signer === null) {
      signer = await fetchSigner()
    }
    const provider = getProvider()
    const instance = getContract({
      address: contractAddress, //
      abi, //
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

export const handleAirdrop = (
  currentProvider: any,
  amount: any,
  account: any,
  tokenAddress: string,
  isEth: boolean,
  decimal: any,
  selectedNetworkId: any,
) => {
  return async (dispatch: Dispatch<AirdropAction>) => {
    dispatch({
      type: ActionType.AIRDROP_ACTION,
    })
    try {
      var fullAmount = web3Service.getValue(isEth, currentProvider, amount, decimal)
      const { chain } = getNetwork()
      const signer = await fetchSigner()
      const instance = await getContractInstanceAirdrop(tokenAddress, IERC20ABI.abi, signer)
      const txs = await instance.transfer(UnilendFlashLoanCoreContract('', chain?.id), fullAmount)

      if (txs.hash) {
        const status = await checkTxnStatus(txs.hash)
        if (status) {
          dispatch({
            type: ActionType.AIRDROP_SUCCESS,
          })
          dispatch({
            type: ActionType.AIRDROP_TRANSACTION_HASH,
            payload: txs.hash,
          })
        }
      }

      // await IERC20(currentProvider, reciepentAddress)
      //   .methods.transfer(UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId), fullAmount)
      //   .send({
      //     from: account,
      //     gasPrice: defaultGasPrice * 1e9,
      //   })
      //   .on('receipt', (res: any) => {
      //     dispatch({
      //       type: ActionType.AIRDROP_SUCCESS,
      //     })
      //   })
      //   .on('transactionHash', (hash: any) => {
      //     dispatch({
      //       type: ActionType.AIRDROP_TRANSACTION_HASH,
      //       payload: hash,
      //     })
      //   })
      //   .on('error', (err: any, res: any) => {
      //     errorHandler.report(err)

      //     dispatch({
      //       type: ActionType.AIRDROP_FAILED,
      //       message: res === undefined ? 'Transaction Rejected' : 'Transaction Failed',
      //     })
      //   })
    } catch (error) {
      dispatch({
        type: ActionType.AIRDROP_FAILED,
        message: 'Transaction Failed',
      })
    }
  }
}
export const clearAirdropError = () => {
  return async (dispatch: Dispatch<AirdropAction>) => {
    dispatch({
      type: ActionType.AIRDROP_MESSAGE_CLEAR,
    })
  }
}
