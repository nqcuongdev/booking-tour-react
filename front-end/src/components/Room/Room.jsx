import React from "react";
import { Row, Col, Button } from "reactstrap";
import './Room.scss';
import { TiGroup, TiTick } from 'react-icons/ti';
import { MdZoomOutMap } from 'react-icons/md';

const Room = (props) => {
    return (
        <Row className="room">
            <Col xl={3} lg={3} md={4} xs={4}>
                <div className="room-image">
                    <img src={props.image} alt=""/>
                </div>
            </Col>
            <Col xl={9} lg={9} md={8} xs={8}>
                <div className="room-info">
                    <div className="room-info-header">
                        <Row>
                            <Col xl={6} className="room-info-header-title">
                                <span className="title">{props.title}</span>
                            </Col>
                            <Col xl={6} className="room-info-header-price">
                                <span className="price">
                                    <span className="price-dollar">$</span>
                                    <span className="price-number">{props.price}</span>
                                </span>
                                <span className="per-night">Per night</span>
                            </Col>
                        </Row>
                    </div>
                    <div className="room-info-body">
                        <Row>
                            <Col xl={3} lg={3} md={3} xs={12} className="people-acreage">
                                <Row>
                                    <Col xl={5} lg={5} md={12} xs={5} className="people">
                                        <TiGroup className="icon"/>{props.people}
                                    </Col>
                                    <Col xl={7} lg={7} md={12} xs={7} className="acreage">
                                        <MdZoomOutMap className="icon"/>{props.acreage}m2
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={12} className="options">
                                <ul>
                                    {props.options.map(option => {
                                        return (
                                            <li><TiTick /> {option}</li>
                                        )
                                    })}
                                </ul>
                            </Col>
                            <Col xl={3} lg={3} md={3} xs={12} className="btn-book-now">
                                <Button>Book now</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default Room;