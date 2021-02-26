import { FC, useState } from "react";
import MainButton from "../MainButton";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Deposit: FC<Props> = (props) => {
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [depositAmount] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };
  const handleModelClose = () => {
    setShowModel(false);
  };
  const handleCurrChange = (selectedField: any) => {
    switch (currFieldName) {
      case "depositAmount":
        setTokenType(selectedField.name);
        break;
      default:
        break;
    }
    setShowModel(false);
  };
  function handleDepositAmount() {}

  let curencySelectModel = (
    <CurrencySelectModel
      currFieldName={currFieldName}
      handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
      show={showModel}
      handleClose={handleModelClose}
    />
  );

  return (
    <ContentCard title="Deposit">
      <div className="swap-root">
        <FieldCard
          onF1Change={(e: any) => {}}
          handleModelOpen={() => handleModelOpen("depositAmount")}
          fieldLabel="Amount"
          fieldValue={depositAmount}
          fieldType="number"
          selectLabel={``}
          selectValue={tokenType}
        />
        <MainButton
          amount={depositAmount}
          actionName="Airdrop"
          handleAmount={() => handleDepositAmount}
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
