export const UnilendFlashLoanCoreContract = (currentProvider: any) => {
  if (currentProvider === "binanceWallet") {
    return "0x13A145D215182924c89F2aBc7D358DCc72F8F788";
  } else {
    // return "0x186b707bB603c16295eF38EA27a081EBf5b65989"; // old contract address
    return "0x13A145D215182924c89F2aBc7D358DCc72F8F788";
  }
};

export const BalanceContractAddress =
  "0xEDF761b93a7D5102714c3833B421aE6E69eeeC83";

export const Reciepent: string = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
// UFT address - 0x1434536899Da6e26B2AD6E5Cfd34611B47F993Ef

export const AssetAddress: string =
  "0xDe7195f2B5cD84749eeF8C3227046fb72F6b343d";

export const approveTokenMaximumValue =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
