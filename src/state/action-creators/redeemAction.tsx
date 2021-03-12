import { Reciepent } from "ethereum/contracts";
import { FlashloanLBCore } from "ethereum/contracts/FlashloanLB";
import { portis } from "ethereum/portis";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

export const handleRedeem = (
  currentProvider: any,
  redeemAmount: any,
  accounts: string
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      console.log("Starting");
      const fullAmount = currentProvider.utils.toWei(redeemAmount, "ether");
      portis.onError((error) => {
        console.log("error", error);
      });
      FlashloanLBCore(currentProvider)
        .methods.redeem(Reciepent, fullAmount)
        .send({
          from: accounts,
        });
      dispatch({ type: ActionType.REDEEM_SUCCESS, payload: "success" });
    } catch (e) {
      console.log(e);
      dispatch({ type: ActionType.REDEEM_FAILED, payload: "failed" });
    }
  };
};
