import { FC } from "react";
import { Modal } from "react-bootstrap";
import "./TransactionLoader.scss";
import { useTypedSelector } from "hooks/useTypedSelector";
import Loader from "react-loader-spinner";
import Alert from "assets/alert.png";
import ArrowUp from "assets/arrowup.png";
interface Props {
  handleClose: () => void;
  mode: string;
  handleSwitch?: string;
}

const TransactionPopup: FC<Props> = ({ handleClose, mode, handleSwitch }) => {
  const { theme } = useTypedSelector((state) => state.settings);

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
                  <img
                    className="icon"
                    src={ArrowUp}
                    alt="alert icon"
                    width="60"
                  />
                  <h5 className="mt-4">Transaction Submitted</h5>
                  {/* <p className="mt-3"> View on Etherscan</p> */}
                  <button
                    className="btn btn-lg btn-custom-primary mt-4"
                    onClick={() => {}}
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
                  <Loader
                    type="Circles"
                    color={`${theme === "dark" ? "#800080" : "#800080"}`}
                    height={100}
                    width={100}
                  />
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
                    onClick={() => {}}
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
