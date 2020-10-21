import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./HeroBanner.scss";
import banner from "../../assets/images/japan.jpg";

const HeroBanner = () => {
  return (
    <div style={{ backgroundImage: `url(${banner})` }}>
      <Container>
        <Row>
          <Col md={12} style={{ minHeight: "439px" }}>
            <div className="hero__caption text-center">
              <h4>Everyday</h4>
              <h4>a new adventure</h4>
            </div>
            <div className="hero__form-search"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;
