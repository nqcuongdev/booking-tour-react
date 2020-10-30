import React from 'react';
import './Testimonial.scss';
import { Container } from 'reactstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import avatar_1 from '../../assets/images/avatar-testimonial/avatar-1.jpg';
import avatar_2 from '../../assets/images/avatar-testimonial/avatar-2.jpg';
import avatar_3 from '../../assets/images/avatar-testimonial/avatar-3.jpg';

const testimonialData = [
    {
        avatar: avatar_1,
        content: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...',
        author: 'Software Engineer/ VKU Danang'
    },
    {
        avatar: avatar_2,
        content: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...',
        author: 'Software Engineer/ VKU Danang'
    },
    {
        avatar: avatar_3,
        content: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes...',
        author: 'Software Engineer/ VKU Danang'
    }
]

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
                    {testimonialData.map(testimonial => {
                        return (
                            <div className="testimonial-card">
                                <div className="testimonial-card-content">
                                    <div className="avatar">
                                        <img src={testimonial.avatar} alt=""/>
                                    </div>
                                    <p>{testimonial.content}</p>
                                    <p className="customer"><b>{testimonial.author}</b></p>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </Container>
        </div>
    );
};

export default Testimonial;