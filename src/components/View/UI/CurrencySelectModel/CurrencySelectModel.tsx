import React, { FC, useState, useEffect, Children } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import "./CurrencySelectModel.scss";
import Logo from "../../../../assets/htLogo.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import { currencyList } from "ethereum/contracts";
import { searchWord } from "components/Helpers";
import { Heading5, Heading6 } from "components/View/UI/widgets/Common";

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
  const [openManage, setOpenManage] = useState<Boolean>(false);

  useEffect(() => {
    let filteredList = [...currencyList.currency];
    if (searchText.trim().length > 0)
      filteredList = filteredList.filter(
        (e) => searchWord(e.name, searchText) || searchWord(e.desc, searchText)
      );
    setFilteredList(filteredList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyList.currency, searchText]);

  const SearchBar = (
    <div style={{ margin: " 15px auto 0 auto" }}>
      <input
        type="text"
        value={searchText}
        className="form-control model-search-input"
        placeholder="Search name or paste address"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );

  return (
    <>
      <Modal
        className={theme === "dark" ? "dark" : ""}
        animation={false}
        size="sm"
        show={true}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>
            <div className={`title ${openManage ? "manage" : "token"}`}>
              {openManage && (
                <span className={`arrow-btn ${theme}`}>
                  <i
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                    onClick={() => setOpenManage(false)}
                  />
                </span>
              )}
              <span className="form-label">
                {openManage ? "Manage" : "Select a token"}
              </span>
              <span className={`close-btn ${theme}`}>
                <i className="fa fa-times" aria-hidden="true" />
              </span>
            </div>
          </Modal.Title>
          {!openManage && SearchBar}
        </Modal.Header>
        <Modal.Body>
          <div className="curr-list-group">
            <ListGroup>
              {Children.toArray(
                filteredList.map((item: any) => (
                  <ListGroup.Item
                    key={item.id}
                    action
                    onClick={() => handleCurrChange(item.name)}
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
                ))
              )}
            </ListGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="manage" onClick={() => setOpenManage(!openManage)}>
            <span>
              <i className="fa fa-pencil-square-o cursor-pointer" />
            </span>
            <span className="ml-1 cursor-pointer">Manage</span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CurrencySelectModel;
