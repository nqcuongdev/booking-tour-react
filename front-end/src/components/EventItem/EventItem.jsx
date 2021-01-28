import React from "react";
import { Link } from "react-router-dom";
import "./EventItem.scss";
import { Card, CardImg,  CardBody, Row, CardImgOverlay, Col} from "reactstrap";

const EventItem = (props) => {
    return (
        <div className="event">
            <Card className="mb-30">
                <CardImg top width="100%" src={process.env.REACT_APP_API_URL + props.image} alt="Card image cap" />
                
                <CardImgOverlay style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + props.image})` }}>
                    <div className="bottom-opacity"></div>
                    <div className="overlay-item">
                        <span className="top-left">Featured</span>
                        <span className="bottom-right">{props.discount}%</span>
                    </div>
                </CardImgOverlay>

                <CardBody>
                    <p className="location">{props.location}</p>
                    <p className="title">
                        <Link className="link">{props.title}</Link>
                    </p>
                    <p className="excellent">{props.excellent}/5 Excellent </p>
                    <p className="normal">Start time: {props.startTime}</p>
                    <p className="normal">Date: {props.date}</p>
                    <hr/>
                    <Row className="card-bottom">
                        <Col lg={5}>
                            <p>{props.time}H</p>
                        </Col>
                        <Col lg={7} className="card-bottom-right">
                            <span>From: ${props.price}</span>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default EventItem;
