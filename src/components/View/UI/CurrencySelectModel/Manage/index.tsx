import React, { useEffect, useState } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useActions } from "hooks/useActions";
import useWalletConnect from "hooks/useWalletConnect";
import TokenListGroup from "./tokenListGroup";
import "./index.scss";
import SearchTokenCard from "./SearchTokenCard";
import CustomToken from "./customToken";
interface Props {}

const Manage: FC<Props> = (props) => {
  // const [searchText, setSearchText] = useState<string>("");
  const [searchedTokenText, setSearchedTokenText] = useState<string>("");
  const [isExist, toggleIsExist] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<string>("list");
  const { selectedNetworkId, networkId } = useWalletConnect();

  const { theme } = useTypedSelector((state) => state.settings);
  const { payload: tokenList } = useTypedSelector(
    (state) => state.tokenManage.tokenList
  );
  const { customTokens } = useTypedSelector((state) => state.tokenManage);
  const { payload: searchedToken, message: errorMessage } = useTypedSelector(
    (state) => state.tokenManage.searchedToken
  );

  const { searchToken, resetCustomToken, setCustomToken } = useActions();
  // useEffect(() => {
  //   console.log("list", tokenList);
  // }, [tokenList]);

  useEffect(() => {
    if (searchedTokenText.length > 0) {
      searchToken(searchedTokenText, networkId, selectedNetworkId);
      handleSearchToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedTokenText, selectedNetworkId]);

  const handleSearchToken = async () => {
    let isAlreadyExist = await tokenList.some((item: any) => {
      return item.address === searchedTokenText;
    });
    toggleIsExist(isAlreadyExist);
  };

  const handleActiveToggle = () => {
    setActiveSubTab(activeSubTab === "list" ? "token" : "list");
  };

  const handleClearUserToken = () => {
    localStorage.removeItem("customTokens");
    resetCustomToken();
  };

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(e.target.value);
  // };

  const handleImport = async () => {
    setCustomToken(
      {
        ...searchedToken,
        // logoURI: searchedToken.logo,
        // address: searchedTokenText,
        // isCustomToken: true,
        // chainId: networkId,
      },
      "add"
    );
    setSearchedTokenText("");
    searchToken("", networkId, selectedNetworkId);

    // createPool(currentProvider, searchedTokenText, accounts[0], searchedToken);
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
              token={searchedToken}
              isExist={isExist}
            />
          )}
          <div className="custom-token-list">
            <div className="token-number">
              <span>{customTokens.length}</span> Custom Token
              <Button
                variant={theme}
                className=" clear-btn"
                onClick={handleClearUserToken}
              >
                Clear all
              </Button>
            </div>
            {customTokens &&
              customTokens.map((token) => (
                <CustomToken key={token.symbol} token={token} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Manage;
