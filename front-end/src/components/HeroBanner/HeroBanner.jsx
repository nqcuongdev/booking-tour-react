import React from "react";
import { Container, Row } from "reactstrap";
import "./HeroBanner.scss";

const HeroBanner = () => {
  return (
    <div>
      <Container>
        <Row>
          <div className="row justify-content-between align-items-center"></div>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;
