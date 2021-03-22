import { useEffect, useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useDispatch } from "react-redux";
import { useActions } from "hooks/useActions";
import MainButton from "../MainButton";
// import ConnectWalletModal from "../UI/ConnectWalletModal";
import { Reciepent, UnilendFlashLoanCoreContract } from "ethereum/contracts";
import { useTypedSelector } from "hooks/useTypedSelector";
import { fetchTokenList } from "state/action-creators";
import icon from "assets/ethereum.png";
import web3 from "ethereum/web3";

interface props {
  activeTab: string | null;
}

interface ModalType {
  fieldName: string;
  show: boolean;
  currency: string;
  logo?: any;
}

const CommonCard = (props: props) => {
  const { activeTab } = props;
  const dispatch = useDispatch();

  const [amount, setAmount] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<ModalType>({
    fieldName: "",
    show: false,
    logo: icon,
    currency: "ETH",
  });
  const {
    handleDeposit,
    handleRedeem,
    handleDonate,
    checkAllowance,
    getDonationContract,
    donateAllowance,
    fetchTokenList,
  } = useActions();
  const { accounts, walletConnected, currentProvider } = useWalletConnect();
  const { isDepositApproved: isApproved, isDepositSuccess } = useTypedSelector(
    (state) => state.deposit
  );
  const { donateContractAddress, donateIsApproved } = useTypedSelector(
    (state) => state.donate
  );
  const { payload: tokenList } = useTypedSelector(
    (state) => state.tokenManage.tokenList
  );
  const { tokenGroupList } = useTypedSelector((state) => state.tokenManage);

  useEffect(() => {
    console.log(activeTab);
    let interval: any;
    if (
      activeTab === "deposit" &&
      currentProvider &&
      walletConnected &&
      !isApproved
    ) {
      // debugger;
      console.log("ALLOWANCE");
      checkAllowance(currentProvider, accounts[0]);
      interval = setInterval(() => {
        checkAllowance(currentProvider, accounts[0]);
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
          donateAllowance(currentProvider, accounts[0], donateContractAddress);
        }
      }, 9000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accounts,
    activeTab,
    currentProvider,
    walletConnected,
    isApproved,
    donateContractAddress,
    modalInfo.currency,
  ]);

  useEffect(() => {
    if (isDepositSuccess || donateIsApproved) {
      console.log("success");
      setAmount("");
    }
  }, [donateIsApproved, isDepositSuccess]);

  const handleAmount = async () => {
    switch (activeTab) {
      case "deposit":
        handleDeposit(currentProvider, amount, accounts[0], modalInfo.currency);
        break;
      case "redeem":
        handleRedeem(currentProvider, amount, accounts[0]);
        break;
      case "reward":
        handleDonate(currentProvider, amount, accounts[0]);
        break;
      case "airdrop":
        let trans = await web3.eth.sendTransaction({
          from: accounts[0],
          to: "0x186b707bB603c16295eF38EA27a081EBf5b65989",
          value: web3.utils.toWei(amount),
        });
        console.log(trans);
        break;
      default:
        break;
    }
  };

  const handleModal = (
    field: string,
    show: boolean,
    logo?: any,
    currency?: string
  ) => {
    console.log(modalInfo.currency);
    setModalInfo({
      fieldName: field,
      show,
      logo: logo ? logo : modalInfo.logo,
      currency: currency ? currency : modalInfo.currency,
    });
    if (tokenList.length === 0) fetchTokenList(tokenGroupList);
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
              selectLabel={``}
              selectValue={modalInfo.currency ? modalInfo.currency : ""}
              selectedLogo={modalInfo.logo ? modalInfo.logo : ""}
            />
            <MainButton
              isEth={modalInfo.currency === "ETH"}
              amount={amount}
              actionName={`${capitalize(activeTab)}`}
              handleAmount={() => handleAmount()}
            />
            {activeTab === "deposit" && (
              <div className="price_head">
                <div className="price_aa">
                  <div className="price-list">
                    Pool percentage <span className="price">-</span>
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
          handleCurrChange={(selectedcrr, selectedIcon) =>
            handleModal(activeTab, false, selectedIcon, selectedcrr)
          }
          handleClose={() => handleModal("", false)}
        />
      )}
    </>
  );
};

export default CommonCard;
