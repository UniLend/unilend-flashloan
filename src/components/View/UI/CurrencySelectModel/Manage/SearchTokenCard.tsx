import React from 'react';
import { Row, Col, Card } from 'react-bootstrap'
import './SearchTokenCard.scss';
import tickImg from "../../../../../assets/tick.svg"

interface Props {
    name: string;
    symbol: string;
    logo: string;
}

const SearchTokenCard: React.FC<Props> = (props) => {
    const { name, symbol, logo } = props;

    return <Card className="search-token-card">
        <Row className="search-token-row m-0">
            <Col className="p-0" sm={2} md={2} lg={2}>
                <img src={logo} alt="" className="logo" />
            </Col>
            <Col className="details p-0" sm={7} md={7} lg={7}>
                <Row className="m-0">
                    <Col sm={12} md={12} lg={12} className="p-0">
                        <span className="symbol">{symbol}</span>
                        <span className="name">{`${name} Stablecoin`}</span>
                    </Col>
                    <Col sm={12} md={12} lg={12} className="p-0">
                        <span className="via p-0" >via Compound</span>
                        <span>
                            <img
                                src="https://raw.githubusercontent.com/compound-finance/token-list/master/assets/compound-interface.svg"
                                alt=""
                                className="detail-img" />
                        </span>
                    </Col>
                </Row>
            </Col>
            <Col className="status p-0" sm={3} md={3} lg={3}>
                <img src={tickImg} alt="" className="tick" />
                <span className="name">Active</span>
            </Col>
        </Row>
    </Card>
}

export default SearchTokenCard;