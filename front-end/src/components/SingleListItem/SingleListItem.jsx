import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Col, Row } from "reactstrap";
import "./SingleListItem.scss";

const SingleListItem = (props) => {
  return (
    <div className="list__item mt-3 mb-30">
      <Row>
        <Col md={5} lg={5} className="item__image">
          <div className="item__tag">New</div>
          <img src={props.image} className="img-fluid" alt={props.title} />
        </Col>
        <Col md={7} lg={5} className="item__content">
          <Row>
            <div className="item__info">
              <h4 className="title">{props.title}</h4>
              <div className="item__options">
                <span className="location">
                  <FaMapMarkerAlt size={14} />
                  {props.option.place}
                </span>
                <span className="during float-right">
                  <FaClock size={14} />
                  {props.option.day} days {props.option.night} nights
                </span>
              </div>
              <div className="item__description mt-3">{props.description}</div>
              <div className="item__button mt-3">
                <Button color="orange" className="mr-3">
                  Book now
                </Button>
                <Button color="detail">Book now</Button>
              </div>
            </div>
            <div className="price"></div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SingleListItem;
