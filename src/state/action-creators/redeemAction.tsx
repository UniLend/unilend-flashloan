import { Reciepent } from "ethereum/contracts";
import { FlashloanLBCore } from "ethereum/contracts/FlashloanLB";
import web3 from "ethereum/web3";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

export const handleRedeem = (redeemAmount: any, accounts: string) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      console.log("Starting");
      const fullAmount = web3.utils.toWei(redeemAmount, "ether");
      FlashloanLBCore.methods.redeem(Reciepent, fullAmount).send({
        from: accounts,
      });
      dispatch({ type: ActionType.REDEEM_SUCCESS, payload: "success" });
    } catch (e) {
      console.log(e);
      dispatch({ type: ActionType.REDEEM_FAILED, payload: "failed" });
    }
  };
};
