import { copyToClipboard, shortenAddress } from "components/Helpers";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Card, Container, Modal } from "react-bootstrap";
import "./index.scss";
interface Props {
  handleClose: () => void;
  handleDisconnect: () => void;
  address: string;
}
const WalletStateModal: FC<Props> = ({
  handleClose,
  address,
  handleDisconnect,
}) => {
  const { theme } = useTypedSelector((state) => state.settings);
  const { activeNetWork } = useTypedSelector((state) => state.connectWallet);

  return (
    <>
      <Modal
        className={`modal-theme ${theme === "dark" ? "dark" : "light"}`}
        animation={false}
        size="sm"
        show={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="model-title-custom">Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Card className="m-3 status-card">
              <Card.Header>
                <div className="card-header-custom">
                  <p className="float-left">Connected to MetaMask</p>
                  <button
                    className="float-right disconnectBtn"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </button>
                </div>
              </Card.Header>

              <Card.Body>
                <p>{shortenAddress(address)}</p>
                <div
                  className="copy_view m-0"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="d-flex btn btn-secondary btn-dark btn-theme-icon-header btn"
                    onClick={() => copyToClipboard(address)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      // stroke-width="2"
                      // stroke-linecap="round"
                      // stroke-linejoin="round"
                      style={{
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                      }}
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>{" "}
                    <p
                      style={{
                        margin: "0",
                        paddingLeft: "10px",
                      }}
                    >
                      Copy Address
                    </p>
                  </span>
                  <span className="view_link">
                    <a
                      href={`https://${
                        activeNetWork === "Mainnet"
                          ? ""
                          : activeNetWork.toLowerCase().concat(".")
                      }etherscan.io/address/${address}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        // stroke-width="2"
                        // stroke-linecap="round"
                        // stroke-linejoin="round"
                        style={{
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                        }}
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>{" "}
                      View on Ethersacn
                    </a>
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WalletStateModal;
