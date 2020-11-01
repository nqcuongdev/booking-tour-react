import React from "react";
import { Link } from "react-router-dom";
import "./ThumbnailTourItem.scss";

const ThumbnailTourItem = (props) => {
  return (
    <div className="tour__item">
      <div className="tour__item-header">
        <img src={props.image} className="img-fluid" alt={props.title} />
        <ul className="tour__item-button">
          <Link className="btn btn-orange mr-2" style={{ width: "auto" }}>
            Book now
          </Link>
          <Link className="btn btn-detail">View detail</Link>
        </ul>
      </div>
      <div className="tour__item-caption">
        <div className="tour__item-title">
          <h3 className="title">
            <Link>{props.title}</Link>
          </h3>
          <p className="duration">
            {props.option.during} DAYS - {props.option.place}
          </p>
        </div>
        <div className="tour__item-price">
          <div className="price" style={{ paddingTop: 0 }}>
            <div className="text-price" style={{ color: "#ff7d3e" }}>
              ${props.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailTourItem;