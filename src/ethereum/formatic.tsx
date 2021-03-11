import Fortmatic from "fortmatic";
// Works for web3 1.0 and pre-1.0 versions
import Web3 from "web3";
const API_KEY: any = "pk_test_19B194A001A24CAE";
console.log(API_KEY);
export const fm: any = new Fortmatic(API_KEY);
export const formaticWeb3 = new Web3(fm.getProvider());
