import React, { useState, useEffect } from "react";
import "./CarouselSlide.scss";
import { Carousel } from "react-responsive-carousel";

const imageUrl = "http://localhost:6969/";

const CarouselSlide = (props) => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    try {
      if (props.images !== undefined) {
        setImageList(props.images);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.images]);

  return (
    <div className="carousel-slide mt-30">
      <Carousel>
        {imageList.map((item) => {
          return (
            <div>
              <img src={`${imageUrl}${item}`} />
              <div className="bottom-opacity"></div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselSlide;
