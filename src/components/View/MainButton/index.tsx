import { Wallet } from "components/Helpers/Types";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { FC, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
// import { depositApprove } from "state/action-creators";
import ConnectWalletModal from "../UI/ConnectWalletModal";
import TransactionPopup from "../UI/TransactionLoaderPopup/TransactionLoader";

interface Props {
  isEth: boolean;
  decimal: any;
  amount: string;
  actionName: string;
  handleAmount: Function;
}

interface WalletConnectModal {
  show: boolean;
}

interface TransModalInfo {
  show: boolean;
}

const MainButton: FC<Props> = ({
  isEth,
  amount,
  actionName,
  handleAmount,
  decimal,
}) => {
  const {
    walletConnected,
    accounts: address,
    currentProvider,
    handleWalletConnect,
  } = useWalletConnect();

  const [isApproving, setIsApproving] = useState<string | null>(
    localStorage.getItem("isApproving")
  );
  const [donateIsApproving, setDonateIsApproving] = useState<string | null>(
    localStorage.getItem("donateApproval")
  );

  function updateApproval() {
    setIsApproving(localStorage.getItem("isApproving"));
    setDonateIsApproving(localStorage.getItem("donateApproval"));
  }

  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  });

  const [transModalInfo, setTransModalInfo] = useState<TransModalInfo>({
    show: false,
  });

  const {
    isDepositApproved,
    depositLoading,
    depositErrorMessage,
    depositAllowanceLoading,
  } = useTypedSelector((state) => state.deposit);
  const {
    donateIsApproved,
    donateContractAddress,
    donateLoading,
    donateAllowanceLoading,
  } = useTypedSelector((state) => state.donate);
  const { airdropLoading } = useTypedSelector((state) => state.airdrop);
  const { redeemLoading } = useTypedSelector((state) => state.redeem);
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);
  const { assertAddress } = useTypedSelector((state) => state.pool);

  const {
    depositApprove,
    donateApprove,
    getAccountBalance,
    getPoolTokenBalance,
    getUserTokenBalance,
    getDonationContract,
  } = useActions();
  useEffect(() => {
    updateApproval();
  });
  useEffect(() => {
    if (address.length && currentProvider) {
      getDonationContract(currentProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, currentProvider]);
  const handleTokenBalance = () => {
    if (address.length && currentProvider) {
      getAccountBalance(address[0]);
      getUserTokenBalance(
        currentProvider,
        address[0],
        receipentAddress,
        decimal
      );
      getPoolTokenBalance(currentProvider, address[0], assertAddress);
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
      (isEth ||
        depositAllowanceLoading ||
        donateAllowanceLoading ||
        (actionName === "Deposit" && isDepositApproved === true) ||
        (actionName === "Reward" && donateIsApproved === true) ||
        (actionName !== "Deposit" && actionName !== "Reward"))
    ) {
      return (
        <button
          disabled={
            amount === "" ||
            depositLoading ||
            donateLoading ||
            redeemLoading ||
            airdropLoading ||
            depositAllowanceLoading ||
            donateAllowanceLoading
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
      !isEth &&
      ((actionName === "Deposit" &&
        (isDepositApproved === false || isDepositApproved === undefined)) ||
        (actionName === "Reward" &&
          (donateIsApproved === false || donateIsApproved === undefined))) &&
      (actionName === "Deposit" || actionName === "Reward")
    ) {
      // debugger;
      return (
        <button
          disabled={
            (actionName === "Deposit" && isApproving === "true") ||
            (actionName === "Reward" && donateIsApproving === "true")
          }
          className="btn btn-lg btn-custom-primary"
          onClick={() => {
            if (actionName === "Deposit") {
              setIsApproving("true");
              depositApprove(currentProvider, address[0], receipentAddress);
            } else if (actionName === "Reward") {
              setDonateIsApproving("true");
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
          {(actionName === "Deposit" && isApproving === "true") ||
          (actionName === "Reward" && donateIsApproving === "true") ? (
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
  function handleTransClose() {
    setTransModalInfo({
      show: false,
    });
  }
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
      {transModalInfo.show && (
        <TransactionPopup mode="success" handleClose={handleTransClose} />
      )}
    </>
  );
};

export default MainButton;
