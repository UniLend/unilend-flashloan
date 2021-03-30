import { eToNumber } from "components/Helpers";
import web3 from "./web3";

export const web3Service = {
  getAccounts: () => {
    return web3.eth.getAccounts();
  },
  getBalance: (address: string) => {
    return web3.eth.getBalance(address);
  },
  getWei: (payload: any, curr: string) => {
    return web3.utils.fromWei(payload, curr);
  },
  getValue: (isEth: any, currentProvider: any, amount: any, decimal: any) => {
    console.log();
    return isEth
      ? currentProvider.utils.toWei(amount, "ether")
      : eToNumber(amount * Math.pow(10, decimal)).toString();
  },
};
