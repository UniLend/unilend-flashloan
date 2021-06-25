/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize, toFixed } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "hooks/useActions";
import MainButton from "../MainButton";
// import ConnectWalletModal from "../UI/ConnectWalletModal";
import { useTypedSelector } from "hooks/useTypedSelector";
import TransactionPopup from "../UI/TransactionLoaderPopup/TransactionLoader";
import AlertToast from "../UI/AlertToast/AlertToast";
import { RouteComponentProps, withRouter } from "react-router";
import queryString from "query-string";
import { RiskApproval } from "./RiskApproval";
interface Props extends RouteComponentProps<any> {
  activeTab: string | null;
}

interface ModalType {
  show: boolean;
}

interface AlertType {
  show: boolean;
}

const CommonCard: FC<Props> = (props) => {
  const { activeTab } = props;
  // const dispatch = useDispatch();
  const [redeemMax, setRedeemMax] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<ModalType>({
    show: false,
  });
  const [alertInfo, setAlertInfo] = useState<AlertType>({
    show: false,
  });
  const [progressValue, setProgressValue] = useState<Number>(100);
  const [depositChecked, setDepositChecked] = useState<boolean>(false);
  const [transModalInfo, setTransModalInfo] = useState<boolean>(false);
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
    accountBalance,
    totalDepositedTokens,
    totalTokensInRewardPool,
    walletProvider,
    selectedNetworkId,
    connectedWallet,
    fullPoolUTokenBalance,
    currentApyLoading,
    poolLiquidityLoading,
    poolTokenBalanceLoading,
    rewardPoolBalanceLoading,
    rewardReleaseRateLoading,
    getUserTokenBalance,
    getPoolLiquidity,
    handleWalletConnect,
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
    getPooluTokenBalance,
    clearDepositError,
    clearDonateError,
    clearRedeemError,
    clearAirdropError,
  } = useActions();

  const {
    isDepositApproved: isApproved,
    isDepositSuccess,
    depositErrorMessage,
    depositSuccessMessage,
    depositTransactionHashRecieved,
  } = useTypedSelector((state) => state.deposit);
  const { activeCurrency } = useTypedSelector((state) => state.settings);
  const {
    donateContractAddress,
    donateIsApproved,
    donateSuccess,
    donateErrorMessage,
    donateSuccessMessage,
    donateTransactionHashRecieved,
  } = useTypedSelector((state) => state.donate);
  const {
    redeemSuccess,
    redeemErrorMessage,
    redeemTransactionHashReceived,
    redeemSuccessMessage,
  } = useTypedSelector((state) => state.redeem);
  const {
    airdropSuccess,
    airdropTransactionHashReceived,
    airdropErrorMessage,
    airdropSuccessMessage,
  } = useTypedSelector((state) => state.airdrop);
  const { tokenGroupList, tokenList, customTokens } = useTypedSelector(
    (state) => state.tokenManage
  );
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { assertAddress } = useTypedSelector((state) => state.pool);

  const handleTokenBalance = () => {
    if (accounts.length && currentProvider)
      getAccountBalance(accounts[0], selectedNetworkId);
    if (
      accounts.length &&
      currentProvider &&
      activeCurrency.symbol !== "Select Token"
    ) {
      getPooluTokenBalance(
        currentProvider,
        accounts[0],
        receipentAddress,
        activeCurrency.decimals,
        selectedNetworkId
      );
      if (activeCurrency.symbol !== "Select Token")
        getPoolTokenBalance(
          currentProvider,
          accounts[0],
          assertAddress,
          receipentAddress,
          activeCurrency.decimals,
          selectedNetworkId
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
      getTotalDepositedTokens(
        currentProvider,
        activeCurrency.address,
        selectedNetworkId
      );
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
  const getErrorMessage = () => {
    switch (activeTab) {
      case "lend":
        return depositErrorMessage;
      case "reward":
        return donateErrorMessage;
      case "redeem":
        return redeemErrorMessage;
      case "airdrop":
        return airdropErrorMessage;
      default:
        return "";
    }
  };

  const getSuccessMessage = () => {
    switch (activeTab) {
      case "lend":
        return depositSuccessMessage;
      case "reward":
        return donateSuccessMessage;
      case "redeem":
        return redeemSuccessMessage;
      case "airdrop":
        return airdropSuccessMessage;
      default:
        return "";
    }
  };
  useEffect(() => {
    if (tokenList.payload.length > 0 && props.location.search) {
      let query: any = queryString.parse(props.location.search);
      let filteredToken: any = tokenList.payload.filter((item: any) => {
        return item.address.toLowerCase() === query.token.toLowerCase();
      });
      if (filteredToken.length > 0) {
        setActiveCurrency(filteredToken[0]);
        networkSwitchHandling(currentProvider);
        handleModal(false);
        balanceReset();
        setPoolPercentage(0);
        if (accounts.length && currentProvider) {
          getPool(filteredToken[0].address, currentProvider, accounts[0]);
        }
        handleReciepent(filteredToken[0].address);
      }
    }
  }, [tokenList]);
  useEffect(() => {
    if (
      isDepositSuccess ||
      donateIsApproved ||
      isApproved ||
      donateSuccess ||
      redeemSuccess ||
      airdropSuccess
    ) {
      setAmount("");
      setDepositChecked(false);
    }
  }, [
    activeTab,
    donateIsApproved,
    isDepositSuccess,
    isApproved,
    donateSuccess,
    redeemSuccess,
    airdropSuccess,
  ]);

  useEffect(() => {
    getDonationContract(currentProvider, selectedNetworkId);
  }, [
    accounts,
    activeTab,
    activeCurrency,
    receipentAddress,
    assertAddress,
    donateContractAddress,
  ]);
  const handleToast = (show: boolean) => {
    setAlertInfo({
      show,
    });
  };
  useEffect(() => {
    let interval: any;
    if (
      (activeTab === "lend" && depositErrorMessage === "Transaction Failed") ||
      (activeTab === "reward" && donateErrorMessage === "Transaction Failed") ||
      (activeTab === "redeem" && redeemErrorMessage === "Transaction Failed") ||
      (activeTab === "airdrop" && airdropErrorMessage === "Transaction Failed")
    ) {
      var now = 100;
      interval = setInterval(() => {
        now--;
        setProgressValue(now);
        if (now === 0) {
          clearDepositError();
          clearAirdropError();
          clearDonateError();
          clearRedeemError();
          handleToast(false);
          clearInterval(interval);
        }
      }, 100);
      handleToast(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    depositErrorMessage,
    donateErrorMessage,
    redeemErrorMessage,
    airdropErrorMessage,
  ]);
  useEffect(() => {
    let interval: any;
    if (
      (activeTab === "lend" && isDepositSuccess) ||
      (activeTab === "reward" && donateSuccess) ||
      (activeTab === "redeem" && redeemSuccess) ||
      (activeTab === "airdrop" && airdropSuccess)
    ) {
      var now = 100;
      interval = setInterval(() => {
        now--;
        setProgressValue(now);
        if (now === 0) {
          clearDepositError();
          clearAirdropError();
          clearDonateError();
          clearDonateError();
          handleToast(false);
          clearInterval(interval);
        }
      }, 100);
      handleToast(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    isDepositSuccess,
    donateSuccess,
    redeemSuccess,
    airdropSuccess,
    activeTab,
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
  }, [
    activeCurrency.decimals,
    currentProvider,
    donateContractAddress,
    receipentAddress,
    totalDepositedTokens,
    totalTokensInRewardPool,
  ]);
  useEffect(() => {
    if (walletConnected) {
      networkSwitchHandling(currentProvider);
    }
  }, [
    tokenList,
    currentProvider,
    walletConnected,
    walletProvider,
    selectedNetworkId,
  ]);

  useEffect(() => {
    if (walletConnected) handleWalletConnect(JSON.parse(connectedWallet));
  }, [selectedNetworkId]);

  useEffect(() => {
    if (
      accounts.length &&
      activeCurrency.symbol !== "Select Token" &&
      activeTab === "lend"
    ) {
      checkAllowance(
        currentProvider,
        accounts[0],
        receipentAddress,
        selectedNetworkId
      );
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
    fetchTokenList(
      tokenGroupList,
      networkId,
      currentProvider,
      accounts,
      accountBalance,
      selectedNetworkId
    );
    setModalInfo({
      ...modalInfo,
    });
  }, [
    networkId,
    activeNetWork,
    currentProvider,
    accounts,
    accountBalance,
    tokenGroupList,
    customTokens,
  ]);

  useEffect(() => {
    let interval: any;

    interval = setInterval(() => {
      if (activeCurrency.symbol !== "Select Token") {
        getPoolLiquidity(
          currentProvider,
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals,
          selectedNetworkId
        );
      }
      handleTokenBalance();
    }, 5000);
    return () => clearInterval(interval);
  }, [
    accounts,
    activeTab,
    activeCurrency,
    receipentAddress,
    selectedNetworkId,
    assertAddress,
    donateContractAddress,
    totalDepositedTokens,
    totalTokensInRewardPool,
    tokenList,
  ]);
  // useEffect(() => {
  //   let interval: any;

  //   interval = setInterval(() => {
  //     if (accounts.length && walletConnected) {
  //       getPoolLiquidity(
  //         currentProvider,
  //         receipentAddress,
  //         activeCurrency.symbol === "ETH",
  //         activeCurrency.decimals
  //       );
  //     }
  //     handleTokenBalance();
  //   }, 5000);
  //   return () => clearInterval(interval);
  //
  // }, [
  //   accounts,
  //   activeTab,
  //   activeCurrency,
  //   receipentAddress,
  //   assertAddress,
  //   donateContractAddress,
  //   totalDepositedTokens,
  //   totalTokensInRewardPool,
  // ]);
  useEffect(() => {
    if (walletConnected && activeCurrency.symbol !== "Select Token") {
      getPool(activeCurrency.address, currentProvider, accounts[0]);
    }
  }, [walletConnected, accounts, currentProvider, activeCurrency]);
  useEffect(() => {
    setAmount("");
    clearDepositError();
    clearAirdropError();
    clearDonateError();
    clearRedeemError();
    handleToast(false);
    // if (activeTab === "reward") {
    //   rewardTokenList(tokenList);
    // }
  }, [activeTab]);

  // useEffect(() => {
  //   if (
  //     isDepositSuccess ||
  //     donateIsApproved ||
  //     donateSuccess ||
  //     redeemSuccess ||
  //     airdropSuccess
  //   ) {
  //     setAmount("");
  //   }
  // }, [
  //   activeTab,
  //   donateIsApproved,
  //   isDepositSuccess,
  //   donateSuccess,
  //   redeemSuccess,
  //   airdropSuccess,
  // ]);

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
          activeCurrency.decimals,
          selectedNetworkId
        );
        handleTransModal(true);
        break;
      case "redeem":
        handleRedeem(
          currentProvider,
          amount,
          accounts[0],
          receipentAddress,
          activeCurrency.symbol === "ETH",
          activeCurrency.decimals,
          redeemMax,
          fullPoolUTokenBalance
        );
        handleTransModal(true);
        break;
      case "reward":
        handleDonate(
          currentProvider,
          amount,
          accounts[0],
          receipentAddress,
          activeCurrency.symbol === "MATIC",
          activeCurrency.decimals
        );
        handleTransModal(true);

        break;
      case "airdrop":
        handleAirdrop(
          currentProvider,
          amount,
          accounts[0],
          receipentAddress,
          activeCurrency.symbol === "MATIC",
          activeCurrency.decimals,
          selectedNetworkId
        );
        handleTransModal(true);
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

  const handleTransModal = (isShow: boolean) => setTransModalInfo(isShow);

  const handleRedeemMax = () => {
    setRedeemMax(true);
  };

  const Loader = () => (
    <div>
      <div
        className="spinner-border spinner-balance approve-loader"
        role="status"
      >
        <span className="sr-only">loading...</span>
      </div>
    </div>
  );

  const CurrentApy = () => (
    <div className="price-list">
      <p>Current APY</p>
      <span className="price">
        {currentApyLoading ? (
          <Loader />
        ) : currentApy !== "" ? (
          `${currentApy}%/year`
        ) : (
          "-/year"
        )}
      </span>
    </div>
  );

  const TotalPoolLiquidity = () => (
    <div className="price-list">
      <p>Total Pool Liquidity </p>
      <span className="price">
        {poolLiquidityLoading ? (
          <Loader />
        ) : poolLiquidity ? (
          <>
            <span>{poolLiquidity.toLocaleString()}</span>
            <img src={activeCurrency.logoURI} alt="logo" width="13" />
            <span>{activeCurrency.symbol}</span>
          </>
        ) : (
          "-"
        )}
      </span>
      <span></span>
    </div>
  );

  const YourPoolShare = () => (
    <div className="price-list">
      <p>Your Pool Share</p>
      <span className="price">
        {poolTokenBalanceLoading ? (
          <Loader />
        ) : poolPercentage !== "" &&
          poolLiquidity !== "" &&
          poolTokenBalance !== "" &&
          walletConnected ? (
          `${poolPercentage}%`
        ) : (
          "-"
        )}
      </span>
    </div>
  );

  const YourLiquidity = () => (
    <div className="price-list">
      <p>Your Liquidity</p>
      <span className="price">
        {poolTokenBalanceLoading ? (
          <Loader />
        ) : walletConnected && poolTokenBalance !== "" ? (
          <>
            <span>{poolTokenBalance.toLocaleString()}</span>
            <img src={activeCurrency.logoURI} alt="logo" width="13" />
            <span>{activeCurrency.symbol}</span>
          </>
        ) : (
          "-"
        )}
      </span>
    </div>
  );

  const RewardAvailable = () => (
    <div className="price-list">
      <p>Reward Available</p>
      <span className="price">
        {rewardPoolBalanceLoading ? (
          <Loader />
        ) : walletConnected && rewardPoolBalance !== "" ? (
          <>
            <span>{rewardPoolBalance.toLocaleString()}</span>
            <img src={activeCurrency.logoURI} alt="logo" width="13" />
            <span>{activeCurrency.symbol}</span>
          </>
        ) : (
          "-"
        )}
      </span>
    </div>
  );

  const RewardRate = () => (
    <div className="price-list">
      <p>Reward Rate</p>
      <span className="price">{`${
        rewardReleaseRateLoading ? (
          <Loader />
        ) : rewardReleaseRate !== "" ? (
          `${rewardReleaseRate}%`
        ) : (
          "-"
        )
      }/day`}</span>
    </div>
  );

  const networkMessage = () => {
    if (accounts.length) {
      if (
        selectedNetworkId === 1 &&
        activeNetWork !== "Mainnet" &&
        activeNetWork !== "Ropsten"
      ) {
        return `Please switch your Network to Ethereum.`;
      } else if (selectedNetworkId === 3 && activeNetWork !== "Matic Mainnet") {
        return `Please switch your Network to Polygen`;
      } else if (
        selectedNetworkId === 2 &&
        activeNetWork !== "Binance Mainnet"
      ) {
        return `Please switch your Network to Binance`;
      }
    }
  };

  return (
    <>
      {/* {accounts.length &&
      ((selectedNetworkId === 1 &&
        activeNetWork !== "Mainnet" &&
        activeNetWork !== "Ropsten") ||
        (selectedNetworkId === 3 && activeNetWork !== "Matic Mainnet") ||
        (selectedNetworkId === 2 && activeNetWork !== "Binance Mainnet")) ? (
        <div className="network-warning">
          {`You are currently connected to the ${activeNetWork} which is not
          supported.`}
        </div>
      ) : (
        ""
      )} */}
      <div className="network-warning">{networkMessage()}</div>

      {activeTab && (
        <ContentCard title={`${capitalize(activeTab)}`}>
          <div className="swap-root">
            <FieldCard
              onF1Change={(e) => {
                setAmount(e.target.value);
                if (redeemMax) {
                  setRedeemMax(false);
                }
              }}
              onRedeemMax={handleRedeemMax}
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
              <RiskApproval
                activeTab={activeTab}
                isChecked={depositChecked}
                onChecked={() => {
                  setDepositChecked(!depositChecked);
                }}
              />
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
              <div className="price_head">
                <div className="price_aa">
                  <CurrentApy />
                  <TotalPoolLiquidity />
                  <YourPoolShare />
                  <YourLiquidity />
                </div>
              </div>
            ) : (
              ""
            )}
            {activeTab === "reward" &&
              activeCurrency.symbol !== "Select Token" && (
                <div className="price_head">
                  <div className="price_aa">
                    <CurrentApy />
                    <RewardAvailable />
                    <RewardRate />
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
      {transModalInfo && (
        <TransactionPopup
          mode={
            (activeTab === "lend" &&
              !depositTransactionHashRecieved &&
              !depositErrorMessage) ||
            (activeTab === "reward" &&
              !donateTransactionHashRecieved &&
              !donateErrorMessage) ||
            (activeTab === "redeem" &&
              !redeemTransactionHashReceived &&
              !redeemErrorMessage) ||
            (activeTab === "airdrop" &&
              !airdropTransactionHashReceived &&
              !airdropErrorMessage)
              ? "loading"
              : (activeTab === "lend" && depositTransactionHashRecieved) ||
                (activeTab === "reward" && donateTransactionHashRecieved) ||
                (activeTab === "redeem" && redeemTransactionHashReceived) ||
                (activeTab === "airdrop" && airdropTransactionHashReceived)
              ? "success"
              : "failure"
          }
          activeTab={activeTab}
          handleClose={() => handleTransModal(false)}
        />
      )}
      {alertInfo.show &&
        activeTab &&
        getErrorMessage() === "Transaction Failed" && (
          <AlertToast
            handleClose={() => {
              handleToast(false);
            }}
            now={progressValue}
            status="failed"
            message={getErrorMessage()}
            activeTab={activeTab}
          />
        )}
      {alertInfo.show &&
        activeTab &&
        ((activeTab === "lend" && isDepositSuccess && depositSuccessMessage) ||
          (activeTab === "reward" && donateSuccessMessage && donateSuccess) ||
          (activeTab === "redeem" && redeemSuccess && redeemSuccessMessage) ||
          (activeTab === "airdrop" &&
            airdropSuccess &&
            airdropSuccessMessage)) && (
          <AlertToast
            handleClose={() => {
              handleToast(false);
            }}
            now={progressValue}
            status="success"
            message={getSuccessMessage()}
            activeTab={activeTab}
          />
        )}
    </>
  );
};

export default withRouter(CommonCard);
