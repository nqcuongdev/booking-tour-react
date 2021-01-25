import React from 'react';
import './PopularDestinations.scss';
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";

const PopularDestinations = (props) => {
    return (
        <div className="popular-destinations">
            <p className="title">Popular destinations</p>
            <Row>
                {props.popularDestinations.map(item => {
                    return (
                        <Col xl={6} className="item">
                            <Link to="#"><AiFillCaretRight/> {item}</Link>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default PopularDestinations;