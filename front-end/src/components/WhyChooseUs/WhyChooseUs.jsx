import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "./WhyChooseUs.scss";
import WhyChooseUsImage from "../../assets/images/unnamed.jpg";
import { FaAngleRight } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <Container className="mt-50">
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
            <Button color="primary" className="mr-5">
              Purchase now
            </Button>
            <Button color="secondary" className="left-button">
              Purchase now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WhyChooseUs;
