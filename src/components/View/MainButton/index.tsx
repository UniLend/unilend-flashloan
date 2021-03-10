import useWalletConnect from "hooks/useWalletConnect";
import { FC, useState } from "react";
import ConnectWalletModal from "../UI/ConnectWalletModal";

interface Props {
  amount: string;
  actionName: string;
  handleAmount: Function;
}

interface WalletConnectModal {
  show: boolean;
}

const MainButton: FC<Props> = ({ amount, actionName, handleAmount }) => {
  const {
    walletConnected,
    accounts: address,
    handleWalletConnect,
  } = useWalletConnect();
  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  });
  function handleMainButton() {
    if (address && address.length && walletConnected) {
      return (
        <button
          disabled={amount === ""}
          className="btn btn-lg btn-custom-primary"
          onClick={() => handleAmount()}
          type="button"
        >
          {actionName}
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
    setWalletModalInfo({ show: true });
  }
  return (
    <>
      <div className="d-grid py-3">{handleMainButton()}</div>

      {walletModalInfo.show && !walletConnected && (
        <ConnectWalletModal
          handleClose={() => setWalletModalInfo({ show: false })}
          handleWalletConnect={() => handleWalletConnect()}
        />
      )}
    </>
  );
};

export default MainButton;
