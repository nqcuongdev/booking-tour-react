import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./WhyChooseUs.scss";
import WhyChooseUsImage from "../../assets/images/unnamed.jpg";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  return (
    <div className="whychoose mt-50">
      <Container>
        <Row>
          <Col md={6} lg={6}>
            <img
              src={WhyChooseUsImage}
              className="img-fluid"
              style={{ height: "100%" }}
            />
          </Col>
          <Col md={6} lg={6} className="whychoose__text">
            <h1 className="title-text">Why choose us</h1>
            <p className="description-text">
              Vivavivu is a Multipurpose Sketch template with 06 homepages. This
              template allows you to easily and effectively create your very own
              travel booking website to offer hotel, tours, car and cruise
              bookings in minutes...
            </p>
            <div className="whychoose__list">
              <ul className="whychoose__list-item">
                <li>
                  <FaAngleRight size={18} /> Special Activities
                </li>
                <li>
                  <FaAngleRight size={18} /> Handpicked Hotels
                </li>
                <li>
                  <FaAngleRight size={18} /> Handpicked Hotels
                </li>
                <li>
                  <FaAngleRight size={18} /> Travel Arrangements
                </li>
              </ul>
              <ul className="whychoose__list-item float-right">
                <li>
                  <FaAngleRight size={18} /> +12 Premium city tours
                </li>
                <li>
                  <FaAngleRight size={18} /> Handpicked Hotels
                </li>
                <li>
                  <FaAngleRight size={18} /> Special Activities
                </li>
                <li>
                  <FaAngleRight size={18} /> Location manager
                </li>
              </ul>
            </div>
            <div className="whychoose__button">
              <Link to="/destinations">
                <Button color="primary" className="mr-5">
                  Purchase now
                </Button>
              </Link>
              <Link to="/destinations">
                <Button color="secondary" className="left-button">
                  Purchase now
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WhyChooseUs;
