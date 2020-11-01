import React from "react";
import { Button } from "reactstrap";
import "./AdItem.scss";

const AdItem = (props) => {
  return (
    <div
      className="popular__item mt-50"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <h3>{props.text1}</h3>
      <h4>{props.text2}</h4>
      <Button color="orange">Book Now</Button>
    </div>
  );
};

export default AdItem;
