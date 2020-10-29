import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./PopularTours.scss";

import Korea from "../../assets/images/populars/1.jpg";
import NY from "../../assets/images/populars/newyork.jpg";
import Cali from "../../assets/images/populars/califonia.jpg";
import Los from "../../assets/images/populars/losal.jpg";
import Paris from "../../assets/images/populars/paris.jpg";
import Japan from "../../assets/images/populars/japan.jpg";
import DestinationItem from "../DestinationItem/DestinationItem";

const data = [
  {
    image: Korea,
    title: "Korea",
    options: {
      space: 7,
      hotel: 6,
      tour: 5,
    },
  },
  {
    image: NY,
    title: "NEW YORK, UNITED STATES",
    options: {
      space: 7,
      hotel: 6,
      tour: 5,
    },
  },
  {
    image: Cali,
    title: "CALIFORNIA",
    options: {
      space: 7,
      hotel: 6,
      tour: 5,
    },
  },
  {
    image: Los,
    title: "LOS ANGELES",
    options: {
      space: 7,
      hotel: 6,
      tour: 5,
    },
  },
  {
    image: Paris,
    title: "Paris",
    options: {
      space: 7,
      hotel: 6,
      tour: 5,
    },
  },
  {
    image: Japan,
    title: "Japan",
    options: {
      space: 7,
      hotel: 6,
      tour: 5,
    },
  },
];

const PopularTours = (props) => {
  return (
    <Container>
      <div className="popular__list-tour text-center">
        <h1>Top Destinations</h1>
        <p>It is a long established fact that a reader</p>
      </div>
      <div className="popular__list-item">
        <Row>
          {data.map((item) => {
            return (
              <Col lg={4} md={6}>
                <DestinationItem {...item} />
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default PopularTours;
