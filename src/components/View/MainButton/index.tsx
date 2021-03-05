import useWalletConnect from "hooks/useWalletConnect";
import { FC } from "react";

interface Props {
  amount: string;
  actionName: string;
  handleAmount: Function;
}

const MainButton: FC<Props> = ({ amount, actionName, handleAmount }) => {
  const { walletConnected, accounts, handleWalletConnect } = useWalletConnect();

  function handleMainButton() {
    if (accounts && accounts.length && walletConnected) {
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
          onClick={handleWalletConnect}
        >
          Connect Wallet
        </button>
      );
    }
  }

  return (
    <>
      <div className="d-grid py-3">{handleMainButton()}</div>
    </>
  );
};

export default MainButton;
