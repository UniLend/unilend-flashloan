import BigNumber from "bignumber.js";
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
    console.log(
      new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString(),
      eToNumber(
        new BigNumber(amount).multipliedBy(Math.pow(10, decimal)).toString()
      )
    );
    return isEth
      ? currentProvider.utils.toWei(amount, "ether")
      : new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString();
  },
};
