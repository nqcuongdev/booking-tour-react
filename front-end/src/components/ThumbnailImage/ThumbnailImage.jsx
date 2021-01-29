import React from "react";
import "./ThumbnailImage.scss";
import { Link } from "react-router-dom";

const ThumbnailImage = (props) => {
  return (
    <div className="thumbnail">
      {!props.title && (
        <div className="thumbnail__overlay">
          <Link to="/destinations">+ 15 Places</Link>
        </div>
      )}
      <div className="thumbnail__image" style={{backgroundImage: `url(${props.image})`}}>
        {/* <img src={props.image} className="img-fluid" alt="Image thumbnail" /> */}
      </div>
      <div className="text-center">
        <span className="ml-1">{props.title}</span>
      </div>
    </div>
  );
};

export default ThumbnailImage;
