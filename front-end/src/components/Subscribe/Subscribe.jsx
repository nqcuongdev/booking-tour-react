import React from 'react';
import './Subscribe.scss';
import { Button, Col, Container, Input, Row } from 'reactstrap';

const Subscribe = (props) => {
    return (
        <div className="subscribe">
            <Container>
                <Row>
                    <Col lg={5} md={5} className="subscribe-left">
                        <h1>Subscribe</h1>
                        <p>To get latest offers & deal today</p>
                    </Col>
                    <Col lg={7} md={7} className="subscribe-right">
                        <Input className="subscribe-input" placeholder="Enter your E-mail" type="email"></Input>
                        <Button className="subscribe-button">Subscribe</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Subscribe;