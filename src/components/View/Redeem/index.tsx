import { FC, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Redeem: FC<Props> = (props) => {
  const [redeemAmount, setRedeemAmount] = useState<string>("");
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
  const handleMainButton = () => {
    return (
      <button
        disabled={redeemAmount === ""}
        className="btn btn-lg btn-custom-primary"
        onClick={handleRedeemAmount}
        type="button"
      >
        Redeem
      </button>
    );
  };
  return (
    <>
      <ContentCard title="Redeem">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {}}
            handleModelOpen={() => handleModelOpen("depositAmount")}
            fieldLabel="Amount"
            fieldValue={redeemAmount}
            fieldType="text"
            selectLabel={``}
            selectValue={tokenType}
          />
          <div className="d-grid py-3">{handleMainButton()}</div>
        </div>
      </ContentCard>
    </>
  );
};

export default Redeem;
