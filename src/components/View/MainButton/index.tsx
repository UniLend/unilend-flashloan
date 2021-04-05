import { Wallet } from "components/Helpers/Types";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { FC, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
// import { depositApprove } from "state/action-creators";
import ConnectWalletModal from "../UI/ConnectWalletModal";

interface Props {
  isEth: boolean;
  decimal: any;
  amount: string;
  actionName: string;
  handleAmount: Function;
  isChecked: boolean;
}

interface WalletConnectModal {
  show: boolean;
}

// interface TransModalInfo {
//   show: boolean;
// }

const MainButton: FC<Props> = ({
  isEth,
  amount,
  actionName,
  handleAmount,
  decimal,
  isChecked,
}) => {
  const {
    walletConnected,
    accounts: address,
    currentProvider,
    poolTokenBalance,
    // userTokenBalance,
    fullUserTokenBalance,
    fullPoolTokenBalance,
    handleWalletConnect,
  } = useWalletConnect();

  // const [isApproving, setIsApproving] = useState<string | null>(
  //   localStorage.getItem("isApproving")
  // );
  // const [donateIsApproving, setDonateIsApproving] = useState<string | null>(
  //   localStorage.getItem("donateApproval")
  // );

  // function updateApproval() {
  //   setIsApproving(localStorage.getItem("isApproving"));
  //   setDonateIsApproving(localStorage.getItem("donateApproval"));
  // }

  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  });

  // const [transModalInfo, setTransModalInfo] = useState<TransModalInfo>({
  //   show: false,
  // });

  const {
    isDepositApproved,
    depositLoading,
    depositErrorMessage,
    depositAllowanceLoading,
    depositIsApproving,
  } = useTypedSelector((state) => state.deposit);
  const {
    donateIsApproved,
    donateContractAddress,
    donateLoading,
    donateAllowanceLoading,
    donateApproving,
  } = useTypedSelector((state) => state.donate);
  const { airdropLoading } = useTypedSelector((state) => state.airdrop);
  const { redeemLoading } = useTypedSelector((state) => state.redeem);
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { assertAddress } = useTypedSelector((state) => state.pool);
  const { activeTab, activeCurrency } = useTypedSelector(
    (state) => state.settings
  );
  const {
    depositApprove,
    donateApprove,
    getAccountBalance,
    getPoolTokenBalance,
    getUserTokenBalance,
  } = useActions();
  // useEffect(() => {
  //   updateApproval();
  // });

  const handleTokenBalance = () => {
    if (address.length && currentProvider) {
      getAccountBalance(address[0]);
      getUserTokenBalance(
        currentProvider,
        address[0],
        receipentAddress,
        assertAddress,
        decimal
      );
      getPoolTokenBalance(
        currentProvider,
        address[0],
        assertAddress,
        receipentAddress,
        decimal
      );
    }
  };
  useEffect(() => {
    handleTokenBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositLoading, donateLoading, redeemLoading, airdropLoading]);
  function handleMainButton() {
    if (
      address &&
      address.length &&
      walletConnected &&
      (activeCurrency.symbol === "Select Token" ||
        depositAllowanceLoading ||
        donateAllowanceLoading ||
        (actionName === "Deposit" && isDepositApproved === true) ||
        (actionName === "Reward" && donateIsApproved === true) ||
        (actionName !== "Deposit" && actionName !== "Reward"))
    ) {
      return (
        <button
          // disabled={
          //   amount === "" ||
          //   activeCurrency.symbol === "Select Token" ||
          //   depositLoading ||
          //   donateLoading ||
          //   redeemLoading ||
          //   airdropLoading ||
          //   depositAllowanceLoading ||
          //   donateAllowanceLoading ||
          //   !isChecked ||
          //   (activeTab === "redeem" && poolTokenBalance === 0)
          // }
          disabled={
            amount === "" ||
            parseFloat(amount) <= 0 ||
            // parseFloat(amount) + poolTokenBalance >= 1_000_000 ||
            activeCurrency.symbol === "Select Token" ||
            depositLoading ||
            donateLoading ||
            redeemLoading ||
            airdropLoading ||
            depositAllowanceLoading ||
            donateAllowanceLoading ||
            (activeTab === "reward" &&
              (!isChecked ||
                parseFloat(amount) > parseFloat(fullUserTokenBalance))) ||
            (activeTab === "lend" &&
              parseFloat(amount) > parseFloat(fullUserTokenBalance)) ||
            (activeTab === "airdrop" &&
              (!isChecked ||
                parseFloat(amount) > parseFloat(fullUserTokenBalance))) ||
            (activeTab === "redeem" &&
              (poolTokenBalance === 0 ||
                parseFloat(amount) > parseFloat(fullPoolTokenBalance)))
          }
          className="btn btn-lg btn-custom-primary"
          onClick={() => handleAmount()}
          type="button"
        >
          <div>
            {actionName}
            {(depositLoading ||
              donateLoading ||
              redeemLoading ||
              airdropLoading ||
              depositAllowanceLoading ||
              donateAllowanceLoading) && (
              <div className="spinner-border approve-loader" role="status">
                <span className="sr-only">Approving...</span>
              </div>
            )}
          </div>
        </button>
      );
    } else if (
      address &&
      address.length &&
      walletConnected &&
      !depositAllowanceLoading &&
      !donateAllowanceLoading &&
      ((activeCurrency.symbol !== "Select Token" &&
        actionName === "Deposit" &&
        (isDepositApproved === false || isDepositApproved === undefined)) ||
        (actionName === "Reward" &&
          (donateIsApproved === false || donateIsApproved === undefined))) &&
      (actionName === "Deposit" || actionName === "Reward")
    ) {
      // debugger;
      return (
        <button
          disabled={
            (actionName === "Deposit" && depositIsApproving === true) ||
            (actionName === "Reward" && donateApproving === true)
          }
          className="btn btn-lg btn-custom-primary"
          onClick={() => {
            if (actionName === "Deposit") {
              depositApprove(currentProvider, address[0], receipentAddress);
            } else if (actionName === "Reward") {
              donateApprove(
                currentProvider,
                address[0],
                donateContractAddress,
                receipentAddress
              );
            }
          }}
          type="button"
        >
          {(actionName === "Deposit" && depositIsApproving === true) ||
          (actionName === "Reward" && donateApproving === true) ? (
            <div>
              Approving
              <div className="spinner-border approve-loader" role="status">
                <span className="sr-only">Approving...</span>
              </div>
            </div>
          ) : (
            "Approve"
          )}
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-lg btn-custom-primary"
          onClick={walletConnect}
        >
          Connect Wallet
        </button>
      );
    }
  }

  function walletConnect() {
    setWalletModalInfo({
      show: true,
    });
  }

  // function handleTransClose() {
  //   setTransModalInfo({
  //     show: false,
  //   });
  // }

  return (
    <>
      <div className="d-grid py-3">{handleMainButton()}</div>

      {walletModalInfo.show && !walletConnected && (
        <ConnectWalletModal
          handleClose={() => setWalletModalInfo({ show: false })}
          handleWalletConnect={(wallet: Wallet) => handleWalletConnect(wallet)}
        />
      )}
      {depositErrorMessage !== "" && (
        <Alert variant="danger">{depositErrorMessage}</Alert>
      )}
    </>
  );
};

export default MainButton;
