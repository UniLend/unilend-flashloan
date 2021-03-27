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


   const {
    accounts,
    walletConnected,
    currentProvider,
    accountBalance,
    userTokenBalance,
    poolTokenBalance,
    getUserTokenBalance,
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
  } = useActions();
  
 
  const { isDepositApproved: isApproved, isDepositSuccess } = useTypedSelector(
    (state) => state.deposit
  );
  const { activeCurrency } = useTypedSelector((state) => state.settings);
  const { donateContractAddress, donateIsApproved } = useTypedSelector(
    (state) => state.donate
  );
  const {redeemSuccess} = useTypedSelector((state) => state.redeem);
  const {airdropSuccess} = useTypedSelector((state) => state.airdrop)
  const { tokenGroupList } = useTypedSelector((state) => state.tokenManage);
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { poolName, poolLoading, assertAddress } = useTypedSelector(
    (state) => state.pool
  );


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

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      if (accounts.length && walletConnected) {
        console.log("handlingBalance");
        handleTokenBalance();
      }
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts,activeTab,activeCurrency,receipentAddress, assertAddress]);
  useEffect(() => {
    console.log("Pooling");
    if (walletConnected) {
      getPool(activeCurrency.address, currentProvider, accounts[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    walletConnected,
    
    accounts,
    currentProvider,
    activeCurrency,
  ]);
  useEffect(() => {
      setAmount("");
  },[activeTab])
  useEffect(() => {
    
    if (isDepositSuccess || donateIsApproved || redeemSuccess || airdropSuccess) {
      setAmount("");
    }
  }, [activeTab,donateIsApproved,
    isDepositSuccess,
    redeemSuccess,
    airdropSuccess,]);
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
            await getPool(
              selectedAddress.address,
              currentProvider,
              accounts[0]
            );
            await handleReciepent(selectedAddress.address);
          }}
          handleClose={() => handleModal(false)}
        />
      )}
    </>
  );
};

export default CommonCard;
