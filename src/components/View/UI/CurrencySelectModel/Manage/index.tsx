import React, { useEffect, useState } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useActions } from "hooks/useActions";
import useWalletConnect from "hooks/useWalletConnect";
import TokenListGroup from "./tokenListGroup";
import "./index.scss";
import SearchTokenCard from "./SearchTokenCard";
import UFTLogo from "assets/logo.svg";
import TokenList from "./tokenList";
interface Props {}

const Manage: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedTokenText, setSearchedTokenText] = useState<string>("");

  const [activeSubTab, setActiveSubTab] = useState<string>("list");
  const { currentProvider, accounts } = useWalletConnect();

  const { theme } = useTypedSelector((state) => state.settings);
  const { payload: tokenList } = useTypedSelector(
    (state) => state.tokenManage.tokenList
  );

  const { payload: searchedToken, message: errorMessage } = useTypedSelector(
    (state) => state.tokenManage.searchedToken
  );

  const { searchToken, createPool } = useActions();
  useEffect(() => {}, [tokenList]);

  useEffect(() => {
    if (searchedTokenText.length > 0) searchToken(searchedTokenText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedTokenText]);

  const handleActiveToggle = () => {
    setActiveSubTab(activeSubTab === "list" ? "token" : "list");
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    // let IERC = IERC20(currentProvider);
    // IRC.methods.name(e.target.value).call((err: any, res: any) => {
    //   if (!err && res) {
    //     console.log(res);
    //   }
    // });
  };
  const handleImport = () => {
    createPool(currentProvider, searchedTokenText, accounts[0], searchedToken);
  };
  return (
    <>
      <Container className="p-0">
        <Button
          className="my-3 manage-toggle"
          variant={theme}
          size="lg"
          block
          onClick={handleActiveToggle}
        >
          <Row>
            <Col
              className={`manage-tab ${activeSubTab === "list" && "active"}`}
            >
              List
            </Col>
            <Col
              className={`manage-tab ${activeSubTab === "token" && "active"}`}
            >
              Token
            </Col>
          </Row>
        </Button>
      </Container>
      {activeSubTab === "list" ? (
        <>
          <div className="list-container">
            {/* <div className="list-search-container">
              <div className="list-search-input">
                <input
                  type="text"
                  value={searchText}
                  className="form-control model-search-input"
                  placeholder="https:// or ipfs:// or ENS name"
                  onChange={handleSearch}
                />
              </div>
              <div className="searched-list">
                <TokenList
                  item={{
                    id: 2,
                    name: "CoinGecko",
                    icon: "https://www.coingecko.com/assets/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png",
                    token: 4480,
                    fetchURI: "https://tokens.coingecko.com/uniswap/all.json",
                    isEnabled: true,
                  }}
                  type="not-exist"
                />
              </div>
            </div> */}

            <TokenListGroup />
          </div>
        </>
      ) : (
        <>
          <div
            className={`${
              searchedTokenText && errorMessage ? "search-token" : ""
            }`}
          >
            <input
              type="text"
              value={searchedTokenText}
              className="form-control model-search-input"
              placeholder="0x0000"
              onChange={(e) => setSearchedTokenText(e.target.value)}
            />
            {searchedTokenText && errorMessage && (
              <span className="error">{errorMessage}</span>
            )}
          </div>
          {searchedToken && (
            <SearchTokenCard
              handleImport={() => handleImport()}
              name={searchedToken.name}
              symbol={searchedToken.symbol}
              logo={searchedToken.logo}
            />
          )}
          <div className="custom-token-list">
            <div className="token-number">
              <span>1</span> Custom Token
              <Button variant={theme} className=" clear-btn">
                Clear all
              </Button>
            </div>
            <div className="token-list">
              <div className="details">
                <img src={UFTLogo} alt="token-logo" />
                <span>UFT</span>
              </div>
              <div className="action">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="delete"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://etherscan.io/address/0x70401dFD142A16dC7031c56E862Fc88Cb9537Ce0"
                  className="sc-eNQAEJ bJDHdm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="view"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Manage;
