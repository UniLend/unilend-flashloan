import { FC } from "react";
import { ProgressBar, Toast } from "react-bootstrap";
import "./index.scss";
import TickIcon from "assets/tick.svg";
import ErrorIcon from "assets/error.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import { getTransactionHashUrl } from "components/Helpers";
interface Props {
  handleClose: () => void;
  message: string;
  status: string;
  now: any;
  activeTab: any;
}

const AlertToast: FC<Props> = ({
  handleClose,
  message,
  now,
  status,
  activeTab,
}) => {
  const { activeNetWork } = useTypedSelector((state) => state.connectWallet);
  const { depositTransactionHash } = useTypedSelector((state) => state.deposit);
  const { donateTransactionHash } = useTypedSelector((state) => state.donate);
  const { redeemTransactionHash } = useTypedSelector((state) => state.redeem);
  const { airdropTransactionHash } = useTypedSelector((state) => state.airdrop);

  const getActiveHash = () => {
    switch (activeTab) {
      case "lend":
        return depositTransactionHash;
      case "reward":
        return donateTransactionHash;
      case "redeem":
        return redeemTransactionHash;
      case "airdrop":
        return airdropTransactionHash;
    }
  };

  return (
    <>
      <Toast
        className="toast-custom"
        style={{
          position: "absolute",
          top: 140,
          right: 18,
          borderRadius: "6px",
        }}
        onClose={handleClose}
        delay={3000}
      >
        <Toast.Header className="toast-custom-header float-right"></Toast.Header>
        <Toast.Body className="toast-custom-body">
          {status === "failed" ? (
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
              }}
            >
              <img
                width="25px"
                height="25px"
                src={ErrorIcon}
                alt=""
                className="error"
              />
              <div
                className=""
                style={{
                  marginLeft: 25,
                }}
              >
                <strong className="mr-auto ">{message}</strong>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={getTransactionHashUrl(activeNetWork, getActiveHash())}
                >
                  <div className="etherscan-link">View on Explorer</div>
                </a>
              </div>
              {/* {headerTitle ? 'Deposit Failed':''} */}
            </div>
          ) : (
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
              }}
            >
              <img src={TickIcon} alt="" className="error" />
              <div
                className=""
                style={{
                  marginLeft: 25,
                }}
              >
                <strong className="mr-auto ">{message}</strong>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={getTransactionHashUrl(activeNetWork, getActiveHash())}
                >
                  <div className="etherscan-link">View on Explorer</div>
                </a>
              </div>
            </div>
          )}
          <ProgressBar now={now} srOnly />
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AlertToast;
