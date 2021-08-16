import { useTypedSelector } from "hooks/useTypedSelector";
import { useActions } from "hooks/useActions";
import { FC } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import SelectedIcon from "assets/circle_done.svg";
import { NETWORKS } from "components/constants";
import { capitalize } from "components/Helpers";
import { useHistory } from "react-router-dom";
import { setParams } from "state/action-creators";
interface Props {
  onHide: () => void;
}

const SwitchNetWorkModal: FC<Props> = (props) => {
  const { onHide } = props;
  const history = useHistory();
  const { theme, activeTab } = useTypedSelector((state) => state.settings);
  const { selectedNetworkId } = useTypedSelector(
    (state) => state.connectWallet
  );
  const { setSelectedNetworkId } = useActions();

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
                const logo =
                  require(`../../../../assets/${item.logo}.png`).default;
                return (
                  <Col key={item.id} className="p-3 text-center">
                    <button
                      className={`btn ${
                        theme === "dark" && "btn-dark"
                      } btn-custom-secondary btn-switch-pop`}
                      onClick={() => {
                        history.push(`/${activeTab}`);
                        setSelectedNetworkId(item.id);
                        onHide();
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <img src={logo} alt={item.label} />
                        {selectedNetworkId === item.id && (
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
              {/* {NETWORKS.length % 2 !== 0 && (
                <Col className="p-3 center-block"></Col>
              )} */}
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
};

export default SwitchNetWorkModal;
