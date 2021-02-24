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
};
