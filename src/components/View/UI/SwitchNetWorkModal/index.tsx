import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import SelectedIcon from "assets/circle_done.svg";
import { NETWORKS } from "components/constants";
import { capitalize } from "components/Helpers";
interface Props {
  onHide: () => void;
  handleNetwork: (id: number) => void;
  selectedId: number;
}

const SwitchNetWorkModal: FC<Props> = (props) => {
  const { onHide, handleNetwork, selectedId } = props;

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
        onHide={onHide}
      >
        <Modal.Header>
          <Modal.Title className="modal-title-custom">
            Switch Network
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {NETWORKS.map((item) => {
                const logo = require(`../../../../assets/${item.logo}.png`)
                  .default;
                return (
                  <Col key={item.id} className="p-3">
                    <button
                      className={`btn ${
                        theme === "dark" && "btn-dark"
                      } btn-custom-secondary btn-switch-pop`}
                      onClick={() => handleNetwork(item.id)}
                    >
                      <div style={{ position: "relative" }}>
                        <img src={logo} alt={item.label} />
                        {selectedId === item.id && (
                          <div className="selected-div">
                            <img
                              className="selected"
                              src={SelectedIcon}
                              alt="selected"
                            />
                          </div>
                        )}
                      </div>
                      <span>{capitalize(item.label)}</span>
                    </button>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
};

export default SwitchNetWorkModal;
