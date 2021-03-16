import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

interface Props {}

const Manage: FC<Props> = (props) => {
  const { theme } = useTypedSelector((state) => state.settings);

  return (
    <Container>
      <Button className="my-3 manage-toggle" variant={theme} size="lg" block>
        <Row>
          <Col className="manage-tab active">List</Col>
          <Col className="manage-tab">Token</Col>
        </Row>
      </Button>
    </Container>
  );
};

export default Manage;
