import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { AiOutlineSearch, AiFillCaretRight } from "react-icons/ai";
import { Link, useRouteMatch } from "react-router-dom";
import AdItem from "../components/AdItem/AdItem";
import adImage from "../assets/images/ad.png";
import post_1 from "../assets/images/posts/post-1.jpg";
import post_2 from "../assets/images/posts/post-2.jpg";
import post_3 from "../assets/images/posts/post-3.jpg";
import Paginate from "../components/Paginate/Paginate";
import { FaMapMarkerAlt } from "react-icons/fa";
import PopularDestinations from "../components/PopularDestinations/PopularDestinations";
import Faq from "../components/Faq/Faq";
import DestinationApi from "../api/destinationsApi";

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

const Destinations = props => {
    const [destinationsList, setDestinationsList] = useState([])

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const params = { pageOffset: 0 }
                const response = await DestinationApi.getAll()

                // console.log(response)
                setDestinationsList(response.data)
            } catch (error) {
                console.log('Fail to fetch Destinations list: ', error)
            }
        }

        fetchDestinations()
    }, [])

    const viewOnMap = (lat, lng, map_zoom) => {
        // window.open(`https://maps.google.com?q=${lat},${lng}`);
        window.open(`https://www.google.com/maps/@${lat},${lng},${map_zoom}z`);
    };

    const imageUrl = 'http://localhost:6969/';
    // lấy đường dẫn hiện tại
    const { url } = useRouteMatch();

    const innerHTML = (htmlCode) => {
        if (htmlCode.length <= 200) {
            return {__html: `${htmlCode}`};
        } else {
            return {__html: `${htmlCode.substring(0, 200)}...`};
        }
    }

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
                            
                            <PopularDestinations popularDestinations={popularDestinations} />

                            <Faq faqs={faqs} />

                            <AdItem {...popularItem} />
                        </Col>

                        <Col xl={9} lg={9} md={9} xs={12} className="destinations-main-content">
                            <div className="destination-item">
                                <Container>
                                    {destinationsList.map(item => {
                                        return (
                                            <Row className="item">
                                                <Col xl={5} lg={5} md={5} xs={12} className="image">
                                                    <img src={imageUrl + item.image[0]} alt=""/>
                                                </Col>
                                                <Col xl={7} lg={7} md={7} xs={12} className="content">
                                                    <p className="title">{item.title}</p>
                                                    <p className="address">{item.address}</p>
                                                    <div 
                                                        className="description" 
                                                        dangerouslySetInnerHTML={ innerHTML(item.description) }>
                                                    </div>
                                                    <div className="button">
                                                        <Link to={{
                                                            pathname: `${url}/${item.slug}`,
                                                            state: {id: `${item._id}`}
                                                        }}>
                                                            <Button className="view-detail">View detail</Button>
                                                        </Link>
                                                        <Link 
                                                            className="view-map" 
                                                            onClick={() => viewOnMap(item.lat, item.lng, item.map_zoom)}
                                                        >
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