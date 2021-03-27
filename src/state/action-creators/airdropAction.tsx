import { UnilendFlashLoanCoreContract } from "ethereum/contracts";
import { IERC20 } from "ethereum/contracts/FlashloanLB";
import { web3Service } from "ethereum/web3Service";
import { Dispatch } from "react";
import { ActionType } from "state/action-types";
import { AirdropAction } from "state/actions/airdropA";

export const handleAirdrop = (
  currentProvider: any,
  amount: any,
  account: any,
  reciepentAddress: string,
  isEth: boolean,
  decimal: any
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
        UnilendFlashLoanCoreContract(currentProvider),
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
      .catch((e: any) => {
        dispatch({
          type: ActionType.AIRDROP_FAILED,
        });
      });
  };
};
