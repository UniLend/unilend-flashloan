import Portis from "@portis/web3";
import Web3 from "web3";
let API_KEY: any = process.env.REACT_APP_PORTIS_WALLET_ID;
export const portis = () => {
  return new Portis(API_KEY, "ropsten");
};
export const portisWeb3 = () => {
  return new Web3(new Portis(API_KEY, "ropsten").provider);
};
