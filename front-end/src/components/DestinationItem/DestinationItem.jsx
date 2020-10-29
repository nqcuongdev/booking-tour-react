import React from "react";
import { Link } from "react-router-dom";
import "./DestinationItem.scss";

const DestinationItem = (props) => {
  return (
    <div className="destination__item">
      <div
        className="destination__image"
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <div className="destination__overlay"></div>
        <div className="destination__content">
          <h4 className="title">{props.title}</h4>
          <div className="desc">
            <Link to="/">{props.options.space} Spaces</Link>
            <Link to="/">{props.options.hotel} Hotels</Link>
            <Link to="/">{props.options.tour} Tours</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationItem;
