export const UnilendFlashLoanCoreContract = (currentProvider: any) => {
  if (currentProvider === "binanceWallet") {
    return "0x8b90F6Be5C8fF057d0744fB4D99F7EfFf6889460";
  } else {
    return "0x186b707bB603c16295eF38EA27a081EBf5b65989";
  }
};

export const Reciepent: string = "0x1434536899Da6e26B2AD6E5Cfd34611B47F993Ef";
export const AssetAddress: string =
  "0xb20e7d234c5e4f7d99fb982ee525e8b438eef7b5";
export const approveTokenMaximumValue =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const currencyList: {
  currency: {
    id: number;
    name: string;
    desc: string;
  }[];
} = {
  currency: [
    {
      id: 1,
      name: "ht",
      desc: "ht",
    },
    {
      id: 2,
      name: "eth",
      desc: "ether",
    },
    {
      id: 3,
      name: "aave",
      desc: "aave",
    },
  ],
};
