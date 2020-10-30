import React from "react";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";
import "./ThumbnailImage.scss";

const ThumbnailImage = (props) => {
  return (
    <div className="thumbnail__image">
      <Card>
        <CardImg
          top
          width="100%"
          src={props.image}
          alt="Image search section"
        />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

export default ThumbnailImage;
