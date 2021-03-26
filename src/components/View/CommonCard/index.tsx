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
  const {
    handleDeposit,
    handleRedeem,
    handleDonate,
    checkAllowance,
    getDonationContract,
    donateAllowance,
    fetchTokenList,
    getPool,
    getPoolTokenBalance,
    handleAirdrop,
    getAccountBalance,
    handleReciepent,
    setActiveCurrency,
  } = useActions();
  const {
    accounts,
    walletConnected,
    currentProvider,
    accountBalance,
    userTokenBalance,
    poolTokenBalance,
    getUserTokenBalance,
  } = useWalletConnect();
  const { isDepositApproved: isApproved, isDepositSuccess } = useTypedSelector(
    (state) => state.deposit
  );
  const { activeCurrency } = useTypedSelector((state) => state.settings);
  const { donateContractAddress, donateIsApproved } = useTypedSelector(
    (state) => state.donate
  );
  const [amount, setAmount] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<ModalType>({
    show: false,
  });
  const { tokenGroupList } = useTypedSelector((state) => state.tokenManage);
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { poolName, poolLoading, assertAddress } = useTypedSelector(
    (state) => state.pool
  );

  useEffect(() => {
    console.log(accountBalance);
    let interval: any;
    // if (
    //   activeTab === "deposit" &&
    //   currentProvider &&
    //   walletConnected &&
    //   !isApproved
    // ) {
    //   // debugger;
    //   console.log("ALLOWANCE");
    //   checkAllowance(currentProvider, accounts[0], receipentAddress);
    //   interval = setInterval(() => {
    //     checkAllowance(currentProvider, accounts[0], receipentAddress);
    //   }, 9000);
    // } else if (
    //   activeTab === "reward" &&
    //   currentProvider &&
    //   walletConnected &&
    //   !donateIsApproved
    // ) {
    //   getDonationContract(currentProvider);
    //   interval = setInterval(() => {
    //     console.log(donateContractAddress);
    //     if (donateContractAddress !== "") {
    //       donateAllowance(
    //         currentProvider,
    //         accounts[0],
    //         donateContractAddress,
    //         receipentAddress
    //       );
    //     }
    //   }, 9000);
    // }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accounts,
    activeTab,
    isApproved,
    donateContractAddress,
    activeCurrency.symbol,
  ]);
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
    fetchTokenList(tokenGroupList);
    setModalInfo({
      ...modalInfo,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected]);
  const handleTokenBalance = () => {
    if (accounts.length && currentProvider) {
      getAccountBalance(accounts[0]);
      getPoolTokenBalance(currentProvider, accounts[0], assertAddress);
      getUserTokenBalance(
        currentProvider,
        accounts[0],
        receipentAddress,
        activeCurrency.decimals
      );
    }
  };
  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      if (accounts.length && walletConnected) {
        console.log("handlingBalance");
        handleTokenBalance();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [accounts]);
  useEffect(() => {
    console.log("Pooling");
    if (walletConnected) {
      getPool(activeCurrency.address, currentProvider, accounts[0]);
    }
    if (isDepositSuccess || donateIsApproved) {
      setAmount("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    walletConnected,
    donateIsApproved,
    isDepositSuccess,
    accounts,
    currentProvider,
    activeCurrency,
  ]);
  useEffect(() => {
    handleTokenBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentProvider,
    accounts,
    assertAddress,
    activeCurrency,
    receipentAddress,
    isDepositSuccess,
  ]);
  useEffect(() => {
    setAmount("");
  }, [activeTab]);
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
        handleTokenBalance();

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
            {activeTab === "deposit" &&
              (isApproved || activeCurrency.symbol === "ETH") &&
              poolTokenBalance && (
                <div className="price_head">
                  <div className="price_aa">
                    {/* <div className="price-list">
                    Pool percentage <span className="price">-</span>
                  </div> */}
                    <div className="price-list">
                      Pool Balance{" "}
                      {!poolLoading && poolName ? `(${poolName})` : ""}
                      <span className="price">{`${
                        walletConnected && !poolLoading ? poolTokenBalance : "-"
                      }`}</span>
                    </div>
                  </div>
                </div>
              )}
            {activeTab === "redeem" && poolTokenBalance && (
              <div className="price_head">
                <div className="price_aa">
                  <div className="price-list">
                    Pool Balance{" "}
                    {!poolLoading && poolName ? `(${poolName})` : ""}
                    <span className="price">{`${
                      walletConnected && !poolLoading ? poolTokenBalance : "-"
                    }`}</span>
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
            await setActiveCurrency(selectedAddress);
            await handleModal(false);
            console.log(selectedAddress.address);
            await getPool(
              selectedAddress.address,
              currentProvider,
              accounts[0]
            );
            await handleReciepent(selectedAddress.address);
            await handleTokenBalance();
          }}
          handleClose={() => handleModal(false)}
        />
      )}
    </>
  );
};

export default CommonCard;
