import { approveTokenMaximumValue } from "ethereum/contracts";
import {
  FlashloanLBCore,
  IERC20,
  UnilendFDonation,
} from "ethereum/contracts/FlashloanLB";
import { web3Service } from "ethereum/web3Service";
import { errorHandler } from "index";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { DonateAction } from "state/actions/donateA";

export const getDonationContract = (
  currentProvider: any,
  selectedNetwork: any
) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    try {
      FlashloanLBCore(currentProvider, selectedNetwork)
        .methods.donationAddress()
        .call((error: any, result: any) => {
          if (!error && result) {
            dispatch({
              type: ActionType.GET_DONATION_CONTRACT,
              payload: result,
            });
          } else {
            dispatch({
              type: ActionType.GET_DONATION_CONTRACT,
              payload: "",
            });
          }
        });
    } catch (e) {
      errorHandler.report(e);

      dispatch({
        type: ActionType.GET_DONATION_CONTRACT,
        payload: "",
      });
    }
  };
};

export const donateAllowance = (
  currentProvider: any,
  address: string,
  contractAddress: string,
  receipentAddress: string
) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    dispatch({
      type: ActionType.DONATE_ALLOWANCE_ACTION,
    });
    try {
      if (receipentAddress) {
        let _IERC20 = IERC20(currentProvider, receipentAddress);
        let allowance;
        _IERC20.methods
          .allowance(address, contractAddress)
          .call((error: any, result: any) => {
            if (!error && result) {
              allowance = result;
              if (allowance === "0") {
                dispatch({
                  type: ActionType.DONATE_APPROVAL_STATUS,
                  payload: false, // isApproved
                });
              } else {
                localStorage.setItem("donateApproval", "false");
                dispatch({
                  type: ActionType.DONATE_APPROVE_SUCCESS,
                });
              }
            } else {
              dispatch({
                type: ActionType.DONATE_ALLOWANCE_FAILED,
              });
            }
          });
      }
    } catch (e) {
      errorHandler.report(e);

      dispatch({
        type: ActionType.DONATE_ALLOWANCE_FAILED,
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
    dispatch({
      type: ActionType.DONATE_APPROVE_ACTION,
    });
    try {
      localStorage.setItem("donateApproval", "true");
      let _IERC20 = IERC20(currentProvider, receipentAddress);

      _IERC20.methods
        .approve(contractAddress, approveTokenMaximumValue)
        .send({
          from: address,
        })
        .on("receipt", (res: any) => {
          localStorage.setItem("donateApproval", "false");
          dispatch({
            type: ActionType.DONATE_APPROVE_SUCCESS,
          });
        })
        .catch((err: Error) => {
          localStorage.setItem("donateApproval", "false");
          dispatch({
            type: ActionType.DONATE_APPROVE_FAILED,
          });
        });
    } catch (e: any) {
      dispatch({
        type: ActionType.DONATE_APPROVE_FAILED,
      });
    }
  };
};
export const setDonateSuccess = () => {
  return async (dispatch: Dispatch<DonateAction>) => {
    dispatch({
      type: ActionType.DONATE_SUCCESS,
      payload: true,
    });
  };
};
export const handleDonate = (
  currentProvider: any,
  donateAmount: any,
  address: string,
  receipentAddress: string,
  isEth: boolean,
  decimal: any
) => {
  return async (dispatch: Dispatch<DonateAction>) => {
    dispatch({
      type: ActionType.DONATE_ACTION,
    });
    try {
      let fullAmount = web3Service.getValue(
        isEth,
        currentProvider,
        donateAmount,
        decimal
      );

      FlashloanLBCore(currentProvider)
        .methods.donationAddress()
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

              .on("transactionHash", (hash: any) => {
                dispatch({
                  type: ActionType.DONATE_TRANSACTION_HASH,
                  payload: hash,
                });
              })
              .on("error", (err: any, res: any) => {
                errorHandler.report(err);

                dispatch({
                  type: ActionType.DONATE_FAILED,
                  message:
                    res === undefined
                      ? "Transaction Rejected"
                      : "Transaction Failed",
                });
              });
          } else {
            dispatch({
              type: ActionType.DONATE_FAILED,
              message: "Transaction Failed",
            });
          }
        });
    } catch (e: any) {
      dispatch({
        type: ActionType.DONATE_FAILED,
        message: "Transaction Failed",
      });
    }
  };
};

export const clearDonateError = () => {
  return async (dispatch: Dispatch<DonateAction>) => {
    dispatch({
      type: ActionType.DONATE_MESSAGE_CLEAR,
    });
  };
};
