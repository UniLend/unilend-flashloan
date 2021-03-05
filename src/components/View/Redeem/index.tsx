import { useActions } from "hooks/useActions";
import useWalletConnect from "hooks/useWalletConnect";
import { FC, useState } from "react";
import MainButton from "../MainButton";
import ContentCard from "../UI/ContentCard/ContentCard";
import CurrencySelectModel from "../UI/CurrencySelectModel/CurrencySelectModel";
import FieldCard from "../UI/FieldsCard/FieldCard";

interface Props {}

const Redeem: FC<Props> = (props) => {
  const [redeemAmount, setRedeemAmount] = useState<string>("");
  const [tokenType, setTokenType] = useState<string>("ht");
  const [currFieldName, setCurrFieldName] = useState<string>("");
  const [showModel, setShowModel] = useState<boolean>(false);
  const { accounts } = useWalletConnect();
  const { handleRedeem } = useActions();
  const handleModelOpen = (fieldName: string) => {
    setCurrFieldName(fieldName);
    setShowModel(true);
  };

  const handleModelClose = () => {
    setShowModel(false);
  };

  const handleRedeemAmount = () => {
    handleRedeem(redeemAmount, accounts[0]);
    // donate contract

    //  const address = FlashloanLBCore.methods.getDonationContract().call()
    //    UnilendFDonation.methods.donate(address, fullAmount).send({
    //    from: accounts[0]
    //  })
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
  return (
    <>
      <ContentCard title="Redeem">
        <div className="swap-root">
          <FieldCard
            onF1Change={(e: any) => {
              setRedeemAmount(e.target.value);
            }}
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
          handleAmount={() => handleRedeemAmount()}
        />
        {curencySelectModel}
      </ContentCard>
    </>
  );
};

export default Redeem;
