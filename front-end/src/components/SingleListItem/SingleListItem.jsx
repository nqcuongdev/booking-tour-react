import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Col, Row } from "reactstrap";
import "./SingleListItem.scss";
import moment from "moment";
import { Link } from "react-router-dom";

const SingleListItem = (props) => {
  const showNewBadge = (date) => {
    let currentDate = moment().diff(new Date(), "minutes");
    let itemDate = moment().diff(date + 3, "minutes");
    if (itemDate > currentDate) {
      return <div className="item__tag">New</div>;
    }
  };

  const getSubStringContent = (text) => {
    const newText = text.replace(/<[^>]+>/g, "");

    return newText.substring(0, 100);
  };

  return (
    <div className="list__item mt-3 mb-30">
      <Row>
        <Col md={5} lg={5} className="item__image">
          {showNewBadge(props.created_date)}
          <img
            src={`${process.env.REACT_APP_API_URL}/${props.image[0]}`}
            className="img-fluid"
            alt={props.title}
          />
        </Col>
        <Col md={7} lg={5} className="item__content">
          <Row>
            <div className="item__info">
              <Link //to={`tours/${props._id}`}
                to={{
                  pathname: `${props.url}/${props.slug}`,
                  state: { id: `${props._id}` },
                }}
              >
                <h4 className="title">
                  {props.title}
                </h4>
              </Link>
              <div className="item__options">
                <span className="location">
                  <FaMapMarkerAlt size={14} />
                  {
                    props.address.split(",")[
                      props.address.split(",").length - 1
                    ]
                  }
                </span>
                <span className="during float-right">
                  <FaClock size={14} />
                  {props.duration}
                </span>
              </div>
              <div className="item__description mt-3">
                {getSubStringContent(props.description)}...
              </div>
              <div className="item__button mt-3">
                <Link //to={`tours/${props._id}`}
                  to={{
                    pathname: `${props.url}/${props.slug}`,
                    state: { id: `${props._id}` },
                  }}
                >
                  <Button color="orange" size="sm" className="mr-3">
                    Book now
                  </Button>
                </Link>
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
