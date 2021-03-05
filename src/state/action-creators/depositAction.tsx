import { Reciepent } from "ethereum/contracts";
import { FlashloanLBCore, IERC20 } from "ethereum/contracts/FlashloanLB";
import web3 from "ethereum/web3";
import { Dispatch } from "redux";
import { DepositAction } from "state/actions/depositA";

export const handleDeposit = (depositAmount: any, accounts: string) => {
  return async (dispatch: Dispatch<DepositAction>) => {
    try {

        IERC20.methods.approve()

      var fullAmount = web3.utils.toWei(depositAmount, "ether");
      FlashloanLBCore.methods.deposit(Reciepent, fullAmount).send({
        from: accounts,
        value: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
