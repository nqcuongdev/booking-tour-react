import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { Container, Row, Col, Input, Button } from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import PopularDestinations from "../components/PopularDestinations/PopularDestinations";
import Faq from "../components/Faq/Faq";
import hotel_1 from "../assets/images/populars/1.jpg";
import hotel_2 from "../assets/images/populars/califonia.jpg";
import {
  FaMapMarkerAlt,
  FaStarHalfAlt,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import CarouselSlide from "../components/CarouselSlide/CarouselSlide";
import ThumbnailTourItem from "../components/ThumbnailTourItem/ThumbnailTourItem";
import Korea from "../assets/images/populars/1.jpg";
import NY from "../assets/images/populars/newyork.jpg";
import Maps from "../components/Maps/Maps";
import avatar_1 from "../assets/images/avatar-testimonial/avatar-1.jpg";
import avatar_2 from "../assets/images/avatar-testimonial/avatar-2.jpg";
import avatar_3 from "../assets/images/avatar-testimonial/avatar-3.jpg";
import Comment from "../components/Comment/Comment";
import CommentForm from "../components/CommentForm/CommentForm";
import DestinationApi from "../api/destinationsApi";

const popularDestinations = [
  "Rome",
  "Indonesia",
  "London",
  "venice",
  "paris",
  "florence",
  "tokyo",
  "vietnam",
  "thailand",
];

const faqs = [
  "How do search?",
  "How do I make reservation?",
  "How can I manage instant book settings?",
  "How do I use my calendar?",
];

const popularHotelInHere = [
  {
    image: hotel_1,
    title: "Suarsena House",
    location: "297 Luna Alley Apt.327",
    rateStars: 4.8,
  },
  {
    image: hotel_2,
    title: "Pent House",
    location: "297 Luna Alley Apt.327",
    rateStars: 4.5,
  },
  {
    image: hotel_1,
    title: "Suarsena House",
    location: "297 Luna Alley Apt.327",
    rateStars: 4.8,
  },
  {
    image: hotel_2,
    title: "Pent House",
    location: "297 Luna Alley Apt.327",
    rateStars: 4.5,
  },
];

const toursData = [
  {
    title: "The Bahamas",
    price: 299,
    image: NY,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
    sale: null,
    saleToday: null,
  },
  {
    title: "The Bahamas",
    price: 299,
    image: Korea,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
    sale: null,
    saleToday: 25,
  },
];

const commentData = [
  {
    avatar: avatar_1,
    name: "Quoc Cuong",
    content: "Bài viết hay quá nà, lần sau đừng viết nữa nha. Hihi",
    rateStars: 4,
    national: "Vietnamese",
  },
  {
    avatar: avatar_2,
    name: "Chou Chou",
    content: "Bạn trên comment kỳ quá à, ai lại nói thẳng ra thế bao giờ :v",
    rateStars: 5,
    national: "Japan",
  },
  {
    avatar: avatar_3,
    name: "Hun Hun",
    content: "Hai thằng trên im đê, ý kiến lên phường...",
    rateStars: 3,
    national: "Laos",
  },
];

const starsCounter = (stars) => {
  const counter = [1, 2, 3, 4, 5];
  if (Number.isInteger(stars)) {
    return counter.map((i) => {
      if (i <= stars) return <FaStar className="stars" />;
      else return <FaRegStar className="stars" />;
    });
  } else {
    const roundStars = Math.round(stars);
    return counter.map((i) => {
      if (i < roundStars) return <FaStar className="stars" />;
      else if (i === roundStars) return <FaStarHalfAlt className="stars" />;
      else return <FaRegStar className="stars" />;
    });
  }
};

const DestinationDetail = (props) => {
  const [destination, setDestination] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const id = props.location.state.id;
        const response = await DestinationApi.show(id);

        setDestination(response.data);
        setImageList(response.data.image);
      } catch (error) {
        console.log("Fail to fetch Destination: ", error);
      }
    };
    fetchDestinations();
  }, []);

  let location = {
    center: {
      lat: destination.lat,
      lng: destination.lng,
    },
    zoom: destination.map_zoom,
    address: destination.address,
  };

  // const location = {
  //     center: {
  //       lat: 15.9750157,
  //       lng: 108.2510487,
  //     },
  //     zoom: 17,
  //     address: "VKU",
  // };

  return (
    <MainLayout>
      <div className="destination-detail">
        <div className="destination-detail-link">
          <Container>
            <span>
              <span>
                <Link to="/">Home</Link> /{" "}
                <Link to="/Destinations">Destinations</Link> /
              </span>{" "}
              {destination.title}
            </span>
          </Container>
        </div>

        <Container className="destination-detail-main mt-50">
          <Row>
            <Col
              xl={4}
              lg={4}
              md={6}
              xs={12}
              className="destination-detail-main-sidebar"
            >
              <p className="title">Search</p>
              <div className="search">
                <Input placeholder="Search keyword" />
                <Button>
                  <AiOutlineSearch className="search-icon" />
                </Button>
              </div>

              <PopularDestinations popularDestinations={popularDestinations} />

              <div className="popular-hotel-in-here mt-30 mb-50">
                <p className="title">Popular hotels in {destination.title}</p>
                {popularHotelInHere.map((hotel) => {
                  return (
                    <Row className="popular-hotel-item">
                      <Col
                        xl={4}
                        lg={4}
                        md={5}
                        xs={5}
                        className="popular-hotel-image"
                      >
                        <Link to="#">
                          <div
                            className="item-image"
                            style={{ backgroundImage: `url(${hotel.image})` }}
                          ></div>
                        </Link>
                      </Col>
                      <Col xl={8} lg={8} md={7} xs={7}>
                        <p className="item-title">
                          <Row>
                            <Col xl={8} lg={7} md={7} xs={7}>
                              <Link to="#" className="link">
                                {hotel.title}
                              </Link>
                            </Col>
                            <Col
                              xl={4}
                              lg={5}
                              md={5}
                              xs={5}
                              className="item-right"
                            >
                              <FaStar className="icon" />
                              <span>
                                <span className="stars">{hotel.rateStars}</span>{" "}
                                /5
                              </span>
                            </Col>
                          </Row>
                        </p>
                        <p className="item-location">{hotel.location}</p>
                        <Link className="view-map">
                          <FaMapMarkerAlt className="icon" />{" "}
                          <span>View on map</span>
                        </Link>
                      </Col>
                    </Row>
                  );
                })}
              </div>

              <Faq faqs={faqs} />
            </Col>

            <Col
              xl={8}
              lg={8}
              md={6}
              xs={12}
              className="destination-detail-main-content"
            >
              <Row className="header">
                <Col xl={6} lg={6} md={6} xs={12} className="header-left">
                  <p className="title">{destination.title}</p>
                  <p className="location">{destination.address}</p>
                </Col>
                <Col xl={6} lg={6} md={6} xs={12} className="header-right">
                  <div className="rate-stars">
                    <div className="stars-counter">
                      <span className="stars-number-calculation">
                        {starsCounter(destination.rating)}
                      </span>
                      <span className="stars-number">
                        <span>{destination.rating}</span>
                        <span className="below"> /5</span>
                      </span>
                    </div>
                    <p className="view">Based on {destination.views} views</p>
                  </div>
                </Col>
              </Row>

              <CarouselSlide image={imageList} />

              <div className="description">
                <p
                  dangerouslySetInnerHTML={{ __html: destination.description }}
                ></p>
              </div>

              <div className="tour-packages mt-50">
                <p className="title">Tour packages</p>
                <Row className="pt-20 pb-50">
                  {toursData.map((tour) => {
                    return (
                      <Col xl={6} lg={6} md={6} sx={12} className="mb-30">
                        <ThumbnailTourItem
                          image={tour.image}
                          title={tour.title}
                          option={tour.option}
                          price={tour.price}
                          sale={tour.sale}
                          saleToday={tour.saleToday}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>

              <div className="description">
                <p
                  dangerouslySetInnerHTML={{ __html: destination.description }}
                ></p>
              </div>

              <div
                className="google-map mt-50 mb-50"
                style={{ height: "350px", width: "100%" }}
              >
                <Maps {...location} />
              </div>

              <div className="comments mb-50">
                <p className="comments-title">
                  Tour reviews<span> (69)</span>
                </p>
                <div className="comments-list mt-30">
                  {commentData.map((comment) => {
                    return (
                      <Comment
                        avatar={comment.avatar}
                        name={comment.name}
                        content={comment.content}
                        rateStars={comment.rateStars}
                        national={comment.national}
                      />
                    );
                  })}
                </div>
                <div className="view-more-comment mt-30 mb-30">
                  <Link>
                    <p>
                      <span>View more</span> (69)
                    </p>
                  </Link>
                </div>
              </div>

              <div className="mb-50">
                {destination && <CommentForm data={destination} />}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default DestinationDetail;
