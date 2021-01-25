import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./PopularTours.scss";

import DestinationItem from "../DestinationItem/DestinationItem";

const PopularTours = (props) => {
  return (
    <Container>
      <div className="popular__list-tour text-center">
        <h1>Top Destinations</h1>
        <p>It is a long established fact that a reader</p>
      </div>
      <div className="popular__list-item">
        <Row>
          {props.data.slice(0, 6).map((item) => {
            if (item.isFeatured) {
              return (
                <Col lg={4} md={6} key={item._id}>
                  <DestinationItem {...item} />
                </Col>
              );
            }
          })}
        </Row>
      </div>
    </Container>
  );
};

export default PopularTours;
