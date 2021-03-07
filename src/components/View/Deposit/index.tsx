import { Reciepent } from "ethereum/contracts";
import { FlashloanLBCore } from "ethereum/contracts/FlashloanLB";
import web3 from "ethereum/web3";
import { useActions } from "hooks/useActions";
import useWalletConnect from "hooks/useWalletConnect";
import { FC, useState } from "react";
import MainButton from "../MainButton";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Deposit: FC<Props> = (props) => {
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<any>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const { handleDeposit } = useActions();
  const { accounts } = useWalletConnect();

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };
  const handleModelClose = () => {
    setShowModel(false);
  };
  function handleCurrChange(selectedField: any) {
    setTokenType(selectedField.name);
    setShowModel(false);
  }

  function handleDepositAmount() {
    console.log("STARTING");
    handleDeposit(depositAmount, accounts[0]);
  }

  let curencySelectModel = (
    <CurrencySelectModel
      currFieldName={currFieldName}
      handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
      handleClose={handleModelClose}
    />
  );

  return (
    <ContentCard title="Deposit">
      <div className="swap-root">
        <FieldCard
          onF1Change={(e: any) => {
            setDepositAmount(e.target.value);
          }}
          handleModelOpen={() => handleModelOpen("depositAmount")}
          fieldLabel="Amount"
          fieldValue={depositAmount}
          fieldType="text"
          selectLabel={``}
          selectValue={tokenType}
        />
        <MainButton
          amount={depositAmount}
          actionName="Deposit"
          handleAmount={() => handleDepositAmount()}
        />
        <div className="price_head">
          <div className="price_aa">
            <div className="price-list">
              Pool percentage <span className="price">-</span>
            </div>
          </div>
        </div>
      </div>
      {curencySelectModel}
    </ContentCard>
  );
};

export default Deposit;
