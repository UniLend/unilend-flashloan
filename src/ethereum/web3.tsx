import Web3 from "web3";

let web3: any;
// if (typeof window !== 'undefined' && typeof (window as any).web3 !== 'undefined') {
// We are in the browser and metamask is running.
web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// } else {
// We are on the server *OR* the user is not running metamask
// const provider = new Web3.providers.HttpProvider(
// 'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
// );
// web3 = new Web3(provider);
// }
export default web3;
