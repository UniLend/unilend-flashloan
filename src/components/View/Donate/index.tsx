import useWalletConnect from "hooks/useWalletConnect";
import { FC, useState } from "react";
import MainButton from "../MainButton";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Donate: FC<Props> = (props) => {
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [donateAmount, setDonateAmount] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const { accounts } = useWalletConnect();

  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleCurrChange = (selectedField: any) => {
    setTokenType(selectedField.name);
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

  function handleDonate() {
    // console.log("STARTING");
    // var fullAmount = web3.utils.toWei(airDropAmount, "ether");
    // console.log(fullAmount);
    // FlashloanLBCore.methods.deposit(Reciepent, fullAmount).send({
    //   from: accounts[0],
    // });
  }

  return (
    <>
      <ContentCard title="Donate">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {
              setDonateAmount(e.target.value);
            }}
            handleModelOpen={() => handleModelOpen("airDropAmount")}
            fieldLabel="Amount"
            fieldValue={donateAmount}
            fieldType="number"
            selectLabel={``}
            selectValue={tokenType}
          />
          <MainButton
            amount={donateAmount}
            actionName="Donate"
            handleAmount={() => handleDonate()}
          />
        </div>
        {curencySelectModel}
      </ContentCard>
    </>
  );
};

export default Donate;
