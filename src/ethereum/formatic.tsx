import Fortmatic from "fortmatic";
// Works for web3 1.0 and pre-1.0 versions
import Web3 from "web3";
const API_KEY: any = process.env.REACT_APP_FORMATIC_API_KEY;
export const fm: any = new Fortmatic(API_KEY, "ropsten");
export const formaticWeb3 = new Web3(fm.getProvider());
