import { Wallet } from "components/Helpers/Types";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import useWalletConnect from "hooks/useWalletConnect";
import { FC, useEffect, useState } from "react";
// import { depositApprove } from "state/action-creators";
import ConnectWalletModal from "../UI/ConnectWalletModal";
import TransactionPopup from "../UI/TransactionLoaderPopup/TransactionLoader";

interface Props {
  isEth: boolean;
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

const MainButton: FC<Props> = ({ isEth, amount, actionName, handleAmount }) => {
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

  const { isDepositApproved, depositLoading } = useTypedSelector(
    (state) => state.deposit
  );
  const {
    donateIsApproved,
    donateContractAddress,
    donateLoading,
  } = useTypedSelector((state) => state.donate);
  const { airdropLoading } = useTypedSelector((state) => state.airdrop);
  const { redeemLoading } = useTypedSelector((state) => state.redeem);
  const { receipentAddress } = useTypedSelector((state) => state.ethereum);

  const {
    depositApprove,
    donateApprove,
    getPoolTokenBalance,
    getUserTokenBalance,
  } = useActions();
  useEffect(() => {
    updateApproval();
  });
  const handleTokenBalance = () => {
    // getAccountBalance(currentProvider);
    getUserTokenBalance(currentProvider, address[0], receipentAddress);
    getPoolTokenBalance(currentProvider, address[0]);
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
            airdropLoading
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
              airdropLoading) && (
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
      {transModalInfo.show && (
        <TransactionPopup mode="success" handleClose={handleTransClose} />
      )}
    </>
  );
};

export default MainButton;
