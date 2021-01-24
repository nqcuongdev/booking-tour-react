import React from "react";
import "./RateTable.scss";
import { FaStar } from "react-icons/fa";

const RateTable = (props) => {
  return (
    <div className="rate-table">
      <div className="header">
        <p className="title">
          {props.reviews.map((review) => {
            let total = 0;
            total += review.rating;
            return total / props.reviews.length;
          })}
          <span> /5</span>
        </p>
        <div className="stars">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
        </div>
        <p className="based">based on {props.reviews.length} reviews</p>
      </div>

      <div className="item">
        <div className="item-top">
          <span>5 Stars</span>
          <span className="percent">
            {(props.reviews.filter((e) => e.rating === 5).length /
              props.reviews.length) *
              100}
            %
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={
            (props.reviews.filter((e) => e.rating === 5).length /
              props.reviews.length) *
            100
          }
        />
      </div>

      <div className="item">
        <div className="item-top">
          <span>4 Stars</span>
          <span className="percent">
            {(props.reviews.filter((e) => e.rating === 4).length /
              props.reviews.length) *
              100}
            %
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={
            (props.reviews.filter((e) => e.rating === 4).length /
              props.reviews.length) *
            100
          }
        />
      </div>

      <div className="item">
        <div className="item-top">
          <span>3 Stars</span>
          <span className="percent">
            {(props.reviews.filter((e) => e.rating === 3).length /
              props.reviews.length) *
              100}
            %
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={
            (props.reviews.filter((e) => e.rating === 3).length /
              props.reviews.length) *
            100
          }
        />
      </div>

      <div className="item">
        <div className="item-top">
          <span>2 Stars</span>
          <span className="percent">
            {(props.reviews.filter((e) => e.rating === 2).length /
              props.reviews.length) *
              100}
            %
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={
            (props.reviews.filter((e) => e.rating === 2).length /
              props.reviews.length) *
            100
          }
        />
      </div>

      <div className="item">
        <div className="item-top">
          <span>1 Stars</span>
          <span className="percent">
            {(props.reviews.filter((e) => e.rating === 1).length /
              props.reviews.length) *
              100}
            %
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={
            (props.reviews.filter((e) => e.rating === 1).length /
              props.reviews.length) *
            100
          }
        />
      </div>
    </div>
  );
};

export default RateTable;
