import { AssetAddress, Reciepent, UnilendFlashLoanCoreContract } from ".";

import UnilendFDonationABI from "../build/UnilendFDonation.json";
import FlashloanABI from "../build/FlashLoanABI.json";
import IERC20ABI from "../build/IERC20.json";

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

export const IERC20 = (currentProvider: any) => {
  return new currentProvider.eth.Contract(IERC20ABI.abi, Reciepent);
};

export const uUFTIERC20 = (currentProvider: any) => {
  return new currentProvider.eth.Contract(IERC20ABI.abi, AssetAddress);
};
