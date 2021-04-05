import { useEffect, useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize, toFixed } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
// import { useDispatch } from "react-redux";
import { useActions } from "hooks/useActions";
import MainButton from "../MainButton";
// import ConnectWalletModal from "../UI/ConnectWalletModal";
import { useTypedSelector } from "hooks/useTypedSelector";
// import { formaticWeb3 } from "ethereum/formatic";
// import AlertImg from "assets/warning-standalone.svg";
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
  const [depositChecked, setDepositChecked] = useState<boolean>(false);
  const [poolPercentage, setPoolPercentage] = useState<any>("");
  const {
    accounts,
    walletConnected,
    currentProvider,
    userTokenBalance,
    poolTokenBalance,
    poolLiquidity,
    rewardPoolBalance,
    rewardReleaseRate,
    activeNetWork,
    networkId,
    currentApy,
    totalDepositedTokens,
    totalTokensInRewardPool,
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
    getCurrentAPY,
    getRewardReleaseRatePerDay,
    balanceReset,
    networkSwitchHandling,
    getTotalDepositedTokens,
    getTotalTokensInRewardPool,
  } = useActions();

  const { isDepositApproved: isApproved, isDepositSuccess } = useTypedSelector(
    (state) => state.deposit
  );
  const { activeCurrency, theme } = useTypedSelector((state) => state.settings);
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
    if (accounts.length && currentProvider) getAccountBalance(accounts[0]);
    if (
      accounts.length &&
      currentProvider &&
      activeCurrency.symbol !== "Select Token"
    ) {
      if (activeCurrency.symbol !== "Select Token")
        getPoolTokenBalance(
          currentProvider,
          accounts[0],
          assertAddress,
          receipentAddress,
          activeCurrency.decimals
        );
      if (activeCurrency.symbol !== "Select Token")
        getUserTokenBalance(
          currentProvider,
          accounts[0],
          receipentAddress,
          assertAddress,
          activeCurrency.decimals
        );
    }
    if (activeCurrency.symbol !== "Select Token")
      getTotalDepositedTokens(currentProvider, activeCurrency.address);
    if (donateContractAddress !== "") {
      getTotalTokensInRewardPool(
        currentProvider,
        activeCurrency.address,
        donateContractAddress
      );
    }
    if (activeCurrency.symbol !== "Select Token")
      getRewardReleaseRatePerDay(
        currentProvider,
        donateContractAddress,
        receipentAddress,
        activeCurrency.decimals
      );
    if (
      activeTab === "reward" &&
      donateContractAddress &&
      activeCurrency.symbol !== "Select Token"
    ) {
      getRewardPoolBalance(
        currentProvider,
        donateContractAddress,
        receipentAddress,
        activeCurrency.decimals
      );
    }
  };

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
    getDonationContract(currentProvider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accounts,
    activeTab,
    activeCurrency,
    receipentAddress,
    assertAddress,
    donateContractAddress,
  ]);
  useEffect(() => {
    if (totalDepositedTokens !== "" && totalTokensInRewardPool !== "") {
      getCurrentAPY(
        currentProvider,
        donateContractAddress,
        receipentAddress,
        activeCurrency.decimals,
        totalDepositedTokens,
        totalTokensInRewardPool
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeCurrency.decimals,
    currentProvider,
    donateContractAddress,
    receipentAddress,
    totalDepositedTokens,
    totalTokensInRewardPool,
  ]);
  useEffect(() => {
    networkSwitchHandling(currentProvider);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected, tokenList]);

  useEffect(() => {
    if (
      accounts.length &&
      activeCurrency.symbol !== "Select Token" &&
      activeTab === "lend"
    ) {
      checkAllowance(currentProvider, accounts[0], receipentAddress);
    } else if (
      accounts.length &&
      activeCurrency.symbol !== "Select Token" &&
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
    fetchTokenList(tokenGroupList, networkId, currentProvider, accounts);
    setModalInfo({
      ...modalInfo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected, networkId, currentProvider, accounts, activeCurrency]);

  useEffect(() => {
    let interval: any;

    interval = setInterval(() => {
      if (accounts.length && walletConnected) {
        getPoolLiquidity(
          currentProvider,
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals
        );
      }
      handleTokenBalance();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accounts,
    activeTab,
    activeCurrency,
    receipentAddress,
    assertAddress,
    donateContractAddress,
    totalDepositedTokens,
    totalTokensInRewardPool,
  ]);
  useEffect(() => {
    let interval: any;

    interval = setInterval(() => {
      if (accounts.length && walletConnected) {
        getPoolLiquidity(
          currentProvider,
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals
        );
      }
      handleTokenBalance();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accounts,
    activeTab,
    activeCurrency,
    receipentAddress,
    assertAddress,
    donateContractAddress,
    totalDepositedTokens,
    totalTokensInRewardPool,
  ]);
  useEffect(() => {
    if (walletConnected && activeCurrency.symbol !== "Select Token") {
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
    if (poolTokenBalance > 0 && poolLiquidity > 0) {
      let poolPercent = toFixed((poolTokenBalance / poolLiquidity) * 100, 2);
      setPoolPercentage(poolPercent);
    } else {
      setPoolPercentage(0);
    }
  }, [poolLiquidity, poolTokenBalance]);

  const handleAmount = async () => {
    switch (activeTab) {
      case "lend":
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
      {accounts.length &&
      activeNetWork !== "Mainnet" &&
      activeNetWork !== "Ropsten" ? (
        <div className="network-warning">
          {`You are currently connected to the ${activeNetWork} which is not
          supported.`}
          {/* ${activeNetWork !== "Mainnet" ? "Testnet" : ""} */}
        </div>
      ) : (
        ""
      )}
      {activeTab && (
        <ContentCard title={`${capitalize(activeTab)}`}>
          <div className="swap-root">
            <FieldCard
              onF1Change={(e) => setAmount(e.target.value)}
              handleModelOpen={() => handleModal(true)}
              fieldLabel="Amount"
              fieldValue={amount}
              setFieldValue={setAmount}
              fieldType="text"
              selectLabel={
                activeTab === "redeem" ? poolTokenBalance : userTokenBalance
              }
              selectValue={activeCurrency.symbol ? activeCurrency.symbol : ""}
              selectedLogo={
                activeCurrency.logoURI ? activeCurrency.logoURI : ""
              }
            />
            {(activeTab === "reward" || activeTab === "airdrop") &&
            activeCurrency.symbol !== "Select Token" &&
            amount !== "" &&
            parseFloat(amount) > 0 ? (
              <div className={`${theme} card field-card mt-4`}>
                <div className="card-body py-2">
                  <div className="w-100 align-items-center text-center pr-0 mr-0">
                    {/* <div className="alerticon justify-content-center d-flex w-100">
                      <img className="icon" src={AlertImg} alt="alert" />
                    </div> */}
                    <p className="mb-0 mt-3 warning-lead-text">
                      The amount you {capitalize(activeTab)}, will be deducted
                      from your wallet permanently and added to the reward pool.
                    </p>
                    <p className="mb-0 mt-3 warning-note-text ">
                      Please Note: This transaction is irreversible
                    </p>
                    <div className="checkbox-custom mt-3 d-flex align-items-center justify-content-center">
                      <input
                        type="checkbox"
                        checked={depositChecked}
                        onClick={() => {
                          setDepositChecked(!depositChecked);
                        }}
                      />
                      <label className="warning-note-text">I Understand</label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <MainButton
              isEth={activeCurrency.symbol === "ETH"}
              decimal={activeCurrency.decimals}
              amount={amount}
              actionName={`${
                activeTab === "lend"
                  ? capitalize("deposit")
                  : capitalize(activeTab)
              }`}
              isChecked={depositChecked}
              handleAmount={() => {
                if (activeCurrency.symbol !== "Select Token") handleAmount();
              }}
            />
            {(activeTab === "lend" || activeTab === "redeem") &&
            activeCurrency.symbol !== "Select Token" ? (
              // ||
              // activeCurrency.symbol === "ETH"
              <div className="price_head">
                <div className="price_aa">
                  {/* <div className="price-list">
                    Pool percentage <span className="price">-</span>
                  </div> */}
                  <div className="price-list">
                    <p>Current APY</p>
                    <span className="price">{`${
                      currentApy !== "" ? `${currentApy}%` : "-"
                    }/year`}</span>
                  </div>
                  <div className="price-list">
                    <p>Total Pool Liquidity </p>
                    <span className="price">
                      {poolLiquidity ? (
                        <>
                          <span>{poolLiquidity.toLocaleString()}</span>
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
                    <p>Your Pool Share</p>
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
                    <p>Your Liquidity</p>
                    {/* {" "}
                      {!poolLoading && poolName ? `(${poolName})` : ""} */}
                    <span className="price">
                      {walletConnected && poolTokenBalance !== "" ? (
                        <>
                          <span>{poolTokenBalance.toLocaleString()}</span>
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
            {activeTab === "reward" &&
              activeCurrency.symbol !== "Select Token" && (
                <div className="price_head">
                  <div className="price_aa">
                    <div className="price-list">
                      <p>Current APY</p>
                      <span className="price">{`${
                        currentApy !== "" ? `${currentApy}%` : "-"
                      }/year`}</span>
                    </div>
                    <div className="price-list">
                      <p>Reward Available</p>
                      <span className="price">
                        {walletConnected && rewardPoolBalance !== "" ? (
                          <>
                            <span>{rewardPoolBalance.toLocaleString()}</span>
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
                      <p>Reward Rate</p>
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
            await handleModal(false);
            await balanceReset();
            setPoolPercentage(0);
            await setActiveCurrency(selectedAddress);
            if (accounts.length && currentProvider) {
              await getPool(
                selectedAddress.address,
                currentProvider,
                accounts[0]
              );
            }
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
