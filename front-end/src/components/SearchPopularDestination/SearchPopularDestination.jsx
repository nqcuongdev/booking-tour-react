import React from "react";
import "./SearchPopularDestination.scss";
import { Col, Container, Input, Row } from "reactstrap";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import hawaii from "../../assets/images/thumbnails/hawaii.jpg";
import tahi from "../../assets/images/thumbnails/tahi.jpg";
import vn from "../../assets/images/thumbnails/vn.jpg";
import ThumbnailImage from "../ThumbnailImage/ThumbnailImage";

const data = [
  {
    title: "Paris",
    image: hawaii,
  },
  {
    title: "Viet Nam",
    image: vn,
  },
  {
    title: "ThaiLand",
    image: tahi,
  },
  {
    title: "Hawaii",
    image: hawaii,
  },
  {
    title: "Tokyo",
    image: hawaii,
  },
];

const SearchPopularDestination = (props) => {
  return (
    <div className="search__popular mt-50">
      <Container>
        <Row>
          <Col md={6} lg={6}>
            <h1 className="title-text">Search our most popular destinations</h1>
            <p className="description-text">
              Vivavivu is a Multipurpose Sketch template with 06 homepages. This
              template allows you to easily and effectively create your very own
              travel booking website to offer hotel, tours, car and cruise
              bookings in minutes...
            </p>
            <Input
              type="text"
              name="search"
              className="mb-3"
              placeHolder="Search..."
              style={{ width: "50%" }}
            />
            <div className="mb-5">
              <Link className="btn-read-more">
                <span className="read-more-text">
                  View all places <BsArrowRightShort />
                </span>
              </Link>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <Row>
              {data.map((item) => {
                return (
                  <Col md={12} lg={4}>
                    <ThumbnailImage {...item} />
                  </Col>
                );
              })}
              <Col md={12} lg={4}>
                <ThumbnailImage title="" image={hawaii} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPopularDestination;
