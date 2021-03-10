import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Metamask from "assets/metamask.023762b6.png";
import "./index.scss";
interface Props {
  handleClose: () => void;
  handleWalletConnect: Function;
}

const ConnectWalletModal: FC<Props> = ({
  handleClose,
  handleWalletConnect,
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
          <Modal.Title className="model-title-custom">
            Connect to the Wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="p-3">
              <Col>
                <Button
                  className="btn-wallet-list"
                  onClick={() => {
                    handleWalletConnect();
                  }}
                  block
                >
                  <span className="text">MetaMask</span>
                  <img className="icon" src={Metamask} alt="metamask" />
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="wallet-footer p-2">
          New to Ethereum?{" "}
          <a href="https://ethereum.org/en/wallets/">
            Learn more about wallets
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
