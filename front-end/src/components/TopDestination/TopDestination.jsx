import React from 'react';
import './TopDestination.scss';
import { Col, Container, Row } from 'reactstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader for Carousel
import { Carousel } from 'react-responsive-carousel';
import { RiStarSFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import post_1 from '../../assets/images/posts/post-1.jpg';
import post_2 from '../../assets/images/posts/post-2.jpg';
import post_3 from '../../assets/images/posts/post-3.jpg';
import post_4 from '../../assets/images/posts/post-4.jpg';
import { Link } from 'react-router-dom';

const carouselData = [
    {
        image: post_1,
        title: 'Danang City',
        destination: 'Port Danang',
        stars: 4.7
    },
    {
        image: post_2,
        title: 'Hoi An City',
        destination: 'Port Quang Nam',
        stars: 4.5
    },
    {
        image: post_3,
        title: 'Hue City',
        destination: 'Port Hue',
        stars: 4.2
    },
    {
        image: post_4,
        title: 'Quy Nhon City',
        destination: 'Port Binh Dinh',
        stars: 4.6
    },
];

const destinationList = [
    {
        image: post_1,
        name: 'Novotel',
        address: '36 Bach Dang Street, Hai Chau, Da Nang',
        stars: 4.6,
        location: {
            lat: 69,
            long: 69
        }
    },
    {
        image: post_2,
        name: 'Muong Thanh',
        address: '270 Vo Nguyen Giap, Bac My Phu, Ngu Hanh Sơn, Da Nang',
        stars: 4.4,
        location: {
            lat: 37,
            long: 37
        }
    },
    {
        image: post_3,
        name: 'Sky36 Bar',
        address: '36 Bach Dang, Thach Thang, Ha Chau, Da Nang',
        stars: 4.1,
        location: {
            lat: 37,
            long: 37
        }
    }
];

const TopDestination = (props) => {
    return (
        <div className="top-destination">
            <Container>
                <div className="top-destination-header">
                    <h2>Best beaches of 2020</h2>
                    <p><b>Book hotel in top destinations</b></p>
                </div>
                <Row>
                    <Col lg={7} md={12} xs={12} className="top-destination-content">
                        <Carousel>
                            {carouselData.map(carousel => {
                                return (
                                    <div>
                                        <img src={carousel.image} />
                                        <div className="bottom-opacity"></div>
                                        <div className="legend">
                                            <Row>
                                                <Col lg={6} md={6} xs={6} className="legend-left">
                                                    <h4>{carousel.title}</h4>
                                                    <p>{carousel.destination}</p>
                                                </Col>
                                                <Col lg={6} md={6} xs={6} className="legend-right">
                                                    <RiStarSFill size={24} color="#FFE54A" className="stars" />
                                                    <span className="stars-rate"> {carousel.stars}</span> /5
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                );
                            })}
                        </Carousel>
                    </Col>
                    <Col lg={5} md={12} xs={12} className="top-destination-list">
                        {destinationList.map(destination => {
                            return (
                                <div  className="top-destination-item">
                                    <Row>
                                        <Col lg={4} md={4} xs={4} >
                                            <div className="image">
                                                <Link to="#"><img src={destination.image} /></Link>
                                            </div>
                                        </Col>
                                        <Col lg={5} md={5} xs={5} className="destination-content">
                                            <Link to="#"><h5 className="name"><b>{destination.name}</b></h5></Link>
                                            <p className="address">{destination.address}</p>
                                            <span className="view-on-map">
                                                <MdLocationOn size={20} className="location-icon"/>
                                                <Link to={destination.location}>View on map</Link>
                                            </span>
                                        </Col>
                                        <Col lg={3} md={3} xs={3} >
                                            <RiStarSFill color="#FFE54A" className="stars" />
                                            <span className="stars-rate"> {destination.stars}</span> /5
                                        </Col>
                                    </Row>
                                    <hr />
                                </div>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TopDestination;