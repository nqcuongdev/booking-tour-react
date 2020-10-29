import React from 'react';
import './Testimonial.scss';
import { Container } from 'reactstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import post_1 from '../../assets/images/posts/post-1.jpg';
import post_2 from '../../assets/images/posts/post-2.jpg';

const Testimonial = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="testimonial">
            <Container>
                <h2>We love our happy clients!</h2>
                <Slider {...settings}>
                    <div className="testimonial-card">
                        <div className="testimonial-card-content">
                            <div className="avatar">
                                <img src={post_1} alt=""/>
                            </div>
                            <p>Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...</p>
                            <p className="customer"><b>Abbie Ferguson/</b>United Kingdom</p>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-card-content">
                            <div className="avatar">
                                <img src={post_2} alt=""/>
                            </div>
                            <p>Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...</p>
                            <p className="customer"><b>Abbie Ferguson/</b>United Kingdom</p>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-card-content">
                            <div className="avatar">
                                <img src={post_1} alt=""/>
                            </div>
                            <p>Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...</p>
                            <p className="customer"><b>Abbie Ferguson/</b>United Kingdom</p>
                        </div>
                    </div>
                </Slider>
            </Container>
        </div>
    );
};

export default Testimonial;