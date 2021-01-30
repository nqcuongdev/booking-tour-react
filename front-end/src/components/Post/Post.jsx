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
    const convertLinkImage = (path) => {
        return path.replace(/\\/g, "/");
    }

    return (
        <div className="home-post-card">
            <Card className="card">
                <Link 
                    to={{
                        pathname: `/blogs/${props.slug}`,
                        state: { id: `${props._id}` },
                    }}
                >
                    <div className="img-bg" style={{ backgroundImage: `url(${convertLinkImage(props.image)})` }}>
                        {/* <CardImg className="card-img" top width="100%" src={props.image} alt="Card image cap" /> */}
                    </div>
                </Link>
                <div className="time-view">
                    <Row>
                        <Col lg={6} md={6} className="time">
                            <BiCalendarWeek size={14} />
                            <span> {props.dataTime}</span>
                        </Col>
                        <Col lg={6} md={6} className="view">
                            <AiOutlineEye size={14} />
                            <span> {props.view} views</span>
                        </Col>
                    </Row>
                </div>
                <CardBody className="card-body">
                    <Link className="link"
                        to={{
                            pathname: `/blogs/${props.slug}`,
                            state: { id: `${props._id}` },
                        }}
                    >
                        <CardTitle className="card-title"><h4>{props.title}</h4></CardTitle>
                    </Link>
                    
                    <CardText className="card-text">
                        {props.content}
                    </CardText>

                    <Link
                        className="btn-read-more"
                        to={{
                            pathname: `/blogs/${props.slug}`,
                            state: { id: `${props._id}` },
                        }}
                    >
                        <span className="read-more-text">Read more</span> <BsArrowRightShort className="arrow-right-icon" />
                    </Link>
                </CardBody>
            </Card>
        </div>
    );
};

export default Post;