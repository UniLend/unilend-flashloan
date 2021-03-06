import {
  approveTokenMaximumValue,
  Reciepent,
  UnilendFlashLoanCoreContract,
} from "ethereum/contracts";
import { FlashloanLBCore, IERC20 } from "ethereum/contracts/FlashloanLB";
import web3 from "ethereum/web3";
import { Dispatch } from "redux";
import { DepositAction } from "state/actions/depositA";

export const handleDeposit = (depositAmount: any, address: string) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    try {
      var fullAmount = web3.utils.toWei(depositAmount, "ether");
      let allowance;
      let approve;
      IERC20.methods
        .allowance(address, UnilendFlashLoanCoreContract)
        .call((error: any, result: any) => {
          if (!error && result) {
            console.log("allowance", result);
            allowance = result;
            if (allowance === "0") {
              IERC20.methods
                .approve(UnilendFlashLoanCoreContract, approveTokenMaximumValue)
                .send({
                  from: address,
                });
            }
          } else {
            console.log(error);
          }
        });
      FlashloanLBCore.methods.deposit(Reciepent, fullAmount).send({
        from: address,
        value: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
