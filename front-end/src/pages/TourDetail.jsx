import React from "react";
import {
    FaMapMarkerAlt,
    FaRegCalendarAlt,
    FaRegClock,
    FaStarHalfAlt, 
    FaStar, 
    FaRegStar
} from "react-icons/fa";
import { Container, Row, Col } from "reactstrap";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import CarouselSlide from '../components/CarouselSlide/CarouselSlide';
import tourImage_1 from '../assets/images/posts/post-1.jpg';
import tourImage_2 from '../assets/images/posts/post-2.jpg';
import tourImage_3 from '../assets/images/posts/post-3.jpg';
import tourImage_4 from '../assets/images/posts/post-4.jpg';

const starsCounter = (stars) => {
    const counter = [1, 2, 3, 4, 5];
    if (Number.isInteger(stars)) {
        return (
            counter.map(i => {
                if (i <= stars) {
                    return (
                        <FaStar className="stars" />
                    );
                } else {
                    return (
                        <FaRegStar className="stars" />
                    );
                }
            })
        )
    } else {
        const roundStars = Math.round(stars)
        return (
            counter.map(i => {
                if (i < roundStars) {
                    return (
                        <FaStar className="stars" />
                    );
                } else if (i === roundStars) {
                    return (
                        <FaStarHalfAlt className="stars" />
                    );
                } else {
                    return (
                        <FaRegStar className="stars" />
                    )
                }
            })
        )
    }
};

const tourData = {
    title: 'Alaska Adventure',
    location: ' Alaska',
    duration: '3 days 2 nights',
    time: 'September, 2019',
    price: '299',
    rateStars: 4.6,
    view: 144,
    images: [
        tourImage_2,
        tourImage_3,
        tourImage_4,
        tourImage_1
    ],
};

const TourDetail = (props) => {
    const renderStar = (num) => {
        [Array(num).keys()].map((n) => {
        return <FaStar key={n + 1} />;
        });
    };

    return (
        <MainLayout>
            <div className="tours-detail">
                <div className="tour-detail-link">
                    <Container>
                        <span><span><Link to="/">Home</Link> / <Link to="/hotels">Tours</Link> /</span> {tourData.title}</span>
                    </Container>
                </div>

                <Container className="tour-detail-main mt-30 pt-30">
                    <Row className="header">
                        <Col xl={6} lg={6} md={6} xs={12} className="header-left">
                            <p className="title">{tourData.title}</p>

                            <ul className="title-list">
                                <li className="location">
                                    <FaMapMarkerAlt /> {tourData.location}
                                </li>
                                <li>
                                    <FaRegClock /> {tourData.duration}
                                </li>
                                <li>
                                    <FaRegCalendarAlt /> {tourData.time}
                                </li>
                            </ul>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={12} className="header-right">
                            <div className="price">
                                <span>$ {tourData.price}</span>
                            </div>
                            <div className="rate-stars">
                                <div className="stars-counter">
                                    <span className="stars-number-calculation">
                                        {starsCounter(tourData.rateStars)}
                                    </span>
                                    <span className="stars-number">
                                        <span>{tourData.rateStars}</span><span className="below"> /5</span>
                                    </span>
                                </div>
                                <p className="view">Based on {tourData.view} views</p>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <CarouselSlide images={tourData.images} />
                </Container>

                <Container>
                    <div className="tours__detail-tag mt-3 mb-3">
                        <ul>
                        <li>Insurance</li>
                        <li>all drink included</li>
                        <li>lunch in restaurant</li>
                        <li>tour guide</li>
                        <li>travel Insurance</li>
                        </ul>
                    </div>
                </Container>
            </div>
        </MainLayout>
    );
};

export default TourDetail;
