import { FC, useState } from "react";
import MainButton from "../MainButton";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";
import useWalletConnect from "hooks/useWalletConnect";

interface Props {}

const Airdrop: FC<Props> = (props) => {
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [airDropAmount, setAirDropAmount] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const { accounts } = useWalletConnect();

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };
  function handleAirdropAmount() {
    // console.log("STARTING");
    // var fullAmount = web3.utils.toWei(airDropAmount, "ether");
    // console.log(fullAmount);
    // FlashloanLBCore.methods.deposit(Reciepent, fullAmount).send({
    //   from: accounts[0],
    // });
  }

  const handleCurrChange = (selectedField: any) => {
    setTokenType(selectedField.name);
    setShowModel(false);
  };

  let curencySelectModel = (
    <CurrencySelectModel
      currFieldName={currFieldName}
      handleCurrChange={(selectedField) => handleCurrChange(selectedField)}
      handleClose={handleModelClose}
    />
  );
  return (
    <>
      <ContentCard title="Airdrop">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {
              setAirDropAmount(e.target.value);
            }}
            handleModelOpen={() => handleModelOpen("airDropAmount")}
            fieldLabel="Amount"
            fieldValue={airDropAmount}
            fieldType="number"
            selectLabel={``}
            selectValue={tokenType}
          />
          <MainButton
            amount={airDropAmount}
            actionName="Airdrop"
            handleAmount={() => handleAirdropAmount()}
          />
        </div>
        {curencySelectModel}
      </ContentCard>
    </>
  );
};

export default Airdrop;
