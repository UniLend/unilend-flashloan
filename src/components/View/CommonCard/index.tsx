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
import icon from "assets/ethereum.png";
import { Reciepent } from "ethereum/contracts";

interface props {
  activeTab: string | null;
}

interface ModalType {
  fieldName: string;
  show: boolean;
  currency: string;
  logo: any;
  address: any;
  decimal: any;
}

const CommonCard = (props: props) => {
  const { activeTab } = props;
  const [decimalNo, setDecimalNo] = useState<any>(18);
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
  const { donateContractAddress, donateIsApproved } = useTypedSelector(
    (state) => state.donate
  );
  const [amount, setAmount] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<ModalType>({
    fieldName: "",
    show: false,
    logo: icon,
    currency: "ETH",
    address: Reciepent,
    decimal: 18,
  });
  const { tokenGroupList } = useTypedSelector((state) => state.tokenManage);
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { poolName, assertAddress } = useTypedSelector((state) => state.pool);
  useEffect(() => {
    console.log(accountBalance);
    let interval: any;
    if (
      activeTab === "deposit" &&
      currentProvider &&
      walletConnected &&
      !isApproved
    ) {
      // debugger;
      console.log("ALLOWANCE");
      checkAllowance(currentProvider, accounts[0], receipentAddress);
      interval = setInterval(() => {
        checkAllowance(currentProvider, accounts[0], receipentAddress);
      }, 9000);
    } else if (
      activeTab === "reward" &&
      currentProvider &&
      walletConnected &&
      !donateIsApproved
    ) {
      getDonationContract(currentProvider);
      interval = setInterval(() => {
        console.log(donateContractAddress);
        if (donateContractAddress !== "") {
          donateAllowance(
            currentProvider,
            accounts[0],
            donateContractAddress,
            receipentAddress
          );
        }
      }, 9000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accounts,
    activeTab,
    isApproved,
    donateContractAddress,
    modalInfo.currency,
  ]);

  useEffect(() => {
    fetchTokenList(tokenGroupList);
    setModalInfo({
      ...modalInfo,
      logo: icon,
      currency: "ETH",
      address: Reciepent,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected]);
  const handleTokenBalance = () => {
    getAccountBalance(accounts[0]);
    getUserTokenBalance(
      currentProvider,
      accounts[0],
      receipentAddress,
      decimalNo
    );
    getPoolTokenBalance(currentProvider, accounts[0], assertAddress);
  };
  useEffect(() => {
    console.log(receipentAddress);
    if (walletConnected) {
      handleTokenBalance();
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
    receipentAddress,
  ]);

  const handleAmount = async () => {
    switch (activeTab) {
      case "deposit":
        console.log(modalInfo);
        handleDeposit(
          currentProvider,
          amount,
          accounts[0],
          modalInfo.currency,
          receipentAddress,
          modalInfo.currency === "ETH",
          modalInfo.decimal
        );
        break;
      case "redeem":
        handleRedeem(currentProvider, amount, accounts[0], receipentAddress);

        break;
      case "reward":
        handleDonate(currentProvider, amount, accounts[0], receipentAddress);
        break;
      case "airdrop":
        handleAirdrop(currentProvider, amount, accounts[0], receipentAddress);
        break;
      default:
        break;
    }
  };

  const handleModal = (
    field: string,
    show: boolean,
    logo?: any,
    currency?: string,
    address?: string,
    decimal?: any
  ) => {
    console.log(modalInfo.currency);
    setModalInfo({
      fieldName: field,
      show,
      logo: logo ? logo : modalInfo.logo,
      currency: currency ? currency : modalInfo.currency,
      address: address ? address : modalInfo.address,
      decimal: decimal ? decimal : modalInfo.decimal,
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
              handleModelOpen={() => handleModal(activeTab, true)}
              fieldLabel="Amount"
              fieldValue={amount}
              fieldType="text"
              selectLabel={
                modalInfo.currency === "ETH" ? accountBalance : userTokenBalance
              }
              selectValue={modalInfo.currency ? modalInfo.currency : ""}
              selectedLogo={modalInfo.logo ? modalInfo.logo : ""}
            />
            <MainButton
              isEth={modalInfo.currency === "ETH"}
              decimal={decimalNo}
              amount={amount}
              actionName={`${capitalize(activeTab)}`}
              handleAmount={() => handleAmount()}
            />
            {activeTab === "deposit" &&
              (isApproved || modalInfo.currency === "ETH") &&
              poolTokenBalance && (
                <div className="price_head">
                  <div className="price_aa">
                    {/* <div className="price-list">
                    Pool percentage <span className="price">-</span>
                  </div> */}
                    <div className="price-list">
                      Pool Balance ( {poolName ? poolName : ""}){" "}
                      <span className="price">{`${
                        walletConnected ? poolTokenBalance : "-"
                      }`}</span>
                    </div>
                  </div>
                </div>
              )}
            {activeTab === "redeem" && poolTokenBalance && (
              <div className="price_head">
                <div className="price_aa">
                  <div className="price-list">
                    Pool Balance( {poolName ? poolName : ""}){" "}
                    <span className="price">{`${
                      walletConnected ? poolTokenBalance : "-"
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
          currFieldName={modalInfo.fieldName}
          handleCurrChange={async (
            selectedcrr,
            selectedIcon,
            address,
            decimal
          ) => {
            setDecimalNo(decimal);
            await getPool(address, currentProvider, accounts[0]);
            await handleReciepent(address);
            await handleTokenBalance();
            await handleModal(
              activeTab,
              false,
              selectedIcon,
              selectedcrr,
              address,
              decimal
            );
          }}
          handleClose={() => handleModal("", false)}
        />
      )}
    </>
  );
};

export default CommonCard;
