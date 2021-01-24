import React from 'react';
import './Hotel.scss';
import {
    Card, CardImg, CardText, CardBody, Row,
    CardTitle, CardSubtitle, Button, CardImgOverlay, Col
} from 'reactstrap';
import { RiStarSFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import { AiFillTag } from 'react-icons/ai';

const Hotel = (props) => {
    return (
        <div className="hotel">
            <Card>
                <CardImg top width="100%" src="{props.image}" alt="Card image cap" />
                
                <CardImgOverlay style={{ backgroundImage: `url(${props.image})` }}>
                    <div className="bottom-opacity"></div>
                    <div className="overlay-item">
                        <p>START FROM</p>
                        <span>$ {props.price}</span>
                    </div>
                </CardImgOverlay>
        
                <CardBody>
                    <div className="hotel-name-rate">
                        <p className="hotel-name">{props.name}</p>
                        <p className="hotel-rate">
                            <RiStarSFill className="stars" />{props.rateStars} /<span>5</span>
                        </p>
                    </div>
                    <div className="hotel-location">
                        <MdLocationOn className="location-icon" /> {props.location}
                    </div>
                    <div className="hotel-tag mb-10">
                        <AiFillTag />
                        {props.tags.map((tag, index) => {
                            if (index < props.tags.length - 1) {
                                return (
                                    <span> {tag}/</span>
                                )
                            } else {
                                return (
                                    <span> {tag}</span>
                                )
                            }
                        })}
                    </div>
                    <div className="hotel-description mb-20">
                        {props.description}
                    </div>
                    <Row className="button-group">
                        <Col lg={6} md={6} xs={6}>
                            <Button className="btn-book-now">Book now</Button>
                        </Col>
                        <Col lg={6} md={6} xs={6}>
                            <Button className="btn-view-detail">View detail</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}

export default Hotel;