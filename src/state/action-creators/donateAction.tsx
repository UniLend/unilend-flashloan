import { approveTokenMaximumValue } from "ethereum/contracts";
import {
  FlashloanLBCore,
  IERC20,
  UnilendFDonation,
} from "ethereum/contracts/FlashloanLB";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { DonateAction } from "state/actions/donateA";

export const getDonationContract = (currentProvider: any) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    FlashloanLBCore(currentProvider)
      .methods.getDonationContract()
      .call((error: any, result: any) => {
        if (!error && result) {
          dispatch({
            type: ActionType.GET_DONATION_CONTRACT,
            payload: result,
          });
        } else {
          console.log("ERR", error);
        }
      });
  };
};

export const donateAllowance = (
  currentProvider: any,
  address: string,
  contractAddress: string,
  receipentAddress: string
) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    if (receipentAddress) {
      let _IERC20 = IERC20(currentProvider, receipentAddress);
      let allowance;
      _IERC20.methods
        .allowance(address, contractAddress)
        .call((error: any, result: any) => {
          if (!error && result) {
            allowance = result;
            console.log(allowance);
            if (allowance === "0") {
              dispatch({
                type: ActionType.DONATE_APPROVAL_STATUS,
                payload: false, // isApproved
              });
            } else {
              localStorage.setItem("donateApproval", "false");
              dispatch({
                type: ActionType.DONATE_APPROVAL_STATUS,
                payload: true, // isApproved
              });
            }
          }
        });
    }
  };
};

export const donateApprove = (
  currentProvider: any,
  address: string,
  contractAddress: string,
  receipentAddress: string
) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    localStorage.setItem("donateApproval", "true");
    let _IERC20 = IERC20(currentProvider, receipentAddress);

    _IERC20.methods
      .approve(contractAddress, approveTokenMaximumValue)
      .send({
        from: address,
      })
      .on("receipt", (res: any) => {
        localStorage.setItem("donateApproval", "false");
      })
      .catch((err: Error) => {
        localStorage.setItem("donateApproval", "false");
      });
  };
};

export const handleDonate = (
  currentProvider: any,
  donateAmount: any,
  address: string,
  receipentAddress: string
) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    dispatch({
      type: ActionType.DONATE_ACTION,
    });
    try {
      const fullAmount = currentProvider.utils.toWei(donateAmount, "ether");
      FlashloanLBCore(currentProvider)
        .methods.getDonationContract()
        .call((error: any, result: any) => {
          if (!error && result) {
            let contractAddress = result;
            let donationContract = UnilendFDonation(
              currentProvider,
              contractAddress
            );
            donationContract.methods
              .donate(receipentAddress, fullAmount)
              .send({
                from: address,
              })
              .on("receipt", (res: any) => {
                dispatch({
                  type: ActionType.DONATE_SUCCESS,
                  payload: true,
                });
              })
              .catch((e: Error) => {
                dispatch({
                  type: ActionType.DONATE_FAILED,
                  payload: false,
                });
              });
          } else {
            dispatch({
              type: ActionType.DONATE_FAILED,
              payload: false,
            });
          }
        });
    } catch (e: any) {
      dispatch({
        type: ActionType.DONATE_FAILED,
        payload: false,
      });
    }
  };
};
