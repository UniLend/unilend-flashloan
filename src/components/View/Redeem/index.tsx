import useWalletConnect from "hooks/useWalletConnect";
import { FC, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Redeem: FC<Props> = (props) => {
  const [redeemAmount, setRedeemAmount] = useState<string>("");
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const { walletConnected, accounts, handleWalletConnect } = useWalletConnect();

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };
  const handleModelClose = () => {
    setShowModel(false);
  };
  const handleRedeemAmount = () => {};
  const handleMainButton = () => {
    if (accounts && accounts.length && walletConnected) {
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
    } else {
      return (
        <button
          className="btn btn-lg btn-custom-primary"
          onClick={handleWalletConnect}
        >
          Connect Wallet
        </button>
      );
    }
  };
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
        <div className="d-grid py-3">{handleMainButton()}</div>
        {curencySelectModel}
      </ContentCard>
    </>
  );
};

export default Redeem;
