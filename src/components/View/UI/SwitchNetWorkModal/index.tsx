import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import ethLogo from "assets/ethereum.webp";
import Binance from "assets/binance.png";
import SelectedIcon from "assets/circle_done.svg";
interface Props {
  handleClose: () => void;
}

const SwitchNetWorkModal: FC<Props> = ({ handleClose }) => {
  const { theme } = useTypedSelector((state) => state.settings);

  return (
    <>
      <Modal
        className={`modal-theme modal-switch ${
          theme === "dark" ? "dark" : "light"
        }`}
        animation={false}
        size="sm"
        show={true}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="modal-title-custom">
            Switch Network
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="p-3">
                <button
                  className={`btn ${
                    theme === "dark" && "btn-dark"
                  } btn-custom-secondary btn-switch-pop`}
                >
                  <div style={{ position: "relative" }}>
                    <img src={ethLogo} alt="ethereum" />
                    <div className="selected-div">
                      <img
                        className="selected"
                        src={SelectedIcon}
                        alt="selected"
                      />
                    </div>
                  </div>
                  <span>Ethereum</span>
                </button>
              </Col>
              <Col className="p-3">
                <button
                  className={`btn ${
                    theme === "dark" && "btn-dark"
                  } btn-custom-secondary btn-switch-pop`}
                >
                  <div style={{ position: "relative" }}>
                    <img src={Binance} alt="Binance" />
                    {/* <div className="selected-div">
                      <img
                        className="selected"
                        src={SelectedIcon}
                        alt="selected"
                      />
                    </div> */}
                  </div>
                  <span>Binance</span>
                </button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
};

export default SwitchNetWorkModal;
