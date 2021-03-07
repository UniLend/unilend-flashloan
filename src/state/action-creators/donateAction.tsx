import {
  FlashloanLBCore,
  UnilendFDonation,
} from "ethereum/contracts/FlashloanLB";
import web3 from "ethereum/web3";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { DonateAction } from "state/actions/donateA";

export const handleDonate = (donateAmount: any, address: string) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    try {
      const fullAmount = web3.utils.toWei(donateAmount, "ether");

      let address;
      FlashloanLBCore.methods
        .getDonationContract()
        .call((error: any, result: any) => {
          if (!error && result) {
            console.log(result);
            address = result;
            UnilendFDonation.methods.donate(address, fullAmount).send({
              from: address,
            });
          } else {
            dispatch({
              type: ActionType.DONATE_FAILED,
              payload: error,
            });
          }
        });
    } catch (e) {
      dispatch({
        type: ActionType.DONATE_FAILED,
        payload: e,
      });
    }
  };
};
