import React, {
  FC,
  useState,
  useEffect,
  Children,
  Dispatch,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { ListGroup, Modal } from "react-bootstrap";
import "./CurrencySelectModel.scss";
import { useTypedSelector } from "hooks/useTypedSelector";
import { searchWord } from "components/Helpers";
import Manage from "./Manage";
import { TokenAction } from "state/actions/tokenManageA";
import { ActionType } from "state/action-types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// ! Let React Handle Keys
interface Props {
  handleClose: () => void;
  currFieldName: any;
  handleCurrChange: (selectedCurrency: any) => void;
  activeTab: string;
}

const CurrencySelectModel: FC<Props> = ({
  handleClose,
  currFieldName,
  handleCurrChange,
  activeTab,
}) => {
  const { theme } = useTypedSelector((state) => state.settings);

  const dispatch = useDispatch<Dispatch<TokenAction>>();
  const [searchText, setSearchText] = useState<string>("");
  const [filteredList, setFilteredList] = useState([{}]);
  const [openManage, setOpenManage] = useState<Boolean>(false);
  const { tokenList } = useTypedSelector((state) => state.tokenManage);

  useEffect(() => {
    // searchToken("0x70401dfd142a16dc7031c56e862fc88cb9537ce0");

    return () =>
      dispatch({
        type: ActionType.SET_SEARCHED_TOKEN,
        payload: { data: null, message: null },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log("pay", tokenList);
    // if (tokenList.payload.length) {
    //   setFilteredList(tokenList.payload);
    // }
    let filteredList: any;
    if (tokenList.payload.length) {
      let filtered = tokenList.payload.filter((e: any) => {
        return e.symbol !== "ETH";
      });
      filteredList = activeTab !== "reward" ? tokenList.payload : filtered;
      if (searchText.trim().length > 0)
        filteredList = filteredList.filter((e: any) => {
          return (
            searchWord(e.name, searchText) ||
            searchWord(e.symbol, searchText) ||
            searchWord(e.address, searchText)
          );
        });
    }
    setFilteredList(filteredList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, tokenList]);

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
  const Row = useCallback(({ data, index, style }) => {
    const currency = data[index];
    return (
      <button
        className="list-group-item"
        style={style}
        onClick={() => handleCurrChange(currency)}
      >
        <div className="row list-row">
          <div className="col-2 px-0 curr-list">
            <img
              width="24"
              className="list-icon"
              src={currency.logoURI}
              alt=""
            />
          </div>
          <div className="col-7">
            <div className="row">
              <h6 className="mb-0" style={{ textTransform: "uppercase" }}>
                {currency.symbol}
              </h6>
            </div>
            <div className="row">
              <p
                className="mb-0 list-desc"
                style={{ textTransform: "capitalize" }}
              >
                {currency.name}
              </p>
            </div>
          </div>
          <div className="col-3" style={{ alignSelf: "center" }}>
            {/* <div
                          className="row"
                          style={{ paddingRight: "15px", float: "right" }}
                        > */}
            <div className="row bal-price">
              <h6 className="mb-0" style={{ textTransform: "uppercase" }}>
                {currency.balance >= 0 ? currency.balance : ""}
              </h6>
            </div>
            <div className="row bal-price">
              <p
                className="mb-0 list-desc"
                style={{ textTransform: "capitalize" }}
              >
                {currency.underlyingBalance >= 0
                  ? currency.underlyingBalance
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </button>
    );
  }, []);
  const TokenList = (
    // filteredList ?
    // <div style={{ flex: "1" }}>
    <AutoSizer disableWidth>
      {({ height }) => (
        <FixedSizeList
          style={{ color: "#fff" }}
          itemData={filteredList}
          height={height}
          // width={300}
          itemCount={filteredList.length}
          itemSize={60}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
    // </div>

    //   <ListGroup>
    //     {Children.toArray(
    //       filteredList.map((item: any) => (
    //         <ListGroup.Item
    //           key={item.id}
    //           action
    //           onClick={() => handleCurrChange(item)}
    //         >
    //           <div className="row">
    //             <div className="col-2 px-0 curr-list">
    //               <img
    //                 width="24"
    //                 className="list-icon"
    //                 src={item.logoURI}
    //                 alt=""
    //               />
    //             </div>
    //             <div className="col-7">
    //               <div className="row">
    //                 <h6 className="mb-0" style={{ textTransform: "uppercase" }}>
    //                   {item.symbol}
    //                 </h6>
    //               </div>
    //               <div className="row">
    //                 <p
    //                   className="mb-0 list-desc"
    //                   style={{ textTransform: "capitalize" }}
    //                 >
    //                   {item.name}
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="col-3" style={{ alignSelf: "center" }}>
    //               {/* <div
    //                     className="row"
    //                     style={{ paddingRight: "15px", float: "right" }}
    //                   > */}
    //               <div className="row bal-price">
    //                 <h6 className="mb-0" style={{ textTransform: "uppercase" }}>
    //                   {item.balance >= 0 ? item.balance : ""}
    //                 </h6>
    //               </div>
    //               <div className="row bal-price">
    //                 <p
    //                   className="mb-0 list-desc"
    //                   style={{ textTransform: "capitalize" }}
    //                 >
    //                   {item.underlyingBalance >= 0 ? item.underlyingBalance : ""}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </ListGroup.Item>
    //       ))
    //     )}
    //   </ListGroup>
    // ) : (
    //   <>
    //     <p className="no-data">No Data to Show</p>
    //   </>
  );
  const ManageButton = (
    <div className="manage" onClick={() => setOpenManage(!openManage)}>
      <span>
        <i className="fa fa-pencil-square-o cursor-pointer" />
      </span>
      <span className="ml-1 cursor-pointer">
        {/* <img src={EditIcon} alt="Edit" width="15" /> */}
        Manage
      </span>
    </div>
  );
  const ManageBodyContent = <div></div>;
  const MainBodyContent = (
    <div className="curr-list-group">
      {tokenList.isRequesting ? (
        <>
          <div className="no-data">Fetching List</div>
        </>
      ) : (
        TokenList
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
            ></div>
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
              {/* <span className={`close-btn ${theme}`}>
                <i className="fa fa-times" aria-hidden="true" />
              </span> */}
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
