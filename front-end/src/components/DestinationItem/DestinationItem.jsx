import React from "react";
import { Link } from "react-router-dom";
import "./DestinationItem.scss";

const DestinationItem = (props) => {
  return (
    <div className="destination__item">
      <div
        className="destination__image"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_URL}/${props.image[0]})`,
        }}
      >
        <div className="destination__overlay"></div>
        <div className="destination__content">
          <Link to={`/destinations/${props._id}`} style={{ color: "black" }}>
            <h4 className="title">{props.title}</h4>
          </Link>
          <div className="desc">
            <Link to="/">0 Spaces</Link>
            <Link to="/">{props.hotel_count.length} Hotels</Link>
            <Link to="/">{props.tour_count.length} Tours</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationItem;
