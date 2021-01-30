import React, { useEffect, useState, useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { MdLocationOn } from "react-icons/md";
import { FaStarHalfAlt, FaStar, FaRegStar, FaTag } from "react-icons/fa";
import CarouselSlide from "../components/CarouselSlide/CarouselSlide";
import hotelRoom1 from "../assets/images/hotels/hotel-1/hotel-room-1.jpg";
import hotelRoom2 from "../assets/images/hotels/hotel-1/hotel-room-2.jpg";
import Room from "../components/Room/Room";
import { IoMdFlower } from "react-icons/io";
import { FaHamburger } from "react-icons/fa";
import { GiBroom } from "react-icons/gi";
import { RiHomeHeartFill } from "react-icons/ri";
import Comment from "../components/Comment/Comment";
import RateTable from "../components/RateTable/RateTable";
import CommentForm from "../components/CommentForm/CommentForm";
import ThumbnailHotelItem from "../components/ThumbnailHotelItem/ThumbnailHotelItem";
import HotelApi from "../api/hotelApi";
import AuthContext from "../contexts/auth";

const similarHotelData = [
  {
    title: "Suarsena House",
    image: hotelRoom2,
    sale: 20,
    rateStars: 4.7,
    location: "297 Luna Alley Apt. 327",
  },
  {
    title: "Suarsena House",
    image: hotelRoom1,
    rateStars: 4.2,
    location: "297 Luna Alley Apt. 327",
  },
  {
    title: "Suarsena House",
    image: hotelRoom2,
    rateStars: 4.5,
    location: "297 Luna Alley Apt. 327",
  },
];

const starsCounter = (stars) => {
  const counter = [1, 2, 3, 4, 5];
  if (Number.isInteger(stars)) {
    return counter.map((i) => {
      if (i <= stars) {
        return <FaStar className="stars" />;
      } else {
        return <FaRegStar className="stars" />;
      }
    });
  } else {
    const roundStars = Math.round(stars);
    return counter.map((i) => {
      if (i < roundStars) {
        return <FaStar className="stars" />;
      } else if (i === roundStars) {
        return <FaStarHalfAlt className="stars" />;
      } else {
        return <FaRegStar className="stars" />;
      }
    });
  }
};

const HotelDetail = (props) => {
  const [hotel, setHotel] = useState();
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [popularHotels, setPopularHotels] = useState([]);

  useEffect(() => {
    const fetchHotelDetail = async (id) => {
      const response = await HotelApi.show(id);
      if (response.success) {
        setHotel(response.data);
        setRooms(response.rooms);
        setReviews(response.reviews);
      }
    };

    const fetchPopularHotel = async () => {
      try {
        const response = await HotelApi.getAll();

        if (response.success) {
          setPopularHotels(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (props.location.state.id) {
      fetchHotelDetail(props.location.state.id);
      fetchPopularHotel();
    } else {
      props.history.push("/hotels");
    }

    // cuộn lên đầu trang
    window.scrollTo(0, 0)
  }, [props.location.state.id]);

  let ratingCalculation = (ratingList) => {
    let totalRatingNumber = 0;
    ratingList.map((rate) => {
      totalRatingNumber += rate.rating
    })
    return totalRatingNumber / ratingList.length
  }

  const UserContext = useContext(AuthContext)
  const user = UserContext.user

  return (
    <MainLayout>
      {hotel && (
        <div className="hotel-detail">
          <div className="hotel-detail-link">
            <Container>
              <span>
                <span>
                  <Link to="/">Home</Link> / <Link to="/hotels">Hotels</Link> /
                </span>{" "}
                {hotel.title}
              </span>
            </Container>
          </div>

          <Container className="hotel-detail-main mt-30 pb-30 pt-30">
            <Row className="hotel-detail-main-header">
              <Col
                xl={6}
                lg={6}
                md={6}
                xs={12}
                className="hotel-detail-main-header-left"
              >
                <p className="title">{hotel.title}</p>
                <div className="location-tags">
                  <p className="location">
                    <MdLocationOn />{" "}
                    {
                      hotel.address.split(",")[
                        hotel.address.split(",").length - 1
                      ]
                    }
                  </p>
                  <p className="tags">
                    <FaTag />
                    {hotel.attributes.map((tag, index) => {
                      return index + 1 != hotel.attributes.length ? (
                        <span key={tag._id}> {tag.title} /</span>
                      ) : (
                        <span key={tag._id}> {tag.title}</span>
                      );
                    })}
                  </p>
                </div>
              </Col>
              <Col
                xl={6}
                lg={6}
                md={6}
                xs={12}
                className="hotel-detail-main-header-right"
              >
                <div className="rate-stars">
                  <div className="stars-counter">
                    <span className="stars-number-calculation">
                      {reviews.length > 0 ? starsCounter(ratingCalculation(reviews)) : 0}
                    </span>
                    <span className="stars-number">
                      <span>
                        {reviews.length > 0 ? ratingCalculation(reviews) : 0}
                      </span>
                      <span className="below"> /5</span>
                    </span>
                  </div>
                  <p className="view">Based on {reviews.length} views</p>
                </div>
              </Col>
            </Row>
          </Container>

          <Container>
            <CarouselSlide image={hotel.image} />

            <div className="hotel-detail-option-tag mt-3 mb-3">
              <ul>
                {hotel.attributes.map((option, index) => {
                  if (index === 0) {
                    return <li key={option._id}>{option.title}</li>;
                  } else {
                    return (
                      <li key={option._id}>
                        <span>•</span>
                        {option.title}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </Container>

          <Container className="room-type mt-50 mb-30">
            <p className="room-type-title">Room Type</p>
            {rooms.map((room) => {
              return (
                <Room
                  key={room._id}
                  _id={room._id}
                  images={room.image}
                  title={room.title}
                  price={room.price}
                  people={room.people}
                  acreage={room.width}
                  attributes={room.attributes}
                  options={room.options}
                />
              );
            })}
          </Container>

          <Container className="facilities mt-50 mb-50">
            <p className="facilities-title">Facilities of {hotel.title}</p>
            <div className="facilities-body">
              <Row>
                <Col
                  xl={3}
                  lg={3}
                  md={6}
                  xs={6}
                  className="wellness-facilities facilities-body-item"
                >
                  <div>
                    <IoMdFlower className="facilities-icon" />
                  </div>
                  <div className="facilities-list">
                    <p>Wellness facilities</p>
                    <ul className="facilities-list-item">
                      {hotel.facility.map((item) => {
                        if (item.type_fac === "wellness") {
                          return item.facility_id.map((e) => {
                            return (
                              <li className="mt-2" key={e._id}>
                                {e.title}
                              </li>
                            );
                          });
                        }
                      })}
                    </ul>
                  </div>
                </Col>
                <Col
                  xl={3}
                  lg={3}
                  md={6}
                  xs={6}
                  className="food-and-drink facilities-body-item"
                >
                  <div>
                    <FaHamburger className="facilities-icon" />
                  </div>
                  <div className="facilities-list">
                    <p>Food & Drink</p>
                    <ul className="facilities-list-item">
                      {hotel.facility.map((item) => {
                        if (item.type_fac === "food") {
                          return item.facility_id.map((e) => {
                            return (
                              <li className="mt-2" key={e._id}>
                                {e.title}
                              </li>
                            );
                          });
                        }
                      })}
                    </ul>
                  </div>
                </Col>
                <Col
                  xl={3}
                  lg={3}
                  md={6}
                  xs={6}
                  className="cleaning-services facilities-body-item"
                >
                  <div>
                    <GiBroom className="facilities-icon" />
                  </div>
                  <div className="facilities-list">
                    <p>Cleaning services</p>
                    <ul className="facilities-list-item">
                      {hotel.facility.map((item) => {
                        if (item.type_fac === "cleaning") {
                          return item.facility_id.map((e) => {
                            return (
                              <li className="mt-2" key={e._id}>
                                {e.title}
                              </li>
                            );
                          });
                        }
                      })}
                    </ul>
                  </div>
                </Col>
                <Col
                  xl={3}
                  lg={3}
                  md={6}
                  xs={6}
                  className="popular-facilities facilities-body-item"
                >
                  <div>
                    <RiHomeHeartFill className="facilities-icon" />
                  </div>
                  <div className="facilities-list">
                    <p>Popular facilities</p>
                    <ul className="facilities-list-item">
                      {hotel.facility.map((item) => {
                        if (item.type_fac === "popular") {
                          return item.facility_id.map((e) => {
                            return (
                              <li className="mt-2" key={e._id}>
                                {e.title}
                              </li>
                            );
                          });
                        }
                      })}
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>

          <Container className="comments mb-50">
            <p className="comments-title">
              Guests loved their stay<span> ({reviews.length})</span>
            </p>
            <Row>
              <Col xl={9} className="comments-list mt-30">
                <div>
                  {reviews.map((comment) => {
                    return (
                      <Comment
                        key={comment._id}
                        avatar={comment.user?.image}
                        name={comment.name}
                        content={comment.content}
                        rating={comment.rating}
                      />
                    );
                  })}
                </div>
                {reviews.length > 10 && (
                  <div className="view-more-comment mt-30 mb-30">
                    <Link>
                      <p>
                        <span>View more</span> ({reviews.length})
                      </p>
                    </Link>
                  </div>
                )}
              </Col>
              <Col xl={3}>
                {reviews.length > 0 && (
                  <RateTable data={hotel} reviews={reviews} />
                )}
              </Col>
            </Row>
          </Container>

          <Container className="mb-50">
            {user._id ? 
              hotel && <CommentForm data={hotel} /> :
              <span>(You need login to comment)</span>
            }
          </Container>

          <Container className="similar-hotels mb-50">
            <p className="similar-hotels-title">Popular hotels</p>
            <Row>
              {popularHotels.slice(0, 3).map((hotel) => {
                return (
                  hotel.isFeatured &&
                    <Col lg={4} md={6} sx={12} className="mb-30">
                      <ThumbnailHotelItem
                        image={hotel.image[0]}
                        title={hotel.title}
                        sale={hotel.sale_price.adult}
                        rateStars={hotel.star}
                        address={hotel.address}
                        id={hotel._id}
                        slug={hotel.slug}
                      />
                    </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      )}
    </MainLayout>
  );
};

export default HotelDetail;
