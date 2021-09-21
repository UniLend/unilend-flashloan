import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import Web3 from "web3";
export const IFrameProvider: any = new IFrameEthereumProvider();
export const ledgerWeb3 = new Web3(IFrameProvider ?? (window as any).ethereum);
