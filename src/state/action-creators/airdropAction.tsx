import { UnilendFlashLoanCoreContract } from "ethereum/contracts";
import { IERC20 } from "ethereum/contracts/FlashloanLB";
import { web3Service } from "ethereum/web3Service";
import { errorHandler } from "index";
import { Dispatch } from "react";
import { ActionType } from "state/action-types";
import { AirdropAction } from "state/actions/airdropA";

export const setAirdropSuccess = () => {
  return async (dispatch: Dispatch<AirdropAction>) => {
    dispatch({
      type: ActionType.AIRDROP_SUCCESS,
    });
  };
};

export const handleAirdrop = (
  currentProvider: any,
  amount: any,
  account: any,
  reciepentAddress: string,
  isEth: boolean,
  decimal: any,
  selectedNetworkId: any
) => {
  return async (dispatch: Dispatch<AirdropAction>) => {
    dispatch({
      type: ActionType.AIRDROP_ACTION,
    });
    var fullAmount = web3Service.getValue(
      isEth,
      currentProvider,
      amount,
      decimal
    );

    await IERC20(currentProvider, reciepentAddress)
      .methods.transfer(
        UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId),
        fullAmount
      )
      .send({
        from: account,
      })
      .on("receipt", (res: any) => {
        dispatch({
          type: ActionType.AIRDROP_SUCCESS,
        });
      })
      .on("transactionHash", (hash: any) => {
        dispatch({
          type: ActionType.AIRDROP_TRANSACTION_HASH,
          payload: hash,
        });
      })
      .on("error", (err: any, res: any) => {
        errorHandler.report(err);

        dispatch({
          type: ActionType.AIRDROP_FAILED,
          message:
            res === undefined ? "Transaction Rejected" : "Transaction Failed",
        });
      });
  };
};
export const clearAirdropError = () => {
  return async (dispatch: Dispatch<AirdropAction>) => {
    dispatch({
      type: ActionType.AIRDROP_MESSAGE_CLEAR,
    });
  };
};
