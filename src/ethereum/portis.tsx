import Portis from "@portis/web3";
import Web3 from "web3";
let API_KEY: any = process.env.REACT_APP_PORTIS_WALLET_ID;
export const portis = () => new Portis(API_KEY, "ropsten");
export const portisWeb3 = () => new Web3(portis().provider);
