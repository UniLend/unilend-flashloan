import React, { FC, useRef, useState, useEffect } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import "./CurrencySelectModel.scss";
import Logo from "../../../../assets/htLogo.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import { currencyList } from "ethereum/contracts";
import { searchWord } from "components/Helpers";

// ! Let React Handle Keys
interface Props {
  handleClose: () => void;
  currFieldName: string;
  handleCurrChange: (selectedField: any) => void;
}
interface FList {
  id: number;
  name: string;
  desc: string;
}

const CurrencySelectModel: FC<Props> = ({
  handleClose,
  currFieldName,
  handleCurrChange,
}) => {
  const { theme } = useTypedSelector((state) => state.settings);

  const [searchText, setSearchText] = useState<string>("");
  const [filteredList, setFilteredList] = useState<Array<FList>>([]);

  useEffect(() => {
    let filteredList = [...currencyList.currency];
    if (searchText.trim().length > 0)
      filteredList = filteredList.filter(
        (e) => searchWord(e.name, searchText) || searchWord(e.desc, searchText)
      );
    setFilteredList(filteredList);
  }, [currencyList.currency, searchText]);

  return (
    <>
      <Modal
        className={theme === "dark" ? "dark" : ""}
        animation={false}
        size="sm"
        show={true}
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
                value={searchText}
                className="form-control model-search-input"
                placeholder="Search name or paste address"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="curr-list-group">
            <ListGroup>
              {filteredList.map((item: any) => (
                <ListGroup.Item
                  key={item.id}
                  action
                  onClick={() => handleCurrChange(item.name)}
                >
                  <div className="row">
                    <div className="col-2 px-0 curr-list">
                      <img width="24" className="list-icon" src={Logo} alt="" />
                    </div>
                    <div className="col-10">
                      <div className="row">
                        <h6
                          className="mb-0"
                          style={{ textTransform: "uppercase" }}
                        >
                          {item.name}
                        </h6>
                      </div>
                      <div className="row">
                        <p
                          className="mb-0 list-desc"
                          style={{ textTransform: "capitalize" }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
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
