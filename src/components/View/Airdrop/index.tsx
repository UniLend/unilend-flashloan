import useWalletConnect from "hooks/useWalletConnect";
import { FC, useState } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Airdrop: FC<Props> = (props) => {
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [airDropAmount] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const { walletConnected, accounts, handleWalletConnect } = useWalletConnect();

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };
  const handleConnectWallet = async () => {
    handleWalletConnect();
  };
  const handleModelClose = () => {
    setShowModel(false);
  };
  function handleAirdropAmount() {}

  const handleCurrChange = (selectedField: any) => {
    switch (currFieldName) {
      case "airDropAmount":
        setTokenType(selectedField.name);
        break;
      default:
        break;
    }
    setShowModel(false);
  };
  const handleMainButton = () => {
    if (accounts && accounts.length && walletConnected) {
      return (
        <button
          disabled={airDropAmount === ""}
          className="btn btn-lg btn-custom-primary"
          onClick={handleAirdropAmount}
          type="button"
        >
          Airdrop
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-lg btn-custom-primary"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      );
    }
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
      <ContentCard title="Airdrop">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {}}
            handleModelOpen={() => handleModelOpen("airDropAmount")}
            fieldLabel="Amount"
            fieldValue={airDropAmount}
            fieldType="number"
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

export default Airdrop;
