import React from "react";
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { AiOutlineSearch, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import AdItem from "../components/AdItem/AdItem";
import adImage from "../assets/images/ad.png";
import post_1 from "../assets/images/posts/post-1.jpg";
import post_2 from "../assets/images/posts/post-2.jpg";
import post_3 from "../assets/images/posts/post-3.jpg";
import Paginate from "../components/Paginate/Paginate";
import { FaMapMarkerAlt } from "react-icons/fa";

const popularDestinations = [
    'Rome', 'Indonesia', 'London', 'venice', 'paris', 'florence', 'tokyo', 'vietnam', 'thailand'
];

const faqs = [
    'How do search?', 'How do I make reservation?', 'How can I manage instant book settings?', 'How do I use my calendar?'
];

const popularItem = {
    text1: "Bali",
    text2: "where to stay!",
    image: adImage,
};

const destinationList = [
    {
        title: 'Alaska',
        image: post_3,
        country: 'Alaska',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...'
    },
    {
        title: 'Berlin',
        image: post_2,
        country: 'Germany',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...'
    },
    {
        title: 'Hawaii',
        image: post_1,
        country: 'us state',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...'
    },
    {
        title: 'Mu Cang Chai',
        image: post_2,
        country: 'viet nam',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...'
    },
    {
        title: 'London',
        image: post_3,
        country: 'england',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...'
    }
]

const Destinations = props => {
    return (
        <MainLayout>
            <div className="destinations">
                <BreadcrumbBanner pageName="Destinations" backgroundImage={bannerBackground} />

                <Container className="destinations-main mt-50">
                    <Row className="mb-50">
                        <Col xl={3} lg={3} md={3} xs={12} className="destinations-main-sidebar">
                            <p className="title">Search</p>
                            <div className="search">
                                <Input placeholder="Search keyword" />
                                <Button><AiOutlineSearch className="search-icon" /></Button>
                            </div>
                            <div className="popular-destinations">
                                <p className="title">Popular destinations</p>
                                <Row>
                                    {popularDestinations.map(category => {
                                        return (
                                            <Col xl={6} className="item">
                                                <Link to="#"><AiFillCaretRight/> {category}</Link>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                            <div className="faqs">
                                <p className="title">FAQ’s</p>
                                {faqs.map(faq => {
                                        return (
                                            <p className="item">
                                                <Link to="#"><AiFillCaretRight/> {faq}</Link>
                                            </p>
                                        );
                                    })}
                            </div>

                            <AdItem {...popularItem} />
                        </Col>

                        <Col xl={9} lg={9} md={9} xs={12} className="destinations-main-content">
                            <div className="destination-item">
                                <Container>
                                    {destinationList.map(item => {
                                        return (
                                            <Row className="item">
                                                <Col xl={5} lg={5} md={5} xs={12} className="image">
                                                    <img src={item.image} alt=""/>
                                                </Col>
                                                <Col xl={7} lg={7} md={7} xs={12} className="content">
                                                    <p className="title">{item.title}</p>
                                                    <p className="country">{item.country}</p>
                                                    <p className="description">{item.description}</p>
                                                    <div className="button">
                                                        <Button className="view-detail">View detail</Button>
                                                        <Link className="view-map">
                                                            <FaMapMarkerAlt className="icon" /> <span>View on map</span>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    })}
                                </Container>
                            </div>

                            <Paginate />
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainLayout>
    )
}

export default Destinations;