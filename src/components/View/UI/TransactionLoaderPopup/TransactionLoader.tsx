import { FC } from "react";
import { Modal } from "react-bootstrap";
import "./TransactionLoader.scss";
import { useTypedSelector } from "hooks/useTypedSelector";
import Loader from "react-loader-spinner";
import Alert from "assets/error.svg";
import { getTransactionHashUrl } from "components/Helpers";
// import ArrowUp from "assets/arrowup.png";
interface Props {
  handleClose: () => void;
  mode: string;
  handleSwitch?: string;
  activeTab: any;
}

const TransactionPopup: FC<Props> = ({
  handleClose,
  mode,
  handleSwitch,
  activeTab,
}) => {
  const { theme } = useTypedSelector((state) => state.settings);
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
  function transactionMethods() {
    switch (mode) {
      case "success":
        return (
          <>
            <Modal
              className={`modal-theme ${theme === "dark" ? "dark" : "light"}`}
              animation={false}
              size="sm"
              show={true}
              onHide={handleClose}
            >
              <Modal.Header className="modal-header-custom" closeButton>
                <Modal.Title className="model-title-custom"></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  className="modal-body-info"
                  style={{ padding: "1rem 2rem" }}
                >
                  <div className="pb-5 pt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="90"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2a6def"
                      style={{
                        strokeWidth: "0.5",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                      }}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="16 12 12 8 8 12"></polyline>
                      <line x1="12" y1="16" x2="12" y2="8"></line>
                    </svg>
                  </div>

                  <div className="transaction-details">
                    <div className=" transaction-status ">
                      Transaction Submitted
                    </div>
                    {getActiveHash() ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={getTransactionHashUrl(
                          activeNetWork,
                          getActiveHash()
                        )}
                        className="sc-jKJlTe cEMwVc"
                      >
                        <div className="etherscan-link">View on Explorer</div>
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    className="btn btn-lg btn-custom-primary mt-4"
                    onClick={handleClose}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </Modal.Body>
              <Modal.Footer className="wallet-footer p-2"></Modal.Footer>
            </Modal>
          </>
        );
      case "loading":
        return (
          <>
            <Modal
              className={`modal-theme ${theme === "dark" ? "dark" : "light"}`}
              animation={false}
              size="sm"
              show={true}
              onHide={handleClose}
            >
              <Modal.Header className="modal-header-custom" closeButton>
                <Modal.Title className="model-title-custom"></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-body-info">
                  <div
                    style={{
                      margin: " 25px 0",
                    }}
                  >
                    <Loader
                      type="Circles"
                      color={`${theme === "dark" ? "#800080" : "#800080"}`}
                      height={100}
                      width={100}
                    />
                  </div>
                  <h4 className="mt-4">Waiting For Confirmation</h4>
                  {/* <h5>Swapping 1 ETH for 2.945 UNI</h5> */}
                  <p>Confirm this transaction in your wallet</p>
                </div>
              </Modal.Body>
              <Modal.Footer className="wallet-footer p-2"></Modal.Footer>
            </Modal>
          </>
        );
      case "failure":
        return (
          <>
            <Modal
              className={`modal-theme ${theme === "dark" ? "dark" : "light"}`}
              animation={false}
              size="sm"
              show={true}
              onHide={handleClose}
            >
              <Modal.Header className="modal-header-custom" closeButton>
                <Modal.Title className="model-title-custom">Error</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  className="modal-body-info"
                  style={{ padding: "1rem 2rem" }}
                >
                  <img
                    className="icon"
                    src={Alert}
                    alt="alert icon"
                    width="85"
                  />
                  <h5 className="mt-4">Transaction Rejected</h5>
                  <button
                    className="btn btn-lg btn-custom-primary mt-4"
                    onClick={handleClose}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </Modal.Body>
              <Modal.Footer className="wallet-footer p-2"></Modal.Footer>
            </Modal>
          </>
        );
      default:
        return <></>;
    }
  }
  return <>{transactionMethods()}</>;
};
export default TransactionPopup;
