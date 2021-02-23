import React, { FC, useRef, Children } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import "./CurrencySelectModel.scss";
import Logo from "../../../../assets/htLogo.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import { currencyList } from "ethereum/contracts";

// ! Let React Handle Keys
interface Props {
  show: boolean;
  handleClose: () => void;
  currFieldName: string;
  handleCurrChange: (selectedField: any) => void;
}

const CurrencySelectModel: FC<Props> = ({
  show,
  handleClose,
  currFieldName,
  handleCurrChange,
}) => {
  const search: any = useRef("");
  const { theme } = useTypedSelector((state) => state.settings);

  return (
    <>
      <Modal
        className={theme === "dark" ? "dark" : ""}
        animation={false}
        size="sm"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="model-title-custom">
            <label className="form-label modal-label-search">
              Select a token
            </label>
            <div style={{ margin: " 10px auto 0 auto" }}>
              <input
                type="text"
                ref={search}
                className="form-control model-search-input"
                placeholder="Search name or paste address"
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="curr-list-group">
            <ListGroup>
              {Children.toArray(
                currencyList.currency.map((currency: any) => (
                  <ListGroup.Item
                    action
                    onClick={() => handleCurrChange(currency)}
                  >
                    <div className="row">
                      <div className="col-2 px-0 curr-list">
                        <img
                          width="24"
                          className="list-icon"
                          src={Logo}
                          alt=""
                        />
                      </div>
                      <div className="col-10">
                        <div className="row">
                          <h6
                            className="mb-0"
                            style={{ textTransform: "uppercase" }}
                          >
                            {currency.name}
                          </h6>
                        </div>
                        <div className="row">
                          <p
                            className="mb-0 list-desc"
                            style={{ textTransform: "capitalize" }}
                          >
                            {currency.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <div className="align-center">
            <Button className="footer-btn">
              <img style={{ stroke: "rgb(33, 114, 229)" }} src={Edit} alt="" />
              Manage
            </Button>
          </div> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CurrencySelectModel;
