import React from "react";
import { Button } from "reactstrap";
import "./AdItem.scss";

const AdItem = (props) => {
  return (
    <div
      className="popular__item d-flex mt-50"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="popular__info justify-content-center align-self-center mx-auto">
        <h3>{props.text1}</h3>
        <p>{props.text2}</p>
        <Button color="orange">Book Now</Button>
      </div>
    </div>
  );
};

export default AdItem;
