import React from 'react';
import './HomePost.scss';
import {
    Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col
} from 'reactstrap';
import post_1 from '../../assets/images/posts/post-1.jpg';
import post_2 from '../../assets/images/posts/post-2.jpg';
import { BiCalendarWeek } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';

const HomePost = (props) => {
    return (
        <div className="home-post">
            <Container>
                <Row>
                    <Col lg={4} md={4} className="home-post-title">
                        <h2>From our blog</h2><br/>
                        <p>Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...</p><br/>
                        <Button className="btn-view-all">View all posts</Button>
                    </Col>
                    <Col lg={4} md={4} className="home-post-card">
                        <Card className="card">
                            <a href="#"><CardImg className="card-img" top width="100%" src={post_1} alt="Card image cap" /></a>
                            <div className="time-view">
                                <Row>
                                    <Col lg={6} md={6} className="time">
                                        <BiCalendarWeek size={14} />
                                        <span> 26th October, 2020</span>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <AiOutlineEye size={14} />
                                        <span> 69 views</span>
                                    </Col>
                                </Row>
                            </div>
                            <CardBody className="card-body">
                                <CardTitle className="card-title"><h4>Family's Paradise</h4></CardTitle>
                                <CardText className="card-text">Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your...</CardText>
                                <a href="#" className="btn-read-more"><span className="read-more-text">Read more</span> <BsArrowRightShort /></a>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={4} md={4} className="home-post-card">
                    <Card className="card">
                            <a href="#"><CardImg className="card-img" top width="100%" src={post_2} alt="Card image cap" /></a>
                            <div className="time-view">
                                <Row>
                                    <Col lg={6} md={6} className="time">
                                        <BiCalendarWeek size={14} />
                                        <span> 26th October, 2020</span>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <AiOutlineEye size={14} />
                                        <span> 69 views</span>
                                    </Col>
                                </Row>
                            </div>
                            <CardBody className="card-body">
                                <CardTitle className="card-title"><h4>10 Best Places Gallery</h4></CardTitle>
                                <CardText className="card-text">Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your...</CardText>
                                <a href="#" className="btn-read-more"><span className="read-more-text">Read more</span> <BsArrowRightShort /></a>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePost;