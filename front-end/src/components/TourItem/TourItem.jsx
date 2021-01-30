import React from "react";
import { Link } from "react-router-dom";
import "./TourItem.scss";

const TourItem = (props) => {
  const convertLinkImage = (path) => {
    return path.replace(/\\/g, "/");
  }
  
  return (
    <div className="tour__item">
      {props.isFeature ? <div className="item-tag">Feature</div> : ""}
      <div className="tour__item-header">
        {(props.sale_price && props.sale_price.adult) ||
        props.sale_price.child ? (
          <div className="sale_info">{props.sale_price.adult}%</div>
        ) : (
          ""
        )}
        <img
          src={`${process.env.REACT_APP_API_URL}/${props.image}`}
          className="img-fluid"
          alt={props.title}
        />
        <Link className="btn btn-primary btn-book-now"
          to={{
            pathname: `/tours/${props.slug}`,
            state: { id: `${props._id}` },
          }}
        >
          Book now
        </Link>
      </div>
      <div className="tour__item-caption">
        <div className="tour__item-title">
          <h3 className="title">
            <Link
              to={{
                pathname: `/tours/${props.slug}`,
                state: { id: `${props._id}` },
              }}
            >
              {props.title}
            </Link>
          </h3>
          <p className="duration">
            <span>
              {props.address.split(",")[props.address.split(",").length - 1]}
            </span>
          </p>
        </div>
        <div className="tour__item-price">
          <div className="price">
            {(props.sale_price && props.sale_price.adult) ||
            props.sale_price.child ? (
              <span className="onsale">${props.sale_price.adult}</span>
            ) : (
              ""
            )}
            <div className="text-price">${props.price.adult}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;
