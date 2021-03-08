import { web3Service } from "ethereum/web3Service";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { Action } from "state/actions/connectWalletA";

export const getAccountBalance = (selectedAccount: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let balance = await web3Service.getBalance(selectedAccount);
      let ethBal = web3Service.getWei(balance, "ether");
      let ethBalDeci = ethBal.slice(0, 7);
      dispatch({
        type: ActionType.ACCOUNT_BALANCE,
        payload: ethBalDeci,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const connectWalletAction = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CONNECT_WALLET,
    });
    try {
      let accounts: any;
      accounts = await web3Service.getAccounts();
      if (window && !(window as any).ethereum.selectedAddress) {
        (window as any).ethereum.enable().then(() => {
          console.log("accounts", accounts);
          dispatch({
            type: ActionType.CONNECT_WALLET_SUCCESS,
            payload: [...accounts],
          });
        });
      } else {
        dispatch({
          type: ActionType.CONNECT_WALLET_SUCCESS,
          payload: [...accounts],
        });
      }
    } catch (err) {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: err.message,
      });
    }
  };
};
