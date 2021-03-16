import { useEffect, useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "hooks/useActions";
import MainButton from "../MainButton";
// import ConnectWalletModal from "../UI/ConnectWalletModal";
import { Reciepent } from "ethereum/contracts";
import { useTypedSelector } from "hooks/useTypedSelector";

interface props {
  activeTab: string | null;
}

interface ModalType {
  fieldName: string;
  show: boolean;
  currency?: string;
}

const CommonCard = (props: props) => {
  const { activeTab } = props;

  const [amount, setAmount] = useState<string>("");
  const [modalInfo, setModalInfo] = useState<ModalType>({
    fieldName: "",
    show: false,
    currency: "ht",
  });
  const {
    handleDeposit,
    handleRedeem,
    handleDonate,
    checkAllowance,
    getDonationContract,
    donateAllowance,
  } = useActions();
  const { accounts, walletConnected, currentProvider } = useWalletConnect();
  const { isDepositApproved: isApproved } = useTypedSelector(
    (state) => state.deposit
  );
  const { donateContractAddress, donateIsApproved } = useTypedSelector(
    (state) => state.donate
  );

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
  ]);

  const handleAmount = async () => {
    switch (activeTab) {
      case "deposit":
        handleDeposit(currentProvider, amount, accounts[0]);
        break;
      case "redeem":
        handleRedeem(currentProvider, amount, accounts[0]);
        break;
      case "reward":
        handleDonate(currentProvider, amount, accounts[0]);
        break;
      case "airdrop":
        // var fullAmount = (currentProvider as any).utils.toWei(amount, "ether");
        const transactionParameters = {
          gasPrice: "0x9184e72a000", // customizable by user during MetaMask confirmation.
          gas: "0x76c0", // customizable by user during MetaMask confirmation.
          to: Reciepent, // Required except during contract publications.
          from: (window as any).ethereum.selectedAddress, // must match user's active address.
          value: "0x9184e72a",
          data:
            "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
        };
        const txHash = await (window as any).ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });
        if (txHash) {
        }
        break;
      default:
        break;
    }
    setAmount("");
  };

  const handleModal = (field: string, show: boolean, currency?: string) => {
    setModalInfo({
      fieldName: field,
      show,
      currency: currency ? currency : modalInfo.currency,
    });
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
            />
            <MainButton
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
          handleCurrChange={(selectedcrr) =>
            handleModal(activeTab, false, selectedcrr)
          }
          handleClose={() => handleModal("", false)}
        />
      )}
    </>
  );
};

export default CommonCard;
