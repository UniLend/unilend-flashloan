import { Wallet } from "components/Helpers/Types";
import { web3Service } from "ethereum/web3Service";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { Action } from "state/actions/connectWalletA";
import CWweb3 from "ethereum/connectWalletWeb3";
import { CoinbaseProvider, CoinbaseWeb3 } from "ethereum/coinbaseWeb3";
import { formaticWeb3 } from "ethereum/formatic";
import { portisWeb3 } from "ethereum/portis";
import web3 from "ethereum/web3";

async function handleWalletConnect(wallet: Wallet, dispatch: Dispatch<Action>) {
  let accounts: any;
  switch (wallet.name) {
    case "metamask":
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
      break;
    case "walletConnect":
      try {
        let provider: any = CWweb3.connectWalletProvider;
        console.log(provider);
        await provider.enable();
        accounts = await CWweb3.connectWalletWeb3.eth.getAcoounts();
        dispatch({
          type: ActionType.CONNECT_WALLET_SUCCESS,
          payload: [...accounts],
        });
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
    case "CoinbaseWallet":
      try {
        CoinbaseProvider.enable()
          .then((accounts: string[]) => {
            console.log(`User's address is ${accounts[0]}`);
            CoinbaseWeb3.eth.defaultAccount = accounts[0];
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...accounts],
            });
          })
          .catch((err) => {
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: err.message,
            });
          });
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
    case "Formatic":
      try {
        let web3: any = formaticWeb3;
        console.log(
          web3.currentProvider
            .enable()
            .then((res: any) => {
              let address: string[];
              console.log(res);

              address = res;
              dispatch({
                type: ActionType.CONNECT_WALLET_SUCCESS,
                payload: [...address],
              });
            })
            .catch((err: any) => {
              dispatch({
                type: ActionType.CONNECT_WALLET_ERROR,
                payload: err.message,
              });
            })
        );
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
    case "Portis":
      try {
        portisWeb3.eth.getAccounts((error, accounts) => {
          if (!error) {
            let address: string[];
            address = accounts;
            dispatch({
              type: ActionType.CONNECT_WALLET_SUCCESS,
              payload: [...address],
            });
          } else {
            dispatch({
              type: ActionType.CONNECT_WALLET_ERROR,
              payload: error.message,
            });
          }
        });
        console.log(portisWeb3);
      } catch (err) {
        dispatch({
          type: ActionType.CONNECT_WALLET_ERROR,
          payload: err.message,
        });
      }
      break;
  }
}

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

export const connectWalletAction = (wallet?: Wallet) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CONNECT_WALLET,
    });
    try {
      console.log("WALLET", wallet);
      if (wallet) {
        let currentProvider: any;
        switch (wallet.name) {
          case "metamask":
            currentProvider = web3;
            break;
          case "walletConnect":
            currentProvider = CWweb3.connectWalletWeb3;
            break;
          case "CoinbaseWallet":
            currentProvider = CoinbaseWeb3;
            break;
          case "Formatic":
            currentProvider = formaticWeb3;
            break;
          case "Portis":
            currentProvider = portisWeb3;
            break;
        }
        dispatch({
          type: ActionType.CURRENT_PROVIDER,
          payload: currentProvider,
        });
        handleWalletConnect(wallet, dispatch);
      }
    } catch (err) {
      dispatch({
        type: ActionType.CONNECT_WALLET_ERROR,
        payload: err.message,
      });
    }
  };
};
