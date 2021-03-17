import React, { FC, useState, useEffect, Children } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import "./CurrencySelectModel.scss";
import Logo from "../../../../assets/htLogo.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import { currencyList } from "ethereum/contracts";
import { searchWord } from "components/Helpers";
import { Heading5, Heading6 } from "components/View/UI/widgets/Common";
import EditIcon from "assets/edit.svg";
import backIcon from "assets/back.svg";
import Manage from "./Manage";
import { useActions } from "hooks/useActions";
// ! Let React Handle Keys
interface Props {
  handleClose: () => void;
  currFieldName: any;
  handleCurrChange: (selectedField: string, selectedLogo: any) => void;
}

const CurrencySelectModel: FC<Props> = ({
  handleClose,
  currFieldName,
  handleCurrChange,
}) => {
  const { theme } = useTypedSelector((state) => state.settings);

  const [searchText, setSearchText] = useState<string>("");
  const [filteredList, setFilteredList] = useState([{}]);
  const [openManage, setOpenManage] = useState<Boolean>(false);
  const { tokenList } = useTypedSelector((state) => state.tokenManage);
  const { fetchTokenList } = useActions();

  useEffect(() => {
    fetchTokenList();
  }, []);

  useEffect(() => {
    if (tokenList.payload.length) {
      let filteredList = tokenList.payload;
      console.log(filteredList);
      if (searchText.trim().length > 0)
        filteredList = filteredList.filter((e) => {
          // console.log(e);
          // searchWord(e.name, searchText) || searchWord(e.desc, searchText);
        });
      setFilteredList(filteredList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyList.currency, searchText, tokenList]);

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
  const ManageButton = (
    <div className="manage" onClick={() => setOpenManage(!openManage)}>
      <span>
        <i className="fa fa-pencil-square-o cursor-pointer" />
      </span>
      <span className="ml-1 cursor-pointer">
        <img src={EditIcon} alt="Edit" width="15" />
        Manage
      </span>
    </div>
  );
  // const ManageBodyContent = <div></div>;
  const MainBodyContent = (
    <div className="curr-list-group">
      {filteredList.length ? (
        <ListGroup>
          {Children.toArray(
            filteredList.map((item: any) => (
              <ListGroup.Item
                key={item.id}
                action
                onClick={() => handleCurrChange(item.symbol, item.logoURI)}
              >
                <div className="row">
                  <div className="col-2 px-0 curr-list">
                    <img
                      width="24"
                      className="list-icon"
                      src={item.logoURI}
                      alt=""
                    />
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <h6
                        className="mb-0"
                        style={{ textTransform: "uppercase" }}
                      >
                        {item.symbol}
                      </h6>
                    </div>
                    <div className="row">
                      <p
                        className="mb-0 list-desc"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.name}
                      </p>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      ) : (
        <>
          <p>Fetching List</p>
        </>
      )}
    </div>
  );
  return (
    <>
      <Modal
        className={`curr-select-modal ${theme === "dark" ? "dark" : ""}`}
        animation={false}
        size="sm"
        show={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          {openManage && (
            <div
              className="manage-back-icon"
              onClick={() => {
                setOpenManage(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme === "dark" ? "#fff" : "#111"}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                style={{ cursor: "pointer" }}
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </div>
          )}
          {/* <img className="manage-back-icon" src={backIcon} alt="Go back" /> */}
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
        <Modal.Body className={openManage && "manage"}>
          {openManage ? <Manage /> : MainBodyContent}
        </Modal.Body>
        {!openManage && <Modal.Footer>{ManageButton}</Modal.Footer>}
      </Modal>
    </>
  );
};

export default CurrencySelectModel;
