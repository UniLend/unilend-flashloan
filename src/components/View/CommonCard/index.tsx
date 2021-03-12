import React, { useState } from "react";
import useWalletConnect from "hooks/useWalletConnect";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";
import { capitalize } from "components/Helpers";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import { useActions } from "hooks/useActions";
import MainButton from "../MainButton";
import ConnectWalletModal from "../UI/ConnectWalletModal";
import { Reciepent } from "ethereum/contracts";

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
  const { handleDeposit, handleRedeem, handleDonate } = useActions();
  const { accounts, currentProvider, handleWalletConnect } = useWalletConnect();

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
        var fullAmount = (currentProvider as any).utils.toWei(amount, "ether");
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
  const walletConnect = () => {
    handleWalletConnect();
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
