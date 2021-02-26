import { FC, useState } from "react";
import MainButton from "../MainButton";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Redeem: FC<Props> = (props) => {
  const [redeemAmount] = useState<string>("");
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleRedeemAmount = () => {};

  const handleCurrChange = (selectedField: any) => {
    switch (currFieldName) {
      case "redeemAmount":
        setTokenType(selectedField.name);
        break;
      default:
        break;
    }
    setShowModel(false);
  };
  let curencySelectModel = (
    <CurrencySelectModel
      currFieldName={currFieldName}
      handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
      show={showModel}
      handleClose={handleModelClose}
    />
  );
  return (
    <>
      <ContentCard title="Redeem">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {}}
            handleModelOpen={() => handleModelOpen("redeemAmount")}
            fieldLabel="Amount"
            fieldValue={redeemAmount}
            fieldType="text"
            selectLabel={``}
            selectValue={tokenType}
          />
        </div>
        <MainButton
          amount={redeemAmount}
          actionName="Redeem"
          handleAmount={() => handleRedeemAmount}
        />
        {curencySelectModel}
      </ContentCard>
    </>
  );
};

export default Redeem;
