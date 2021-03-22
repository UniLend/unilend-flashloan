import {
  approveTokenMaximumValue,
  Reciepent,
  UnilendFlashLoanCoreContract,
} from "ethereum/contracts";
import { FlashloanLBCore, IERC20 } from "ethereum/contracts/FlashloanLB";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { DepositAction } from "state/actions/depositA";

// Allowance Should be checked to reveal the approval state of the contract
export const checkAllowance = (currentProvider: any, address: any) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    let allowance;
    let _IERC20 = await IERC20(currentProvider);
    _IERC20.methods
      .allowance(address, UnilendFlashLoanCoreContract(currentProvider))
      .call((error: any, result: any) => {
        if (!error && result) {
          allowance = result;
          if (allowance === "0") {
            dispatch({
              type: ActionType.DEPOSIT_APPROVAL_STATUS,
              payload: false, // isApproved
            });
          } else {
            localStorage.setItem("isApproving", "false");
            dispatch({
              type: ActionType.DEPOSIT_APPROVAL_STATUS,
              payload: true, // isApproved
            });
          }
        }
      });
  };
};

// On Approve Action
export const depositApprove = (currentProvider: any, address: any) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    try {
      let _IERC20 = await IERC20(currentProvider);
      localStorage.setItem("isApproving", "true");
      dispatch({
        type: ActionType.DEPOSIT_APPROVAL_STATUS,
        payload: false,
      });
      _IERC20.methods
        .approve(
          UnilendFlashLoanCoreContract(currentProvider),
          approveTokenMaximumValue
        )
        .send({
          from: address,
        })
        .on("receipt", (res: any) => {
          localStorage.setItem("isApproving", "false");
          dispatch({
            type: ActionType.DEPOSIT_APPROVAL_STATUS,
            payload: true,
          });
        })
        .catch((e: Error) => {
          localStorage.setItem("isApproving", "false");

          dispatch({
            type: ActionType.DEPOSIT_APPROVAL_STATUS,
            payload: false,
          });
          console.log("Approval Rejected By User");
        });
    } catch (e) {
      console.log(e);
    }
  };
};

export const handleDeposit = (
  currentProvider: any,
  depositAmount: any,
  address: string,
  currencyType: string
) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    try {
      var fullAmount = currentProvider.utils.toWei(depositAmount, "ether");
      FlashloanLBCore(currentProvider)
        .methods.deposit(Reciepent, fullAmount)
        .send({
          from: address,
          value: 0,
        })
        .on("receipt", (res: any) => {
          dispatch({
            type: ActionType.DEPOSIT_STATUS,
            payload: true,
          });
        })
        .catch((e: any) => {
          console.log("Err", e);
          dispatch({
            type: ActionType.DEPOSIT_STATUS,
            payload: false,
          });
        });
    } catch (e) {
      console.log(e);
    }
  };
};
