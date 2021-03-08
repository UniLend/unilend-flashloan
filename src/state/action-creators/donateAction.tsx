import { approveTokenMaximumValue, AssetAddress } from "ethereum/contracts";
import {
  FlashloanLBCore,
  IERC20,
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

      FlashloanLBCore.methods
        .getDonationContract()
        .call((error: any, result: any) => {
          if (!error && result) {
            console.log(result);
            let contractAddress = result;
            let allowance;
            IERC20.methods
              .allowance(address, contractAddress)
              .call((error: any, result: any) => {
                if (!error && result) {
                  console.log("allowance", result);
                  allowance = result;
                  if (allowance === "0") {
                    IERC20.methods
                      .approve(contractAddress, approveTokenMaximumValue)
                      .send({
                        from: address,
                      });
                  }
                  let donationContract = UnilendFDonation(contractAddress);
                  console.log(donationContract);
                  donationContract.methods
                    .donate(AssetAddress, fullAmount)
                    .send({
                      from: address,
                    });
                } else {
                  console.log(error);
                }
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
