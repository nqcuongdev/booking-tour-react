import React, { useState, useEffect, useContext } from "react";
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
import Maps from "../components/Maps/Maps";
import Comment from "../components/Comment/Comment";
import RateTable from "../components/RateTable/RateTable";
import CommentForm from "../components/CommentForm/CommentForm";
import BookTour from "../components/BookTour/BookTour";
import ToursApi from "../api/toursApi";
import AuthContext from "../contexts/auth";
import { ToastContainer, toast } from 'react-toastify';

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

const TourDetail = (props) => {
  const [book, setBook] = useState(false);
  const [tour, setTour] = useState();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchTourDetail = async (id) => {
      try {
        const response = await ToursApi.get(id);
        if (response.success) {
          setTour(response.data);
          setReviews(response.reviews);

          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    //console.log(props.location.state.id);
    if (props.location.state.id) {
      fetchTourDetail(props.location.state.id);
    } else {
      props.history.push("/tours");
    }

    // cuộn lên đầu trang
    window.scrollTo(0, 0)
  }, []);

  const context = useContext(AuthContext);
  const user = context.user

  const toggleBook = () => {
    if (user._id !== undefined) {
      setBook(!book)
    } else {
      toast.error(`You must login before booking!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

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

        <Container className="mt-30">
          <CarouselSlide image={tour && tour.image} />
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
                  toggleBook();
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
            Tour reviews<span> ({reviews ? reviews.length : 0})</span>
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
                      <span>View more</span> ({reviews ? reviews.length : 0})
                    </p>
                  </Link>
                </div>
              )}
            </Col>
            <Col xl={3}>
              {reviews.length > 0 && (
                <RateTable data={tour} reviews={reviews} />
              )}
            </Col>
          </Row>
        </Container>

        <Container className="mb-50">
          {user._id ? 
              tour && <CommentForm data={tour} /> :
              <span>(You need login to comment)</span>
          }
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
