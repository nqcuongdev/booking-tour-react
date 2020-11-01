import React from 'react';
import './Post.scss';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col
} from 'reactstrap';
import { BiCalendarWeek } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from "react-router-dom";

const Post = (props) => {
    return (
        <div className="home-post-card">
            <Card className="card">
                <a href="#"><CardImg className="card-img" top width="100%" src={props.image} alt="Card image cap" /></a>
                <div className="time-view">
                    <Row>
                        <Col lg={6} md={6} className="time">
                            <BiCalendarWeek size={14} />
                            <span> {props.dataTime}</span>
                        </Col>
                        <Col lg={6} md={6}>
                            <AiOutlineEye size={14} />
                            <span> {props.view} views</span>
                        </Col>
                    </Row>
                </div>
                <CardBody className="card-body">
                    <CardTitle className="card-title"><h4>{props.title}</h4></CardTitle>
                    <CardText className="card-text">{props.description}</CardText>
                    <Link to="blogs/{props.id}" className="btn-read-more">
                        <span className="read-more-text">Read more</span> <BsArrowRightShort className="arrow-right-icon" />
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
};

export default Post;