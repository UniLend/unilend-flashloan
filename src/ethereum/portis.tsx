import Portis from "@portis/web3";
import Web3 from "web3";

export const portis = new Portis(
  "16e1d831-50fa-47af-accc-e7a67fba8cc6",
  "mainnet"
);
export const portisWeb3 = new Web3(portis.provider);
