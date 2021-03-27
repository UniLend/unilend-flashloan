import { useEffect, useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
// import { useDispatch } from "react-redux";
import { useActions } from "hooks/useActions";
import MainButton from "../MainButton";
// import ConnectWalletModal from "../UI/ConnectWalletModal";
import { useTypedSelector } from "hooks/useTypedSelector";

interface props {
  activeTab: string | null;
}

interface ModalType {
  show: boolean;
}

const CommonCard = (props: props) => {
  const { activeTab } = props;
  // const dispatch = useDispatch();
  const [amount, setAmount] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<ModalType>({
    show: false,
  });
  const [poolPercentage, setPoolPercentage] = useState<any>("");

  const {
    accounts,
    walletConnected,
    currentProvider,
    accountBalance,
    userTokenBalance,
    poolTokenBalance,
    poolLiquidity,
    rewardPoolBalance,
    rewardReleaseRate,
    activeNetWork,
    networkId,
    getUserTokenBalance,
    getPoolLiquidity,
  } = useWalletConnect();

  const {
    handleDeposit,
    handleRedeem,
    handleDonate,
    checkAllowance,
    donateAllowance,
    fetchTokenList,
    getPool,
    getPoolTokenBalance,
    handleAirdrop,
    getAccountBalance,
    handleReciepent,
    setActiveCurrency,
    getDonationContract,
    getRewardPoolBalance,
    getRewardReleaseRate,
    balanceReset,
    networkSwitchHandling,
    rewardTokenList,
  } = useActions();

  const { isDepositApproved: isApproved, isDepositSuccess } = useTypedSelector(
    (state) => state.deposit
  );
  const { activeCurrency } = useTypedSelector((state) => state.settings);
  const {
    donateContractAddress,
    donateIsApproved,
    donateSuccess,
  } = useTypedSelector((state) => state.donate);
  const { redeemSuccess } = useTypedSelector((state) => state.redeem);
  const { airdropSuccess } = useTypedSelector((state) => state.airdrop);
  const { tokenGroupList, tokenList } = useTypedSelector(
    (state) => state.tokenManage
  );
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { assertAddress } = useTypedSelector((state) => state.pool);

  const handleTokenBalance = () => {
    console.log(activeTab);
    if (accounts.length && currentProvider) {
      getAccountBalance(accounts[0]);
      getPoolTokenBalance(
        currentProvider,
        accounts[0],
        assertAddress,
        receipentAddress,
        activeCurrency.decimals
      );
      getUserTokenBalance(
        currentProvider,
        accounts[0],
        receipentAddress,
        activeCurrency.decimals
      );
      if (activeTab === "reward" && donateContractAddress) {
        getRewardPoolBalance(
          currentProvider,
          donateContractAddress,
          receipentAddress,
          activeCurrency.decimals
        );
        getRewardReleaseRate(
          currentProvider,
          donateContractAddress,
          receipentAddress,
          activeCurrency.decimals
        );
      }
    }
  };

  useEffect(() => {
    networkSwitchHandling();

    console.log(networkId);
  }, [walletConnected, tokenList]);

  useEffect(() => {
    if (
      accounts.length &&
      activeCurrency.symbol !== "ETH" &&
      activeTab === "deposit"
    ) {
      checkAllowance(currentProvider, accounts[0], receipentAddress);
    } else if (
      accounts.length &&
      activeCurrency.symbol !== "ETH" &&
      activeTab === "reward"
    ) {
      donateAllowance(
        currentProvider,
        accounts[0],
        donateContractAddress,
        receipentAddress
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accounts,
    donateContractAddress,
    isApproved,
    currentProvider,
    receipentAddress,
    activeTab,
    activeCurrency,
  ]);

  useEffect(() => {
    if (accounts.length && currentProvider) {
      getDonationContract(currentProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, currentProvider]);

  useEffect(() => {
    fetchTokenList(tokenGroupList, networkId);
    // if (tokenList.payload && (tokenList.payload as any).tokens) {
    //   setActiveCurrency((tokenList.payload as any).tokens[0]);
    // }
    setModalInfo({
      ...modalInfo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected, networkId]);

  useEffect(() => {
    let interval: any;

    interval = setInterval(() => {
      getPoolLiquidity(
        currentProvider,
        receipentAddress,
        activeCurrency.symbol === "ETH",
        activeCurrency.decimals
      );
      if (accounts.length && walletConnected) {
        console.log("handlingBalance");
        handleTokenBalance();
      }
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, activeTab, activeCurrency, receipentAddress, assertAddress]);

  useEffect(() => {
    console.log("Pooling");
    if (walletConnected) {
      getPool(activeCurrency.address, currentProvider, accounts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected, accounts, currentProvider, activeCurrency]);

  useEffect(() => {
    setAmount("");
    // if (activeTab === "reward") {
    //   rewardTokenList(tokenList);
    // }
  }, [activeTab]);

  useEffect(() => {
    if (
      isDepositSuccess ||
      donateIsApproved ||
      donateSuccess ||
      redeemSuccess ||
      airdropSuccess
    ) {
      setAmount("");
    }
  }, [
    activeTab,
    donateIsApproved,
    isDepositSuccess,
    donateSuccess,
    redeemSuccess,
    airdropSuccess,
  ]);

  useEffect(() => {
    if (poolTokenBalance > 0 && poolLiquidity > 0) {
      let poolPercent = ((poolTokenBalance / poolLiquidity) * 100).toFixed(2);
      setPoolPercentage(poolPercent);
    } else {
      setPoolPercentage(0);
    }
  }, [poolLiquidity, poolTokenBalance]);

  const handleAmount = async () => {
    switch (activeTab) {
      case "deposit":
        console.log(modalInfo);
        await handleDeposit(
          currentProvider,
          amount,
          accounts[0],
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals
        );

        break;
      case "redeem":
        handleRedeem(
          currentProvider,
          amount,
          accounts[0],
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals
        );

        break;
      case "reward":
        handleDonate(
          currentProvider,
          amount,
          accounts[0],
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals
        );
        break;
      case "airdrop":
        handleAirdrop(
          currentProvider,
          amount,
          accounts[0],
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals
        );
        // handled
        break;
      default:
        break;
    }
  };

  const handleModal = (show: boolean) => {
    setModalInfo({
      show,
    });
    // if (tokenList.length === 0) fetchTokenList(tokenGroupList);
  };

  return (
    <>
      <div className="network-warning">
        {activeNetWork !== "Kovan" &&
          `You are currently connected to the ${activeNetWork} which is not supported.`}
        {/* ${activeNetWork !== "Mainnet" ? "Testnet" : ""} */}
      </div>
      {activeTab && (
        <ContentCard title={`${capitalize(activeTab)}`}>
          <div className="swap-root">
            <FieldCard
              onF1Change={(e) => setAmount(e.target.value)}
              handleModelOpen={() => handleModal(true)}
              fieldLabel="Amount"
              fieldValue={amount}
              fieldType="text"
              selectLabel={
                activeCurrency.symbol === "ETH"
                  ? accountBalance
                  : userTokenBalance
              }
              selectValue={activeCurrency.symbol ? activeCurrency.symbol : ""}
              selectedLogo={
                activeCurrency.logoURI ? activeCurrency.logoURI : ""
              }
            />
            <MainButton
              isEth={activeCurrency.symbol === "ETH"}
              decimal={activeCurrency.decimals}
              amount={amount}
              actionName={`${capitalize(activeTab)}`}
              handleAmount={() => handleAmount()}
            />
            {(activeTab === "deposit" &&
              (isApproved || activeCurrency.symbol === "ETH")) ||
            activeTab === "redeem" ? (
              // ||
              // activeCurrency.symbol === "ETH"
              <div className="price_head">
                <div className="price_aa">
                  {/* <div className="price-list">
                    Pool percentage <span className="price">-</span>
                  </div> */}
                  <div className="price-list">
                    Pool Liquidity{" "}
                    <span className="price">
                      {poolLiquidity ? (
                        <>
                          <span>{poolLiquidity}</span>
                          <img
                            src={activeCurrency.logoURI}
                            alt="logo"
                            width="13"
                          />
                          <span>{activeCurrency.symbol}</span>
                        </>
                      ) : (
                        "-"
                      )}
                    </span>
                    <span></span>
                  </div>
                  <div className="price-list">
                    Pool Share
                    <span className="price">
                      {poolPercentage !== "" &&
                      poolLiquidity !== "" &&
                      poolTokenBalance !== "" &&
                      walletConnected
                        ? `${poolPercentage}%`
                        : "-"}
                    </span>
                  </div>
                  <div className="price-list">
                    Your Liquidity
                    {/* {" "}
                      {!poolLoading && poolName ? `(${poolName})` : ""} */}
                    <span className="price">
                      {walletConnected && poolTokenBalance !== "" ? (
                        <>
                          <span>{poolTokenBalance}</span>
                          <img
                            src={activeCurrency.logoURI}
                            alt="logo"
                            width="13"
                          />
                          <span>{activeCurrency.symbol}</span>
                        </>
                      ) : (
                        "-"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {activeTab === "reward" && (
              <div className="price_head">
                <div className="price_aa">
                  <div className="price-list">
                    Reward Available
                    <span className="price">
                      {walletConnected && rewardPoolBalance !== "" ? (
                        <>
                          <span>{rewardPoolBalance}</span>
                          <img
                            src={activeCurrency.logoURI}
                            alt="logo"
                            width="13"
                          />
                          <span>{activeCurrency.symbol}</span>
                        </>
                      ) : (
                        "-"
                      )}
                    </span>
                  </div>
                  <div className="price-list">
                    Reward Rate
                    <span className="price">{`${
                      rewardReleaseRate !== "" ? `${rewardReleaseRate}%` : "-"
                    }/day`}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ContentCard>
      )}
      {modalInfo.show && activeTab && (
        <CurrencySelectModel
          currFieldName={activeCurrency.symbol}
          handleCurrChange={async (selectedAddress: any) => {
            await balanceReset();
            setPoolPercentage(0);
            await setActiveCurrency(selectedAddress);
            await getPool(
              selectedAddress.address,
              currentProvider,
              accounts[0]
            );
            await handleModal(false);
            await handleReciepent(selectedAddress.address);
          }}
          handleClose={() => handleModal(false)}
          activeTab={activeTab}
        />
      )}
    </>
  );
};

export default CommonCard;
