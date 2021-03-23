import { FC } from "react";
import { Modal } from "react-bootstrap";
import "./TransactionLoader.scss";
import { useTypedSelector } from "hooks/useTypedSelector";
import Loader from "react-loader-spinner";
interface Props {
  handleClose: () => void;
}

const TransactionPopup: FC<Props> = (props) => {
  const { handleClose } = props;
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
};
export default TransactionPopup;
