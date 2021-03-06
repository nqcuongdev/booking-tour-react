import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './AdsBanner.scss';
import { Link } from "react-router-dom";

const AdsBanner = (props) => {
    return (
        <div className="ads">
            <Container>
                <Row>
                    <Col lg={6} md={6} xs={12} className="ads-banner-left">
                        <div className="tile">
                            <div className="circle">
                                <div className="transform-div">
                                    <p><b>299$</b></p>
                                    <span>FOR 2 DAYS</span>
                                </div>
                            </div>
                            <div className="description">Summer stay</div>
                        </div>
                        <p><b>for single couple</b></p>
                    </Col>
                    <Col lg={6} md={6} xs={12} className="ads-banner-right">
                        <Link to="/tours">
                            <Button className="btn-purchase-now">Purchase now</Button>
                        </Link>
                        <Link to="/tours">
                            <Button className="btn-learn-more">Learn more</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdsBanner;