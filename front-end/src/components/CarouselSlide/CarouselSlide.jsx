import React, { useState, useEffect } from "react";
import "./CarouselSlide.scss";
import { Carousel } from "react-responsive-carousel";

const CarouselSlide = (props) => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    try {
      if (props.image !== undefined) {
        setImageList(props.image);
      }
    } catch (error) {
      console.log(error);
    }
  }, [props.image]);

  return (
    <div className="carousel-slide">
      <Carousel>
        {imageList.map((item) => {
          return (
            <div>
              <img src={`${process.env.REACT_APP_API_URL}/${item}`} />
              <div className="bottom-opacity"></div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselSlide;
