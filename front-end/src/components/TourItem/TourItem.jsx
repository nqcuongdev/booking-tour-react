import React from "react";
import { Link } from "react-router-dom";
import "./TourItem.scss";

const TourItem = (props) => {
  return (
    <div className="tour__item">
      {props.isFeature ? <div className="item-tag">Feature</div> : ""}
      <div className="tour__item-header">
        {props.salePrice ? (
          <div className="sale_info">{props.salePrice}%</div>
        ) : (
          ""
        )}
        <img src={props.image} className="img-fluid" alt={props.title} />
        <Link className="btn btn-primary btn-book-now">Book now</Link>
      </div>
      <div className="tour__item-caption">
        <div className="tour__item-title">
          <h3 className="title">
            <Link>{props.title}</Link>
          </h3>
          <p className="duration">
            <span>{props.options.time}</span>{" "}
            {props.options.time > 1 ? "hours" : "hour"} -{" "}
            <i>{props.options.place}</i>
          </p>
        </div>
        <div className="tour__item-price">
          <div className="price">
            {props.onSale ? (
              <span className="onsale">${props.onSale}</span>
            ) : (
              ""
            )}
            <div className="text-price">${props.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;
