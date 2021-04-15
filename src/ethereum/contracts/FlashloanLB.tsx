import { BalanceContractAddress, UnilendFlashLoanCoreContract } from ".";

import UnilendFDonationABI from "../build/UnilendFDonation.json";
import FlashloanABI from "../build/FlashLoanABI.json";
import IERC20ABI from "../build/IERC20.json";
import BEP20ABI from "../build/IBEP20.json";
import ERC20ABI from "../build/ERC20.json";
import UFlashLoanPool from "../build/UFlashLoanPool.json";
import BalanceABI from "../build/balance-abi.json";
import { bscWeb3 } from "ethereum/bscWeb3";
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
  return new currentProvider.eth.Contract(
    UnilendFDonationABI.abi,
    donateContract
  );
};

export const FlashLoanPool = (currentProvider: any, assertAddress: string) => {
  return new currentProvider.eth.Contract(UFlashLoanPool.abi, assertAddress);
};

export const ERC20 = (currentProvider: any, reciepentAddress: string) => {
  return new currentProvider.eth.Contract(ERC20ABI.abi, reciepentAddress);
};

export const IERC20 = (currentProvider: any, reciepentAddress: string) => {
  if (currentProvider === bscWeb3) {
    return new currentProvider.eth.Contract(BEP20ABI, reciepentAddress);
  } else {
    return new currentProvider.eth.Contract(IERC20ABI.abi, reciepentAddress);
  }
};

export const uUFTIERC20 = (currentProvider: any, assertAddress: any) => {
  if (currentProvider === bscWeb3) {
    return new currentProvider.eth.Contract(BEP20ABI, assertAddress);
  } else {
    return new currentProvider.eth.Contract(IERC20ABI.abi, assertAddress);
  }
};

export const BalanceContract = (currentProvider: any) => {
  return new currentProvider.eth.Contract(BalanceABI, BalanceContractAddress);
};
