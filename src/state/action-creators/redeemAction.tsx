import BigNumber from "bignumber.js";
import { FlashloanLBCore, uUFTIERC20 } from "ethereum/contracts/FlashloanLB";
import { web3Service } from "ethereum/web3Service";
// import { portis } from "ethereum/portis";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

export const handleRedeem = (
  currentProvider: any,
  redeemAmount: any,
  accounts: string,
  receipentAddress: string,
  isEth: boolean,
  decimal: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({ type: ActionType.REDEEM_ACTION, payload: "success" });

    try {
      // const ten = new BigNumber(10);
      // const base = 3 * ten.pow(new BigNumber(decimal));
      // console.log(base);
      let fullAmount = new BigNumber(redeemAmount)
        .multipliedBy(Math.pow(10, decimal))
        .toString();
      // portis.onError((error) => {
      //   console.log("error", error);
      // });
      FlashloanLBCore(currentProvider)
        .methods.redeemUnderlying(receipentAddress, fullAmount)
        .send({
          from: accounts,
        })
        .on("receipt", (res: any) => {
          dispatch({ type: ActionType.REDEEM_SUCCESS, payload: "success" });
        })
        .on("transactionHash", (hash: any) => {
          console.log(hash);
          dispatch({
            type: ActionType.REDEEM_TRANSACTION_HASH,
            payload: hash,
          });
        })
        .on("error", (err: any, res: any) => {
          console.log(err, res);
          if (res === undefined) {
            dispatch({
              type: ActionType.REDEEM_FAILED,
              // message: err.message.split(":")[1],
              message: "Transaction Rejected",
            });
          } else {
            dispatch({
              type: ActionType.REDEEM_FAILED,
              message: "Transaction Failed",
            });
          }
        });
      // .catch((e: any) => {
      //   dispatch({ type: ActionType.REDEEM_FAILED, payload: "failed" });
      // });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ActionType.REDEEM_FAILED,
        message: "Transaction Failed",
      });
    }
  };
};

export const getRedeemTokenBalance = (
  currentProvider: any,
  accounts: string,
  assertAddress: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    try {
      uUFTIERC20(currentProvider, assertAddress)
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
