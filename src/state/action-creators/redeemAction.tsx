// import BigNumber from "bignumber.js";
import { FlashloanLBCore, uUFTIERC20 } from "ethereum/contracts/FlashloanLB";
import { web3Service } from "ethereum/web3Service";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { RedeemAction } from "state/actions/redeemA";

export const handleRedeem = (
  currentProvider: any,
  redeemAmount: any,
  accounts: string,
  receipentAddress: string,
  isEth: boolean,
  decimal: any,
  isRedeemMax: boolean,
  fullPoolUTokenBalance: any
) => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({ type: ActionType.REDEEM_ACTION, payload: "success" });

    try {
      let fullAmount = web3Service.getValue(
        isEth,
        currentProvider,
        redeemAmount,
        decimal
      );
      let uFullAmount = web3Service.getValue(
        isEth,
        currentProvider,
        fullPoolUTokenBalance,
        decimal
      );
      if (isRedeemMax) {
        FlashloanLBCore(currentProvider)
          .methods.redeem(receipentAddress, uFullAmount)
          .send({
            from: accounts,
          })
          .on("receipt", (res: any) => {
            dispatch({ type: ActionType.REDEEM_SUCCESS, payload: "success" });
          })
          .on("transactionHash", (hash: any) => {
            dispatch({
              type: ActionType.REDEEM_TRANSACTION_HASH,
              payload: hash,
            });
          })
          .on("error", (err: any, res: any) => {
            dispatch({
              type: ActionType.REDEEM_FAILED,
              message:
                res === undefined
                  ? "Transaction Rejected"
                  : "Transaction Failed",
            });
          });
      } else {
        FlashloanLBCore(currentProvider)
          .methods.redeemUnderlying(receipentAddress, fullAmount)
          .send({
            from: accounts,
          })
          .on("receipt", (res: any) => {
            dispatch({ type: ActionType.REDEEM_SUCCESS, payload: "success" });
          })
          .on("transactionHash", (hash: any) => {
            dispatch({
              type: ActionType.REDEEM_TRANSACTION_HASH,
              payload: hash,
            });
          })
          .on("error", (err: any, res: any) => {
            dispatch({
              type: ActionType.REDEEM_FAILED,
              message:
                res === undefined
                  ? "Transaction Rejected"
                  : "Transaction Failed",
            });
          });
      }
    } catch (e) {
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
      dispatch({
        type: ActionType.REDEEM_TOKEN_BALANCE,
        payload: "",
      });
    }
  };
};

export const clearRedeemError = () => {
  return async (dispatch: Dispatch<RedeemAction>) => {
    dispatch({
      type: ActionType.REDEEM_MESSAGE_CLEAR,
    });
  };
};
