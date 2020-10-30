import React from "react";
import "./ThumbnailImage.scss";
import { Link } from "react-router-dom";

const ThumbnailImage = (props) => {
  return (
    <div className="thumbnail">
      {!props.title && (
        <div className="thumbnail__overlay">
          <Link to="/">+ 73 Places</Link>
        </div>
      )}
      <div className="thumbnail__image">
        <img src={props.image} className="img-fluid" alt="Image thumbnail" />
      </div>
      <span className="ml-1">{props.title}</span>
    </div>
  );
};

export default ThumbnailImage;
