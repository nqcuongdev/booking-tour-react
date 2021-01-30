import React from "react";
import { Link } from "react-router-dom";
import "./ThumbnailTourItem.scss";

const ThumbnailTourItem = (props) => {
  return (
    <div className="tour__item">
      <div className="tour__item-header">
        {props.sale ? (
          <div
            className="tour___item-tag"
            style={{
              background: "#7cdf6c",
            }}
          >
            -{props.sale}%
          </div>
        ) : props.saleToday ? (
          <div
            className="tour___item-tag"
            style={{
              background: "#1b3e8d",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            <span style={{ color: "yellow" }}>-{props.saleToday}%</span>
            <br /> off today
          </div>
        ) : (
          <div
            className="tour___item-tag"
            style={{
              background: "#ff7d3e",
            }}
          >
            hot
          </div>
        )}
        <img src={`${process.env.REACT_APP_API_URL}/${props.image}`} className="img-fluid" alt={props.title} />
        <ul className="tour__item-button">
          <Link className="btn btn-orange mr-2" style={{ width: "auto" }}
            to={{
              pathname: `../tours/${props.slug}`,
              state: { id: `${props.id}` },
            }}
          >
            Book now
          </Link>
          <Link className="btn btn-detail"
            to={{
              pathname: `../tours/${props.slug}`,
              state: { id: `${props.id}` },
            }}
          >
            View detail
          </Link>
        </ul>
      </div>
      <div className="tour__item-caption">
        <div className="tour__item-title">
          <h3 className="title">
            <Link
              to={{
                pathname: `../tours/${props.slug}`,
                state: { id: `${props.id}` },
              }}
            >
              {props.title}
            </Link>
          </h3>
          <p className="duration">
            {props.duration}
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
