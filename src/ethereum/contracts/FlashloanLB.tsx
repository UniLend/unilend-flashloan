import { UnilendFlashLoanCoreContract } from ".";

import UnilendFDonationABI from "../build/UnilendFDonation.json";
import FlashloanABI from "../build/FlashLoanABI.json";
import IERC20ABI from "../build/IERC20.json";
import ERC20ABI from "../build/ERC20.json";
export const FlashloanLBCore = (currentProvider: any) => {
  return new currentProvider.eth.Contract(
    FlashloanABI.abi,
    UnilendFlashLoanCoreContract(currentProvider)
  );
};
export const UnilendFDonation = (
  currentProvider: any,
  donateContract: string
) => {
  console.log("donateContract", donateContract);
  return new currentProvider.eth.Contract(
    UnilendFDonationABI.abi,
    donateContract
  );
};

export const ERC20 = (currentProvider: any, reciepentAddress: string) => {
  return new currentProvider.eth.Contract(ERC20ABI.abi, reciepentAddress);
};

export const IERC20 = (currentProvider: any, reciepentAddress: string) => {
  return new currentProvider.eth.Contract(IERC20ABI.abi, reciepentAddress);
};

export const uUFTIERC20 = (currentProvider: any, assertAddress: any) => {
  return new currentProvider.eth.Contract(IERC20ABI.abi, assertAddress);
};
