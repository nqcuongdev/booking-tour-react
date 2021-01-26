import React from "react";
import "./Hotel.scss";
import {
  Card,
  CardImg,
  CardBody,
  Row,
  Button,
  CardImgOverlay,
  Col,
} from "reactstrap";
import { RiStarSFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import { AiFillTag } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const Hotel = (props) => {
  const history = useHistory();
  const getSubStringContent = (text) => {
    const newText = text.replace(/<[^>]+>/g, "");

    return newText.substring(0, 50);
  };
  return (
    <div className="hotel">
      <Card>
        <CardImg top width="100%" src="{props.image}" alt="Card image cap" />

        <CardImgOverlay style={{ backgroundImage: `url(${props.image})` }}>
          <div className="bottom-opacity"></div>
          <div className="overlay-item">
            <p>START FROM</p>
            <span>$ {props.price}</span>
          </div>
        </CardImgOverlay>

        <CardBody>
          <div className="hotel-name-rate">
            <Link //to={`/hotels/${props._id}`}
              to={{
                pathname: `${props.url}/${props.slug}`,
                state: { id: `${props._id}` },
              }}
            >
              <p className="hotel-name">{props.name}</p>
            </Link>

            <p className="hotel-rate">
              <RiStarSFill className="stars" />
              {props.rateStars} /<span>5</span>
            </p>
          </div>
          <div className="hotel-location">
            <MdLocationOn className="location-icon" />{" "}
            {props.address.split(",")[props.address.split(",").length - 1]}
          </div>
          <div className="hotel-tag mb-10">
            <AiFillTag />
            {props.tags.map((tag, index) => {
              if (index < props.tags.length - 1) {
                return <span> {tag.title}/</span>;
              } else {
                return <span> {tag.title}</span>;
              }
            })}
          </div>
          <div className="hotel-description mb-20">
            {getSubStringContent(props.description)}...
          </div>
          <Row className="button-group">
            <Col lg={6} md={6} xs={6}>
              <Link
                to={{
                  pathname: `${props.url}/${props.slug}`,
                  state: { id: `${props._id}` },
                }}
              >
                <Button className="btn-book-now">Book now</Button>
              </Link>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <Link
                to={{
                  pathname: `${props.url}/${props.slug}`,
                  state: { id: `${props._id}` },
                }}
              >
                <Button className="btn-view-detail">View detail</Button>
              </Link>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default Hotel;
