import React from "react";
import './Carousel.scss';
import { Container, Row, Col } from "reactstrap";
import { Carousel } from 'react-responsive-carousel';

const CarouselSlide = props => {
    return (
        <div className="carousel-slide mt-30">
            <Carousel>
                {props.images.map(image => {
                    return (
                        <div>
                            <img src={image} />
                            <div className="bottom-opacity"></div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
}

export default CarouselSlide;