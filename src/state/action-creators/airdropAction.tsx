import { UnilendFlashLoanCoreContract } from "ethereum/contracts";
import { IERC20 } from "ethereum/contracts/FlashloanLB";
import web3 from "ethereum/web3";
import { Dispatch } from "react";
import { ActionType } from "state/action-types";
import { AirdropAction } from "state/actions/airdropA";

export const handleAirdrop = (
  currentProvider: any,
  amount: any,
  account: any,
  reciepentAddress: string
) => {
  return async (dispatch: Dispatch<AirdropAction>) => {
    dispatch({
      type: ActionType.AIRDROP_ACTION,
    });
    await IERC20(currentProvider, reciepentAddress)
      .methods.transfer(
        UnilendFlashLoanCoreContract(currentProvider),
        web3.utils.toWei(amount)
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
