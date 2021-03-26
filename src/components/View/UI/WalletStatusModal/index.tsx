import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC, useState } from "react";
import { Card, Container, Modal } from "react-bootstrap";
import "./index.scss";
interface Props {
  handleClose: () => void;
  handleDisconnect: () => void;
  address: string;
}
interface WalletConnectModal {
  show: boolean;
}
const WalletStateModal: FC<Props> = ({
  handleClose,
  address,
  handleDisconnect,
}) => {
  const { theme } = useTypedSelector((state) => state.settings);
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

              <Card.Body>{address}</Card.Body>
            </Card>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WalletStateModal;
