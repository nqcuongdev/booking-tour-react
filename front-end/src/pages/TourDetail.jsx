import React from "react";
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaStar,
} from "react-icons/fa";
import { Container, Row } from "reactstrap";
import MainLayout from "../layouts/MainLayout";

const TourDetail = (props) => {
  const renderStar = (num) => {
    [Array(num).keys()].map((n) => {
      return <FaStar key={n + 1} />;
    });
  };
  return (
    <MainLayout>
      <Container>
        <Row>
          <div className="tours__detail-title">
            <div className="title-left">
              <h1>Alaska Adventure</h1>
              <ul className="title-list">
                <li>
                  <FaMapMarkerAlt size={14} />
                  Alaska
                </li>
                <li>
                  <FaRegClock size={14} /> 3 days 2 nights
                </li>
                <li>
                  <FaRegCalendarAlt size={14} />
                  September, 2019
                </li>
              </ul>
            </div>
            <div className="title-right">
              <div className="review-rate">
                <div className="head">
                  <span className="price">$299</span>
                  <span className="star">{renderStar(5)}</span>
                </div>
                <div className="foot">based on 149 views</div>
              </div>
            </div>
          </div>
          <div className="tours__detail-tag mt-3 mb-3">
            <ul>
              <li>Insurance</li>
              <li>all drink included</li>
              <li>lunch in restaurant</li>
              <li>tour guide</li>
              <li>travel Insurance</li>
            </ul>
          </div>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default TourDetail;
