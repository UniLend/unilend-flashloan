import React, { useEffect, useState } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useActions } from "hooks/useActions";
import useWalletConnect from "hooks/useWalletConnect";
import { IERC20 } from "ethereum/contracts/FlashloanLB";

interface Props {}

const Manage: FC<Props> = (props) => {
  const {} = props;

  const [searchText, setSearchText] = useState<string>("");

  const [activeSubTab, setActiveSubTab] = useState<string>("list");
  const { currentProvider } = useWalletConnect();

  const { theme } = useTypedSelector((state) => state.settings);
  const { payload: tokenList, isRequesting } = useTypedSelector(
    (state) => state.tokenManage.tokenList
  );
  const { fetchTokenList } = useActions();
  useEffect(() => {
    console.log(tokenList);
  }, [tokenList]);

  const handleActiveToggle = () => {
    setActiveSubTab(activeSubTab === "list" ? "token" : "list");
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    let IERC = IERC20(currentProvider);
    // IRC.methods.name(e.target.value).call((err: any, res: any) => {
    //   if (!err && res) {
    //     console.log(res);
    //   }
    // });
    fetchTokenList();
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
      {activeSubTab === "token" ? (
        <>
          <div>
            <input
              type="text"
              value={searchText}
              className="form-control model-search-input"
              placeholder="https:// or ipfs:// or ENS name"
              onChange={handleSearch}
            />
          </div>
          <div>
            {isRequesting || tokenList.length === 0 ? (
              <span>{isRequesting ? "Loading..." : "No tokens found."}</span>
            ) : (
              <>
                {/* {tokenList.length &&
              tokenList.map((item: any, i: number) => (
                <div key={i}>{item.name}</div>
              ))} */}
              </>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Manage;
