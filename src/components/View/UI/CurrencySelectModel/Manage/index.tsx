import React, { useEffect, useState } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

interface Props {}

const Manage: FC<Props> = (props) => {
  const {} = props;

  const [searchText, setSearchText] = useState<string>("");

  const [activeSubTab, setActiveSubTab] = useState<string>("list");

  const { theme } = useTypedSelector((state) => state.settings);
  const { payload: tokenList, isRequesting } = useTypedSelector(
    (state) => state.tokenManage.tokenList
  );
  useEffect(() => {
    console.log(tokenList);
  });

  const handleActiveToggle = () => {};

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
            <Col className="manage-tab active">List</Col>
            <Col className="manage-tab">Token</Col>
          </Row>
        </Button>
      </Container>
      <div>
        <input
          type="text"
          value={searchText}
          className="form-control model-search-input"
          placeholder="https:// or ipfs:// or ENS name"
          onChange={(e) => setSearchText(e.target.value)}
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
  );
};

export default Manage;
