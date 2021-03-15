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
    console.log("Checking Allowance");
    let allowance;
    console.log(currentProvider);
    let _IERC20 = await IERC20(currentProvider);
    _IERC20.methods
      .allowance(address, UnilendFlashLoanCoreContract)
      .call((error: any, result: any) => {
        if (!error && result) {
          console.log("allowance", result);
          allowance = result;
          if (allowance === "0") {
            console.log("not approved");
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
    let _IERC20 = await IERC20(currentProvider);
    _IERC20.methods
      .approve(UnilendFlashLoanCoreContract, approveTokenMaximumValue)
      .send({
        from: address,
      });
    localStorage.setItem("isApproving", "true");
  };
};

export const handleDeposit = (
  currentProvider: any,
  depositAmount: any,
  address: string
) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    try {
      var fullAmount = currentProvider.utils.toWei(depositAmount, "ether");
      FlashloanLBCore(currentProvider)
        .methods.deposit(Reciepent, fullAmount)
        .send({
          from: address,
          value: 0,
        });
    } catch (e) {
      console.log(e);
    }
  };
};
