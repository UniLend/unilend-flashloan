import {
  approveTokenMaximumValue,
  Reciepent,
  UnilendFlashLoanCoreContract,
} from "ethereum/contracts";
import { FlashloanLBCore, IERC20 } from "ethereum/contracts/FlashloanLB";
import { Dispatch } from "redux";
import { DepositAction } from "state/actions/depositA";

export const handleDeposit = (
  currentProvider: any,
  depositAmount: any,
  address: string
) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    try {
      var fullAmount = currentProvider.utils.toWei(depositAmount, "ether");
      let allowance;
      let _IERC20 = IERC20(currentProvider);
      _IERC20.methods
        .allowance(address, UnilendFlashLoanCoreContract)
        .call((error: any, result: any) => {
          if (!error && result) {
            console.log("allowance", result);
            allowance = result;
            if (allowance === "0") {
              console.log(error, result);
              _IERC20.methods
                .approve(UnilendFlashLoanCoreContract, approveTokenMaximumValue)
                .send({
                  from: address,
                });
            }
            FlashloanLBCore(currentProvider)
              .methods.deposit(Reciepent, fullAmount)
              .send({
                from: address,
                value: 0,
              });
          } else {
            console.log(error);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
};
