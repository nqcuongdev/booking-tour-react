import React, { useState, useEffect } from "react";
import './CarouselSlide.scss';
import { Container, Row, Col } from "reactstrap";
import { Carousel } from 'react-responsive-carousel';

const imageUrl = 'http://localhost:6969/';

const CarouselSlide = props => {
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        try {
            if (props.image !== undefined) {
                setImageList(props.image)
            }
        } catch (error) {
            console.log(error)
        }
    }, [props.image])
    
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
}

export default CarouselSlide;