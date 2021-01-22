import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaStarHalfAlt,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import CarouselSlide from "../components/CarouselSlide/CarouselSlide";
import tourImage_1 from "../assets/images/posts/post-1.jpg";
import tourImage_2 from "../assets/images/posts/post-2.jpg";
import tourImage_3 from "../assets/images/posts/post-3.jpg";
import tourImage_4 from "../assets/images/posts/post-4.jpg";
import Maps from "../components/Maps/Maps";
import avatar_1 from "../assets/images/avatar-testimonial/avatar-1.jpg";
import avatar_2 from "../assets/images/avatar-testimonial/avatar-2.jpg";
import avatar_3 from "../assets/images/avatar-testimonial/avatar-3.jpg";
import Comment from "../components/Comment/Comment";
import RateTable from "../components/RateTable/RateTable";
import CommentForm from "../components/CommentForm/CommentForm";
import BookTour from "../components/BookTour/BookTour";
import ToursApi from "../api/toursApi";

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

const TourDetail = (props) => {
  const [book, setBook] = useState(false);
  const [tour, setTour] = useState();
  useEffect(() => {
    const fetchTourDetail = async (id) => {
      try {
        const tourDetail = await ToursApi.get(id);
        if (tourDetail.success) {
          setTour(tourDetail.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (props.match.params.id) {
      fetchTourDetail(props.match.params.id);
    }
  }, []);

  const toggleBook = () => setBook(!book);

  return (
    <MainLayout>
      <div className="tours-detail">
        <div className="tour-detail-link">
          <Container>
            <span>
              <span>
                <Link to="/">Home</Link> / <Link to="/hotels">Tours</Link> /
              </span>{" "}
              {tour && tour.title}
            </span>
          </Container>
        </div>

        <Container className="tour-detail-main mt-30 pt-30">
          <Row className="header">
            <Col xl={6} lg={6} md={6} xs={12} className="header-left">
              <p className="title">{tour && tour.title}</p>

              <ul className="title-list">
                <li className="location">
                  <FaMapMarkerAlt />{" "}
                  {tour &&
                    tour.address.split(",")[tour.address.split(",").length - 1]}
                </li>
                {/* <li>
                  <FaRegClock /> {tour && tour.duration}
                </li> */}
                <li>
                  <FaRegCalendarAlt /> {tour && tour.duration}
                </li>
              </ul>
            </Col>
            <Col xl={6} lg={6} md={6} xs={12} className="header-right">
              <div className="price">
                <span>$ {tour && tour.price && tour.price.adult}</span>
              </div>
              {props.rating && (
                <div className="rate-stars">
                  <div className="stars-counter">
                    <span className="stars-number-calculation">
                      {starsCounter(tour.rateStars)}
                    </span>
                    <span className="stars-number">
                      <span>{}</span>
                      <span className="below"> /5</span>
                    </span>
                  </div>
                  <p className="view">Based on {tour.view} views</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>

        <Container>
          <CarouselSlide images={tour && tour.images} />
        </Container>

        <Container>
          <div className="tours-detail-option-tag mt-3 mb-3">
            <ul>
              {tour &&
                tour.attributes &&
                tour.attributes.map((option, index) => {
                  if (index === 0) {
                    return <li>{option.title}</li>;
                  } else {
                    return (
                      <li>
                        <span>•</span>
                        {option.title}
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
        </Container>

        <Container className="tour-overview mt-50 mb-30">
          <p className="title">Tour Overview</p>
          {tour &&
            tour.itinerary &&
            tour.itinerary.map((day, index) => {
              if (index % 2 === 0) {
                return (
                  <Row className="day-item mb-30">
                    <Col xl={5} lg={5} md={5} xs={12} className="image">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${day.image}`}
                        alt={day.title}
                      />
                    </Col>
                    <Col xl={7} lg={7} md={7} xs={12} className="content">
                      <p className="day">{day.title}</p>
                      <p className="description">{day.description}</p>
                      <p>
                        <a
                          target="_blank"
                          href={`https://www.google.com/maps/@${tour.lat},${tour.lng},11z`}
                        >
                          <FaMapMarkerAlt /> View on map
                        </a>
                      </p>
                    </Col>
                  </Row>
                );
              } else {
                return (
                  <Row className="day-item mb-30">
                    <Col xl={7} lg={7} md={7} xs={12} className="content">
                      <p className="day">{day.title}</p>
                      <p className="description">{day.description}</p>
                      <p>
                        <a
                          target="_blank"
                          href={`https://www.google.com/maps/@${tour.lat},${tour.lng},11z`}
                        >
                          <FaMapMarkerAlt /> View on map
                        </a>
                      </p>
                    </Col>
                    <Col xl={5} lg={5} md={5} xs={12} className="image">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${day.image}`}
                        alt={day.title}
                      />
                    </Col>
                  </Row>
                );
              }
            })}
          <div className="button">
            <div>
              <Button
                className="book-now"
                onClick={() => {
                  setBook(true);
                }}
              >
                Book now
              </Button>
            </div>
          </div>
        </Container>

        <div
          className="google-map mt-50 mb-50"
          style={{ height: "475px", width: "100%" }}
        >
          {tour && (
            <Maps
              zoom={tour.map_zoom}
              lat={parseFloat(tour.lat)}
              lng={parseFloat(tour.lng)}
            />
          )}
        </div>

        <Container className="comments mb-50">
          <p className="comments-title">
            Tour reviews<span> (69)</span>
          </p>
          <Row>
            <Col xl={9} className="comments-list mt-30">
              <div>
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
            </Col>
            <Col xl={3}>
              <RateTable />
            </Col>
          </Row>
        </Container>

        <Container className="mb-50">
          <CommentForm />
        </Container>

        {tour && (
          <BookTour
            _id={tour._id}
            isOpen={book}
            toggle={toggleBook}
            title={tour.title}
            attributes={tour.attributes}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default TourDetail;
