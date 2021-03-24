import { FlashloanLBCore, uUFTIERC20 } from "ethereum/contracts/FlashloanLB";
import { portis } from "ethereum/portis";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

export const handleRedeem = (
  currentProvider: any,
  redeemAmount: any,
  accounts: string,
  receipentAddress: string
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({ type: ActionType.REDEEM_ACTION, payload: "success" });

    try {
      console.log("Starting");
      const fullAmount = currentProvider.utils.toWei(redeemAmount, "ether");
      portis.onError((error) => {
        console.log("error", error);
      });
      FlashloanLBCore(currentProvider)
        .methods.redeemUnderlying(receipentAddress, fullAmount)
        .send({
          from: accounts,
        })
        .on("receipt", (res: any) => {
          dispatch({ type: ActionType.REDEEM_SUCCESS, payload: "success" });
        })
        .catch((e: any) => {
          dispatch({ type: ActionType.REDEEM_FAILED, payload: "failed" });
        });
    } catch (e) {
      console.log(e);
      dispatch({ type: ActionType.REDEEM_FAILED, payload: "failed" });
    }
  };
};

export const getRedeemTokenBalance = (
  currentProvider: any,
  accounts: string
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      uUFTIERC20(currentProvider)
        .methods.balanceOf(accounts)
        .call((e: any, r: any) => {
          if (!e) {
            dispatch({
              type: ActionType.REDEEM_TOKEN_BALANCE,
              payload: currentProvider.utils.fromWei(r),
            });
          }
        });
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: ActionType.REDEEM_TOKEN_BALANCE,
        payload: "",
      });
    }
  };
};
