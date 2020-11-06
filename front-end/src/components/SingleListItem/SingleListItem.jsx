import React from "react";
import { Button, Col, Row } from "reactstrap";
import "./SingleListItem.scss";

const SingleListItem = (props) => {
  return (
    <div className="list__item">
      <Row>
        <Col md={5} lg={5} className="item__image">
          <img src={props.image} className="img-fluid" alt={props.title} />
          <div className="item__tag">New</div>
        </Col>
        <Col md={7} lg={5} className="item__content">
          <Row>
            <div className="item__info">
              <h4 className="title">{props.title}</h4>
              <div className="item__options">
                <span className="location">{props.option.place}</span>
                <span className="during">
                  {props.option.day} days {props.option.night} nights
                </span>
              </div>
              <div className="item__description">{props.description}</div>
              <div className="item__button">
                <Button color="orange">Book now</Button>
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
